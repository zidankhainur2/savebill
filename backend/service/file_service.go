package service

import (
	"encoding/csv"
	"errors"
	"strings"
	repository "a21hc3NpZ25tZW50/repository/fileRepository"
)

type FileService struct {
	Repo *repository.FileRepository
}

func (s *FileService) ProcessFile(fileContent string) (map[string][]string, error) {
	if fileContent == "" {
		return nil, errors.New("file content is empty")
	}

	reader := csv.NewReader(strings.NewReader(fileContent))
	records, err := reader.ReadAll()
	if err != nil {
		return nil, errors.New("failed to parse CSV file")
	}

	if len(records) < 2 {
		return nil, errors.New("CSV file must have a header row and at least one data row")
	}

	headers := records[0]
	data := make(map[string][]string)
	for _, header := range headers {
		data[header] = []string{}
	}

	for _, row := range records[1:] {
		if len(row) != len(headers) {
			return nil, errors.New("data row does not match header length")
		}
		for i, value := range row {
			data[headers[i]] = append(data[headers[i]], value)
		}
	}

	return data, nil
}
