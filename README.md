# Aplikasi Manajemen Shift dan Kehadiran Pegawai

Aplikasi ini dikembangkan menggunakan Laravel 10 dan Vue JS yang mencakup berbagai fitur untuk mengelola pegawai, jadwal shift, dan kehadiran.

## Fitur Utama

- **Manajemen Pegawai**: Menambah, mengedit, dan menghapus data pegawai.
- **Manajemen Shift**: Membuat dan mengelola jadwal shift pegawai.
- **Manajemen Kehadiran**: Mencatat kehadiran pegawai dengan status 'Hadir', 'Tidak Hadir', atau 'Terlambat'.
- **Antarmuka Pengguna**: Desain responsif untuk pengalaman pengguna yang optimal.
- **Autentikasi Pengguna**: Sistem login untuk mengatur akses sesuai peran pengguna.

## Detail Aplikasi

- **Framework**: Laravel 10 (Backend) & Vue JS (Frontend)
- **Database**: MySQL

## Login

Untuk mengakses aplikasi, gunakan kredensial berikut:

- **Email**: `manager@gmail.com`
- **Password**: `manager123`

## Dokumentasi API

[Dokumentasi API - Shift Management](https://documenter.getpostman.com/view/34616664/2sAXqs7NUN).

## Instalasi

1. **Clone Repositori**:

   ```bash
   git clone [URL_REPOSITORI]
   ```

2. **Masuk ke Direktori Proyek**:

   ```bash
   cd [NAMA_PROYEK]
   ```

3. **Instal Dependensi**:

   ```bash
   composer install
   ```

4. **Buat File `.env`**:

   ```bash
   cp .env.example .env
   ```

5. **Generate Kunci Aplikasi**:

   ```bash
   php artisan key:generate
   ```

6. **Migrasi Database**:

   ```bash
   php artisan migrate
   ```

7. **Jalankan Server**:

   ```bash
   php artisan serve
   ```
