# ⚡ QuickShare — Mac ↔ iPhone | Samsung (LAN Transfer)

Công cụ truyền Text (Clipboard) và Hình ảnh / Tệp tin hai chiều giữa máy **Mac**, **iPhone** và **Samsung (Android)** qua mạng Wi-Fi nội bộ.

**Đặc điểm nổi bật:**
- 🚫 **Không cần cài app** trên iPhone hay Samsung (chỉ cần mở trình duyệt hoặc Camera).
- 🔒 **Mạng nội bộ 100%:** Dữ liệu truyền trực tiếp trong mạng Wi-Fi, không qua server trung gian.
- 🎯 **Device-Aware UI:** Tự động nhận diện giao diện Mac vs Mobile để ẩn các chức năng thừa.
- 📸 **Mã QR Tải Ngay (Direct Download QR):** Điện thoại quét Camera chạm vào link là tự động tải tệp/ảnh vào máy mà không qua web trung gian.
- 🔤 **Mã QR Text thô:** Camera iPhone / Samsung tự nhận diện văn bản và hiện nút "Sao chép" (Copy) trực tiếp mà không cần mạng.
- ⌨️ **Cmd + V Siêu Tốc trên Mac:** Vừa chụp màn hình (`Cmd + Ctrl + Shift + 4`), bấm `Cmd + V` trên web là sinh mã QR tải ngay trong 0.5s.
- 🖼️ **Nút Album cho Mobile:** Lưu thẳng ảnh vào **Cuộn ảnh (iOS Photos)** hoặc **Bộ sưu tập (Samsung Gallery)** qua Web Share API.
- 💻 **Terminal CLI:** Bật / tắt tiện lợi qua lệnh `quickshare-on`, `quickshare-off`.

---

## 🚀 Cài đặt & Khởi động

### 1. Cài đặt dependencies:
```bash
npm install
```

### 2. Chạy server:
```bash
npm start
# Hoặc chạy script:
./start.sh
```

### 3. Điều khiển nhanh từ Terminal (macOS):
Thêm vào `~/.zshrc`:
```bash
alias quickshare-on="quickshare on"
alias quickshare-off="quickshare off"
alias quickshare="quickshare status"
```
Lệnh sử dụng:
- `quickshare-on`: Khởi động chạy nền, in mã QR và URL mạng LAN ra Terminal.
- `quickshare-off`: Tắt server nhanh chóng.
- `quickshare`: Xem trạng thái và IP hiện tại.

---

## 📂 Vị trí lưu tệp
Mặc định mọi ảnh và tệp nhận từ điện thoại sẽ được lưu vào:
`~/Downloads/QuickShare` trên máy Mac.

---

## 🛠️ Công nghệ sử dụng
- **Backend:** Node.js, Express, Multer, qrcode-terminal
- **Frontend:** Vanilla HTML5 / Modern CSS (Glassmorphism & Dark Mode) / JavaScript (Clipboard API, Web Share API, Drag & Drop HTML5)
- **Tương thích:** macOS, iOS (Safari), Android (Samsung Internet, Chrome)
