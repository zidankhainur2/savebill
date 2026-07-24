package model

type ApplianceSummary struct {
	ID          string  `json:"id"`
	Name        string  `json:"name"`
	Watt        int     `json:"watt"`
	Qty         int     `json:"qty"`
	DailyHours  float64 `json:"daily_hours"`
	KwhMonthly  float64 `json:"kwh_monthly"`
	CostMonthly float64 `json:"cost_monthly"`
	Percentage  float64 `json:"percentage"`
	IsEnergyHog bool    `json:"is_energy_hog"`
}

type CategorySummary struct {
	Category    string  `json:"category"`
	KwhMonthly  float64 `json:"kwh_monthly"`
	CostMonthly float64 `json:"cost_monthly"`
	Percentage  float64 `json:"percentage"`
}

type Summary struct {
	PowerVA           int                `json:"power_va"`
	TariffPerKwh      float64            `json:"tariff_per_kwh"`
	TotalKwhMonthly   float64            `json:"total_kwh_monthly"`
	TotalCostMonthly  float64            `json:"total_cost_monthly"`
	ApplianceCount    int                `json:"appliance_count"`
	HasEnergyHog      bool               `json:"has_energy_hog"`
	EnergyHogName     string             `json:"energy_hog_name"`
	Appliances        []ApplianceSummary `json:"appliances"`
	CategoryBreakdown []CategorySummary  `json:"category_breakdown"`
}
