package handler

import (
	"a21hc3NpZ25tZW50/service"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/gorilla/sessions"
)

var fileService = &service.FileService{}
var aiService = &service.AIService{}
var store = sessions.NewCookieStore([]byte("my-key"))
var processedData map[string][]string

func getSession(r *http.Request) *sessions.Session {
    session, _ := store.Get(r, "chat-session")
    return session
}

func UploadHandler(w http.ResponseWriter, r *http.Request) {
    file, _, err := r.FormFile("file")
    if err != nil {
        log.Println("Error retrieving file:", err)
        http.Error(w, "Failed to retrieve file", http.StatusBadRequest)
        return
    }
    defer file.Close()

    fileContent, err := io.ReadAll(file)
    if err != nil {
        log.Println("Error reading file content:", err)
        http.Error(w, "Failed to read file content", http.StatusInternalServerError)
        return
    }

    data, err := fileService.ProcessFile(string(fileContent))
    if err != nil {
        log.Println("Error processing file:", err)
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    loginToken := r.Header.Get("Authorization")
    if loginToken == "" {
        http.Error(w, "Authorization header missing", http.StatusUnauthorized)
        return
    }
    loginToken = strings.TrimPrefix(loginToken, "Bearer ")

    processedData = data

    token := os.Getenv("HUGGINGFACE_TOKEN")
    answer, err := aiService.AnalyzeData(data, "query", token)
    if err != nil {
        log.Println("Error from AnalyzeData:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    response := map[string]string{"status": "success", "answer": answer}
    json.NewEncoder(w).Encode(response)
}

func CSVQueryHandler(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Query string `json:"query"`
    }
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    loginToken := r.Header.Get("Authorization")
    if loginToken == "" {
        http.Error(w, "Authorization header missing", http.StatusUnauthorized)
        return
    }
    loginToken = strings.TrimPrefix(loginToken, "Bearer ")

    data := processedData

    token := os.Getenv("HUGGINGFACE_TOKEN")
    answer, err := aiService.AnalyzeData(data, req.Query, token)
    if err != nil {
        log.Println("Error from AnalyzeData:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    response := map[string]string{"status": "success", "answer": answer}
    json.NewEncoder(w).Encode(response)
}

func ChatHandler(w http.ResponseWriter, r *http.Request) {
    var req struct {
        Query string `json:"query"`
    }
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    session := getSession(r)
    context, ok := session.Values["context"].(string)
    if !ok {
        context = ""
    }

    loginToken := r.Header.Get("Authorization")
    if loginToken == "" {
        http.Error(w, "Authorization header missing", http.StatusUnauthorized)
        return
    }
    loginToken = strings.TrimPrefix(loginToken, "Bearer ")

    token := os.Getenv("HUGGINGFACE_TOKEN")
    answer, err := aiService.ChatWithAI(context, req.Query, token)
    if err != nil {
        log.Println("Error from ChatWithAI:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    session.Values["context"] = context + " " + req.Query
    session.Save(r, w)

    response := map[string]string{"status": "success", "answer": answer.GeneratedText}
    json.NewEncoder(w).Encode(response)
}

func AnalyzeHandler(w http.ResponseWriter, r *http.Request) {
    token := os.Getenv("HUGGINGFACE_TOKEN")
    if token == "" {
        http.Error(w, "HUGGINGFACE_TOKEN is not set", http.StatusInternalServerError)
        return
    }

    err := r.ParseMultipartForm(1024)
    if err != nil {
        http.Error(w, "Unable to parse form", http.StatusBadRequest)
        return
    }

    file, _, err := r.FormFile("file")
    if err != nil {
        http.Error(w, "Failed to read file", http.StatusBadRequest)
        return
    }
    defer file.Close()

    content, err := io.ReadAll(file)
    if err != nil {
        http.Error(w, "Unable to read file content", http.StatusInternalServerError)
        return
    }

    resultFile, err := fileService.ProcessFile(string(content))
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    question := r.FormValue("query")

    answer, err := aiService.AnalyzeData(resultFile, question, token)
    if err != nil {
        log.Println("Error from AnalyzeData:", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    response := map[string]string{"status": "success", "answer": answer}
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}