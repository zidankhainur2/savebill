package service

import (
	"math"

	"savebill-api/internal/model"
	"savebill-api/pkg/calculator"
)

type CalculatorService struct{}

func NewCalculatorService() *CalculatorService {
	return &CalculatorService{}
}

func (s *CalculatorService) BuildSummary(appliances []model.UserAppliance, powerVA int) model.Summary {
	if powerVA <= 0 {
		powerVA = 1300
	}

	tariff := calculator.Tariff(powerVA)
	if len(appliances) == 0 {
		return model.Summary{
			PowerVA:           powerVA,
			TariffPerKwh:      tariff,
			TotalKwhMonthly:   0,
			TotalCostMonthly:  0,
			ApplianceCount:    0,
			HasEnergyHog:      false,
			EnergyHogName:     "",
			Appliances:        []model.ApplianceSummary{},
			CategoryBreakdown: []model.CategorySummary{},
		}
	}

	var totalKwh float64
	rawSummaries := make([]model.ApplianceSummary, len(appliances))

	for i, a := range appliances {
		kwh := calculator.MonthlyKwh(a.Watt, a.Qty, a.DailyHours)
		cost := calculator.MonthlyCost(kwh, tariff)
		totalKwh += kwh

		rawSummaries[i] = model.ApplianceSummary{
			ID:          a.ID,
			Name:        a.Name,
			Watt:        a.Watt,
			Qty:         a.Qty,
			DailyHours:  a.DailyHours,
			KwhMonthly:  math.Round(kwh*100) / 100,
			CostMonthly: math.Round(cost),
		}
	}

	totalCost := calculator.MonthlyCost(totalKwh, tariff)
	var hasEnergyHog bool
	var energyHogName string
	var maxPercentage float64

	categoryMap := make(map[string]*model.CategorySummary)

	finalSummaries := make([]model.ApplianceSummary, len(rawSummaries))
	for i, s := range rawSummaries {
		var pct float64
		if totalKwh > 0 {
			pct = (s.KwhMonthly / totalKwh) * 100.0
		}
		pct = math.Round(pct*100) / 100

		isHog := calculator.IsEnergyHog(pct)
		if isHog && pct > maxPercentage {
			hasEnergyHog = true
			energyHogName = s.Name
			maxPercentage = pct
		}

		s.Percentage = pct
		s.IsEnergyHog = isHog
		finalSummaries[i] = s

		cat := "Other"
		if c, ok := categoryMap[cat]; ok {
			c.KwhMonthly += s.KwhMonthly
			c.CostMonthly += s.CostMonthly
		} else {
			categoryMap[cat] = &model.CategorySummary{
				Category:    cat,
				KwhMonthly:  s.KwhMonthly,
				CostMonthly: s.CostMonthly,
			}
		}
	}

	var categories []model.CategorySummary
	for _, cat := range categoryMap {
		if totalKwh > 0 {
			cat.Percentage = math.Round((cat.KwhMonthly/totalKwh)*10000) / 100
		}
		cat.KwhMonthly = math.Round(cat.KwhMonthly*100) / 100
		cat.CostMonthly = math.Round(cat.CostMonthly)
		categories = append(categories, *cat)
	}

	return model.Summary{
		PowerVA:           powerVA,
		TariffPerKwh:      tariff,
		TotalKwhMonthly:   math.Round(totalKwh*100) / 100,
		TotalCostMonthly:  math.Round(totalCost),
		ApplianceCount:    len(appliances),
		HasEnergyHog:      hasEnergyHog,
		EnergyHogName:     energyHogName,
		Appliances:        finalSummaries,
		CategoryBreakdown: categories,
	}
}
