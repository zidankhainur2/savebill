package repository

import (
	"context"
	"fmt"
	"time"

	"savebill-api/internal/model"

	"github.com/jackc/pgx/v5/pgxpool"
)

type ApplianceRepository struct {
	db *pgxpool.Pool
}

func NewApplianceRepository(db *pgxpool.Pool) *ApplianceRepository {
	return &ApplianceRepository{db: db}
}

func (r *ApplianceRepository) FindByUserID(ctx context.Context, userID string) ([]model.UserAppliance, error) {
	if r.db == nil {
		return []model.UserAppliance{}, nil
	}

	query := `SELECT id, user_id, name, watt, qty, daily_hours, created_at, updated_at 
	          FROM public.user_appliances 
	          WHERE user_id = $1 
	          ORDER BY created_at DESC`

	rows, err := r.db.Query(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var appliances []model.UserAppliance
	for rows.Next() {
		var a model.UserAppliance
		if err := rows.Scan(&a.ID, &a.UserID, &a.Name, &a.Watt, &a.Qty, &a.DailyHours, &a.CreatedAt, &a.UpdatedAt); err != nil {
			return nil, err
		}
		appliances = append(appliances, a)
	}

	if appliances == nil {
		appliances = []model.UserAppliance{}
	}

	return appliances, nil
}

func (r *ApplianceRepository) Create(ctx context.Context, a *model.UserAppliance) error {
	if r.db == nil {
		return fmt.Errorf("database connection is not available (check DATABASE_URL in backend/.env)")
	}

	query := `INSERT INTO public.user_appliances (user_id, name, watt, qty, daily_hours) 
	          VALUES ($1, $2, $3, $4, $5) 
	          RETURNING id, created_at, updated_at`

	return r.db.QueryRow(ctx, query, a.UserID, a.Name, a.Watt, a.Qty, a.DailyHours).
		Scan(&a.ID, &a.CreatedAt, &a.UpdatedAt)
}

func (r *ApplianceRepository) Update(ctx context.Context, a *model.UserAppliance) error {
	if r.db == nil {
		return fmt.Errorf("database connection is not available (check DATABASE_URL in backend/.env)")
	}

	query := `UPDATE public.user_appliances 
	          SET name = $1, watt = $2, qty = $3, daily_hours = $4 
	          WHERE id = $5 AND user_id = $6 
	          RETURNING updated_at`

	return r.db.QueryRow(ctx, query, a.Name, a.Watt, a.Qty, a.DailyHours, a.ID, a.UserID).
		Scan(&a.UpdatedAt)
}

func (r *ApplianceRepository) Delete(ctx context.Context, id, userID string) error {
	if r.db == nil {
		return fmt.Errorf("database connection is not available (check DATABASE_URL in backend/.env)")
	}

	query := `DELETE FROM public.user_appliances WHERE id = $1 AND user_id = $2`
	_, err := r.db.Exec(ctx, query, id, userID)
	return err
}

func (r *ApplianceRepository) FindPresets(ctx context.Context) ([]model.AppliancePreset, error) {
	if r.db == nil {
		// // ponytail: static preset fallback when DB is offline — upgrade when DB connected
		return getFallbackPresets(), nil
	}

	query := `SELECT id, name, default_watt, category, icon, created_at 
	          FROM public.appliances_preset 
	          ORDER BY category, name`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		// Fallback to static presets if query errors (e.g. table not created yet)
		return getFallbackPresets(), nil
	}
	defer rows.Close()

	var presets []model.AppliancePreset
	for rows.Next() {
		var p model.AppliancePreset
		if err := rows.Scan(&p.ID, &p.Name, &p.DefaultWatt, &p.Category, &p.Icon, &p.CreatedAt); err != nil {
			return nil, err
		}
		presets = append(presets, p)
	}

	if len(presets) == 0 {
		return getFallbackPresets(), nil
	}

	return presets, nil
}

func getFallbackPresets() []model.AppliancePreset {
	now := time.Now()
	return []model.AppliancePreset{
		{ID: "p1", Name: "AC 1/2 PK", DefaultWatt: 400, Category: "Cooling", Icon: "air-vent", CreatedAt: now},
		{ID: "p2", Name: "AC 1 PK", DefaultWatt: 800, Category: "Cooling", Icon: "air-vent", CreatedAt: now},
		{ID: "p3", Name: "Kulkas 1 Pintu", DefaultWatt: 100, Category: "Kitchen", Icon: "refrigerator", CreatedAt: now},
		{ID: "p4", Name: "Kulkas 2 Pintu", DefaultWatt: 150, Category: "Kitchen", Icon: "refrigerator", CreatedAt: now},
		{ID: "p5", Name: "Mesin Cuci", DefaultWatt: 350, Category: "Kitchen", Icon: "washing-machine", CreatedAt: now},
		{ID: "p6", Name: "TV LED 32\"", DefaultWatt: 60, Category: "Entertainment", Icon: "tv", CreatedAt: now},
		{ID: "p7", Name: "Lampu LED 9W", DefaultWatt: 9, Category: "Lighting", Icon: "lightbulb", CreatedAt: now},
		{ID: "p8", Name: "Pompa Air", DefaultWatt: 125, Category: "Other", Icon: "droplets", CreatedAt: now},
		{ID: "p9", Name: "Rice Cooker", DefaultWatt: 400, Category: "Kitchen", Icon: "utensils", CreatedAt: now},
		{ID: "p10", Name: "Setrika", DefaultWatt: 350, Category: "Other", Icon: "wind", CreatedAt: now},
		{ID: "p11", Name: "Kipas Angin", DefaultWatt: 45, Category: "Cooling", Icon: "fan", CreatedAt: now},
	}
}
