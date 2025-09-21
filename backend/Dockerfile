# --- Tahap 1: Build aplication ---
# Menggunakan image Go resmi sebagai basis untuk build
FROM golang:1.22-alpine AS builder

# Menentukan direktori kerja di dalam container
WORKDIR /app

# Menyalin file dependensi terlebih dahulu untuk memanfaatkan cache Docker
COPY go.mod ./
COPY go.sum ./

# Mengunduh semua dependensi yang dibutuhkan
RUN go mod download

# Menyalin sisa source code dari backend
COPY . .

# Membangun aplikasi Go. Outputnya adalah sebuah file bernama 'main'
# CGO_ENABLED=0 penting untuk membuat static binary yang tidak bergantung pada library C
RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/api

# --- Tahap 2: Menjalankan aplikasi ---
# Menggunakan image Alpine Linux yang sangat ringan
FROM alpine:latest

# Menentukan direktori kerja
WORKDIR /app

# Menyalin file 'main' yang sudah di-build dari tahap 'builder'
COPY --from=builder /app/main .

# Memberitahu Docker bahwa container akan berjalan di port 8080
EXPOSE 8080

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD ["./main"]