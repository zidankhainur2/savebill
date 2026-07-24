package calculator

import (
	"testing"
)

func TestTariff(t *testing.T) {
	tests := []struct {
		va       int
		expected float64
	}{
		{900, 1352.0},
		{1300, 1444.70},
		{2200, 1444.70},
		{3500, 1699.53},
		{6600, 1699.53},
	}

	for _, tt := range tests {
		got := Tariff(tt.va)
		if got != tt.expected {
			t.Errorf("Tariff(%d) = %f; want %f", tt.va, got, tt.expected)
		}
	}
}

func TestMonthlyKwh(t *testing.T) {
	// 400W * 1 * 9 hours/day = 3.6 kWh/day * 30 days = 108 kWh
	got := MonthlyKwh(400, 1, 9.0)
	if got != 108.0 {
		t.Errorf("MonthlyKwh(400, 1, 9) = %f; want 108.0", got)
	}
}

func TestIsEnergyHog(t *testing.T) {
	if !IsEnergyHog(44.0) {
		t.Errorf("IsEnergyHog(44.0) should be true")
	}
	if IsEnergyHog(35.0) {
		t.Errorf("IsEnergyHog(35.0) should be false")
	}
}
