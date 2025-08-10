package service

import (
	"encoding/csv"
	"errors"
	"fmt"
	"strings"
)

type FileService struct{}

func NewFileService() *FileService {
	return &FileService{}
}

// ProcessFile memvalidasi konten file CSV, terutama headernya.
func (s *FileService) ProcessFile(fileContent string) error {
	if strings.TrimSpace(fileContent) == "" {
		return errors.New("file content is empty")
	}

	reader := csv.NewReader(strings.NewReader(fileContent))
	records, err := reader.ReadAll()
	if err != nil {
		// Error ini bisa terjadi jika format CSV secara umum tidak valid
		return errors.New("failed to parse CSV content, please check the file format")
	}

	if len(records) < 1 {
		return errors.New("CSV file does not contain any data")
	}

	// Ambil baris pertama sebagai header
	headers := records[0]
	expectedHeaders := map[string]bool{
		"Date":               true,
		"Time":               true,
		"Appliance":          true,
		"Energy_Consumption": true,
		"Room":               true,
		"Status":             true,
	}

	if len(headers) != len(expectedHeaders) {
		return fmt.Errorf("invalid header count: expected %d, got %d", len(expectedHeaders), len(headers))
	}

	// Periksa apakah setiap header yang diharapkan ada di file
	for _, h := range headers {
		// Normalisasi header (misal: hapus spasi, ubah ke huruf kecil) untuk perbandingan
		normalizedHeader := strings.TrimSpace(strings.ToLower(h))
		expectedHeaderFound := false
		for expected := range expectedHeaders {
			if strings.ToLower(expected) == normalizedHeader {
				expectedHeaderFound = true
				break
			}
		}
		if !expectedHeaderFound {
			return fmt.Errorf("unexpected or missing header column: %s", h)
		}
	}

	// Jika semua validasi lolos
	return nil
}