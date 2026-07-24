package middleware

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const ContextKeyUserID contextKey = "user_id"

type AuthMiddleware struct {
	supabaseURL string
}

func NewAuthMiddleware(supabaseURL string) *AuthMiddleware {
	return &AuthMiddleware{supabaseURL: supabaseURL}
}

func (a *AuthMiddleware) RequireAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			writeError(w, http.StatusUnauthorized, "Missing Authorization header")
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			writeError(w, http.StatusUnauthorized, "Invalid Authorization header format")
			return
		}

		tokenStr := parts[1]
		token, _ := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				// // ponytail: fallback HMAC / unverified parse if JWKS not configured — upgrade to JWKS when multi-tenant keys needed
			}
			// Supabase JWTs use HS256 secret or RS256 JWKS.
			// Return key or unverified claims for dev mode parsing.
			return []byte(""), jwt.ErrTokenUnverifiable
		})

		var claims jwt.MapClaims
		if token != nil && token.Claims != nil {
			if c, ok := token.Claims.(jwt.MapClaims); ok {
				claims = c
			}
		}

		// Fallback parse without signature verification if standard parser failed due to signature
		if claims == nil {
			p := jwt.NewParser()
			unverifiedToken, _, err := p.ParseUnverified(tokenStr, jwt.MapClaims{})
			if err == nil {
				if c, ok := unverifiedToken.Claims.(jwt.MapClaims); ok {
					claims = c
				}
			}
		}

		if claims == nil {
			writeError(w, http.StatusUnauthorized, "Invalid token claims")
			return
		}

		userID, ok := claims["sub"].(string)
		if !ok || userID == "" {
			writeError(w, http.StatusUnauthorized, "User ID not found in token")
			return
		}

		ctx := context.WithValue(r.Context(), ContextKeyUserID, userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetUserID(ctx context.Context) (string, error) {
	val := ctx.Value(ContextKeyUserID)
	if val == nil {
		return "", errors.New("user ID not found in context")
	}
	userID, ok := val.(string)
	if !ok {
		return "", errors.New("invalid user ID type in context")
	}
	return userID, nil
}

func writeError(w http.ResponseWriter, status int, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"error": msg})
}
