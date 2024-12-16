package service

import (
	"encoding/csv"
	"errors"
	"strings"

	repository "a21hc3NpZ25tZW50/repository/fileRepository"
)

// FileService handles file-related operations
type FileService struct {
	Repo *repository.FileRepository
}

// ProcessFile processes CSV content and returns it as a map
func (s *FileService) ProcessFile(fileContent string) (map[string][]string, error) {
	reader := csv.NewReader(strings.NewReader(fileContent))
	records, err := reader.ReadAll()
	if err != nil {
		return nil, wrapError("failed to read CSV content", err)
	}

	if len(records) < 2 {
		return nil, errors.New("no data found in CSV")
	}

	result := make(map[string][]string)
	headers := records[0]

	for _, row := range records[1:] {
		for i, value := range row {
			if i < len(headers) {
				header := headers[i]
				result[header] = append(result[header], value)
			}
		}
	}

	return result, nil
}

