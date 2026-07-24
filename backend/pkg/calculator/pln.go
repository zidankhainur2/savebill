package calculator

// Tariff returns PLN tariff rate in Rp/kWh based on power VA tier.
func Tariff(powerVA int) float64 {
	switch {
	case powerVA <= 900:
		return 1352.0
	case powerVA <= 2200:
		return 1444.70
	case powerVA >= 3500:
		return 1699.53
	default:
		return 1444.70
	}
}

// MonthlyKwh calculates monthly kWh for an appliance: (watt * qty * daily_hours / 1000) * 30.
func MonthlyKwh(watt, qty int, dailyHours float64) float64 {
	if watt <= 0 || qty <= 0 || dailyHours <= 0 {
		return 0.0
	}
	return (float64(watt*qty) * dailyHours / 1000.0) * 30.0
}

// MonthlyCost calculates total monthly cost in IDR for given kWh and tariff.
func MonthlyCost(kwh, tariff float64) float64 {
	if kwh <= 0 || tariff <= 0 {
		return 0.0
	}
	return kwh * tariff
}

// IsEnergyHog returns true if the appliance accounts for more than 40% of total energy.
func IsEnergyHog(percentage float64) bool {
	return percentage > 40.0
}
