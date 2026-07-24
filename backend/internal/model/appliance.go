package model

import "time"

type UserAppliance struct {
	ID         string    `json:"id" db:"id"`
	UserID     string    `json:"user_id" db:"user_id"`
	Name       string    `json:"name" db:"name"`
	Watt       int       `json:"watt" db:"watt"`
	Qty        int       `json:"qty" db:"qty"`
	DailyHours float64   `json:"daily_hours" db:"daily_hours"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
	UpdatedAt  time.Time `json:"updated_at" db:"updated_at"`
}

type AppliancePreset struct {
	ID          string    `json:"id" db:"id"`
	Name        string    `json:"name" db:"name"`
	DefaultWatt int       `json:"default_watt" db:"default_watt"`
	Category    string    `json:"category" db:"category"`
	Icon        string    `json:"icon" db:"icon"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}
