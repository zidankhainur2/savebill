package service

import (
	"encoding/csv"
	"errors"
	"strings"
)

type FileService struct{}

func (s *FileService) ProcessFile(fileContent string) (map[string][]string, error) {
	if fileContent == "" {
		return nil, errors.New("CSV file tidak ada isinya")
	}

	reader := csv.NewReader(strings.NewReader(fileContent))
	records, err := reader.ReadAll()
	if err != nil {
		return nil, errors.New("CSV file gagal diproses")
	}

	if len(records) == 0 || len(records[0]) == 0 {
		return nil, errors.New("CSV file tidak valid karena tidak memiliki header row")
	}

	headers := records[0]
	data := make(map[string][]string)

	for _, header := range headers {
		data[header] = []string{}
	}

	for _, record := range records[1:] {
		if len(record) != len(headers) {
			return nil, errors.New("CSV file gagal diproses")
		}
		for i, value := range record {
			data[headers[i]] = append(data[headers[i]], value)
		}
	}

	return data, nil
}