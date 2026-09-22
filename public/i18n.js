// ==============================================================================
// 🌐 QuickShare Internationalization (i18n) Module
// Supported: Vietnamese (vi), English (en)
// ==============================================================================

const translations = {
  vi: {
    // Header & Navigation
    'brand.title': 'Quick Share',
    'header.connecting': 'Đang kết nối Wi-Fi...',
    'header.connect_phone': '📱 Kết nối ĐT',
    'header.public_share': '🌐 Public Share',
    'header.online': 'Online',
    'tab.instant_qr': 'QR Tải Ngay',
    'tab.sync_text': 'Đồng Bộ Text',
    'tab.send_files': 'Gửi Tệp / Ảnh',
    'tab.shared_files': 'Tệp QuickShare',
    'tab.files_from_mac': 'Tệp từ máy tính',

    // Instant QR Tab
    'qr.title': 'Tạo QR Tải Trực Tiếp (Direct Download)',
    'qr.subtitle': 'Chia sẻ file sang iPhone/Samsung: Camera quét là tải file ngay, không cần vào web.',
    'qr.subtab_file': '📁 Gửi File / Ảnh',
    'qr.subtab_text': '🔤 Gửi Đoạn Text',
    'qr.dropzone_text': 'Kéo thả file vào đây hoặc bấm để chọn',
    'qr.dropzone_sub': 'Hỗ trợ ảnh, video, tài liệu, zip... Tối đa 500MB',
    'qr.or_paste': 'Hoặc chụp màn hình và nhấn <b>Cmd + V</b> bất kỳ đâu trên trang này',
    'qr.scan_hint': '📱 Quét mã bằng Camera iPhone/Samsung để tải file ngay',
    'qr.text_placeholder': 'Nhập nội dung cần gửi sang điện thoại (link, mật khẩu, tin nhắn, mã otp...)...',
    'qr.btn_gen_text': 'Tạo mã QR Text',
    'qr.btn_paste_mac': '📋 Lấy từ Clipboard Mac',
    'qr.text_hint': '📱 Camera iPhone & Samsung tự động nhận diện chữ & cho phép bấm <b>"Sao chép văn bản"</b> ngay trên màn hình!',

    // Sync Text Tab
    'text.card_title_phone': '✍️ Gửi Text sang máy tính',
    'text.card_title_mac': '✍️ Gửi Text từ Máy tính',
    'text.card_sub_phone': 'Nội dung sẽ lập tức lưu vào Clipboard của máy tính (Ctrl/Cmd + V).',
    'text.card_sub_mac': 'Nội dung sẽ xuất hiện trên màn hình điện thoại kết nối.',
    'text.placeholder': 'Nhập hoặc dán văn bản tại đây...',
    'text.btn_paste_phone': '📋 Dán từ điện thoại',
    'text.btn_send': '🚀 Gửi sang máy tính',
    'text.btn_send_mac': '🚀 Phát đi',
    'text.mac_clip_title': '📋 Clipboard hiện tại trên Máy tính',
    'text.btn_copy_phone': 'Sao chép',
    'text.btn_refresh': 'Làm mới',
    'text.history_title': '🕒 Lịch sử văn bản gần đây',
    'text.history_empty': 'Chưa có lịch sử văn bản',

    // Upload Files Tab
    'upload.title_phone': '📤 Gửi Tệp & Ảnh sang máy tính',
    'upload.title_mac': '📤 Tải tệp lên QuickShare',
    'upload.sub_phone': 'Tệp sẽ được lưu trực tiếp vào thư mục máy tính.',
    'upload.sub_mac': 'Tệp sẽ hiển thị cho các thiết bị điện thoại tải về.',
    'upload.btn_camera': '📸 Chụp ảnh ngay',
    'upload.btn_gallery': '🖼️ Thư viện ảnh',
    'upload.btn_browse': '📁 Chọn tệp tài liệu',
    'upload.btn_start': '🚀 Bắt đầu gửi tệp',

    // Shared Files Tab
    'files.title_phone': '📂 Tệp từ máy tính gửi sang',
    'files.title_mac': '📂 Tệp QuickShare',
    'files.storage_label': 'Lưu tại:',
    'files.btn_change_folder': '⚙️ Đổi folder',
    'files.btn_open_folder': '📁 Mở thư mục',
    'files.loading': 'Đang tải danh sách file...',
    'files.empty': 'Chưa có file nào được lưu trữ',
    'files.btn_album': '🖼️ Album',
    'files.btn_download': '⬇️ Tải',
    'files.btn_delete': '🗑️',

    // Modals
    'modal.qr_title': 'Quét mã để kết nối',
    'modal.qr_sub': 'Mở ứng dụng <b>Camera</b> trên iPhone hoặc Samsung, hướng vào mã QR này để truy cập:',
    'modal.qr_wifi_note': '💡 Cả 2 thiết bị cần kết nối <b>cùng mạng Wi-Fi</b>.',
    'modal.qr_close': 'Đóng',

    'modal.public_title': '🌐 Chia sẻ qua Internet (Public Share)',
    'modal.public_sub': 'Tạo đường link HTTPS công khai qua Cloudflare Tunnel để bạn bè từ xa (4G/5G) có thể truy cập:',
    'modal.public_active_title': 'Public Tunnel đang hoạt động!',
    'modal.public_active_sub': 'Người nhận quét mã hoặc mở link sau, nhập mã PIN để tải/gửi tệp:',
    'modal.public_btn_copy': '📋 Copy Link + PIN',
    'modal.public_btn_stop': '🛑 Dừng chia sẻ Public',
    'modal.public_btn_start': '🚀 Bật Public Share ngay',
    'modal.public_close': 'Đóng',

    'modal.storage_title': 'Thư mục lưu trữ',
    'modal.storage_sub': 'Tất cả ảnh và tệp nhận từ điện thoại sẽ được lưu trực tiếp vào thư mục này. Bạn có thể đổi sang bất kỳ thư mục nào trên máy:',
    'modal.storage_label': 'Đường dẫn thư mục:',
    'modal.storage_presets': 'Gợi ý nhanh:',
    'modal.storage_btn_cancel': 'Hủy',
    'modal.storage_btn_save': 'Lưu & Áp dụng',

    'modal.pin_title': 'Yêu cầu Mã PIN',
    'modal.pin_sub': 'Trang chia sẻ từ xa này được bảo vệ. Vui lòng nhập mã PIN 4 số do chủ máy cung cấp:',
    'modal.pin_btn': 'Mở khóa dữ liệu',

    // Footer
    'footer.host_prefix': 'Đang chạy trên <b>máy chủ QuickShare</b> • Thư mục: ',
    'footer.phone_prefix': 'Đã kết nối với <b>máy tính</b> qua mạng Wi-Fi nội bộ',

    // Toasts
    'toast.copied': 'Đã sao chép vào clipboard!',
    'toast.sent_text': 'Đã gửi text sang máy tính!',
    'toast.upload_success': 'Tải lên thành công!',
    'toast.upload_error': 'Lỗi khi tải file',
    'toast.folder_changed': 'Đã đổi thư mục lưu sang: ',
    'toast.folder_opened': 'Đã mở thư mục lưu trữ trên máy!',
    'toast.folder_open_err': 'Không thể mở thư mục',
    'toast.deleted': 'Đã xoá tệp thành công',
    'toast.delete_err': 'Lỗi xoá file',
    'toast.saved_album': 'Đã mở bảng lưu vào Album ảnh!',
    'toast.public_started': 'Đã kích hoạt Public Link!',
    'toast.public_stopped': 'Đã dừng Public Share!',
  },

  en: {
    // Header & Navigation
    'brand.title': 'Quick Share',
    'header.connecting': 'Connecting Wi-Fi...',
    'header.connect_phone': '📱 Connect Phone',
    'header.public_share': '🌐 Public Share',
    'header.online': 'Online',
    'tab.instant_qr': 'Instant QR',
    'tab.sync_text': 'Text & Clipboard',
    'tab.send_files': 'Send Files / Photos',
    'tab.shared_files': 'Shared Files',
    'tab.files_from_mac': 'Files from Host',

    // Instant QR Tab
    'qr.title': 'Direct Download QR Code',
    'qr.subtitle': 'Share files to phone: Scan with Camera to download immediately without visiting browser.',
    'qr.subtab_file': '📁 Send File / Photo',
    'qr.subtab_text': '🔤 Send Raw Text',
    'qr.dropzone_text': 'Drag and drop files here or click to browse',
    'qr.dropzone_sub': 'Supports photos, videos, documents, zip... Up to 500MB',
    'qr.or_paste': 'Or take a screenshot and press <b>Cmd + V</b> anywhere on this page',
    'qr.scan_hint': '📱 Scan with iPhone / Samsung Camera to download immediately',
    'qr.text_placeholder': 'Enter text to send to phone (link, password, notes, otp code...)...',
    'qr.btn_gen_text': 'Generate Text QR',
    'qr.btn_paste_mac': '📋 Paste Host Clipboard',
    'qr.text_hint': '📱 iPhone & Samsung camera detects text & lets you tap <b>"Copy Text"</b> right on screen!',

    // Sync Text Tab
    'text.card_title_phone': '✍️ Send Text to Computer',
    'text.card_title_mac': '✍️ Broadcast Text from Host',
    'text.card_sub_phone': 'Content will immediately copy to computer clipboard (Ctrl/Cmd + V).',
    'text.card_sub_mac': 'Content will appear on connected mobile screens.',
    'text.placeholder': 'Type or paste text here...',
    'text.btn_paste_phone': '📋 Paste from Phone',
    'text.btn_send': '🚀 Send to Computer',
    'text.btn_send_mac': '🚀 Broadcast',
    'text.mac_clip_title': '📋 Current Host Clipboard',
    'text.btn_copy_phone': 'Copy',
    'text.btn_refresh': 'Refresh',
    'text.history_title': '🕒 Recent Text History',
    'text.history_empty': 'No text history yet',

    // Upload Files Tab
    'upload.title_phone': '📤 Send Files & Photos to Host',
    'upload.title_mac': '📤 Upload Files to QuickShare',
    'upload.sub_phone': 'Files will be saved directly into host computer.',
    'upload.sub_mac': 'Files will be available for mobile devices to download.',
    'upload.btn_camera': '📸 Take Photo',
    'upload.btn_gallery': '🖼️ Photo Library',
    'upload.btn_browse': '📁 Browse Files',
    'upload.btn_start': '🚀 Start Upload',

    // Shared Files Tab
    'files.title_phone': '📂 Files from Computer',
    'files.title_mac': '📂 QuickShare Files',
    'files.storage_label': 'Saved to:',
    'files.btn_change_folder': '⚙️ Change Folder',
    'files.btn_open_folder': '📁 Open Folder',
    'files.loading': 'Loading files...',
    'files.empty': 'No files stored yet',
    'files.btn_album': '🖼️ Album',
    'files.btn_download': '⬇️ Download',
    'files.btn_delete': '🗑️',

    // Modals
    'modal.qr_title': 'Scan to Connect',
    'modal.qr_sub': 'Open the <b>Camera</b> app on your iPhone or Samsung and point it at this QR code:',
    'modal.qr_wifi_note': '💡 Both devices must be on the <b>same Wi-Fi network</b>.',
    'modal.qr_close': 'Close',

    'modal.public_title': '🌐 Public Internet Share',
    'modal.public_sub': 'Create an encrypted public HTTPS link via Cloudflare Tunnel for remote friends (4G/5G):',
    'modal.public_active_title': 'Public Tunnel is Live!',
    'modal.public_active_sub': 'Guests can scan or open the link below and enter the PIN to transfer:',
    'modal.public_btn_copy': '📋 Copy Link + PIN',
    'modal.public_btn_stop': '🛑 Stop Public Share',
    'modal.public_btn_start': '🚀 Start Public Share Now',
    'modal.public_close': 'Close',

    'modal.storage_title': 'Storage Folder Settings',
    'modal.storage_sub': 'All photos and files received from mobile devices will be saved to this folder:',
    'modal.storage_label': 'Folder Path:',
    'modal.storage_presets': 'Quick Presets:',
    'modal.storage_btn_cancel': 'Cancel',
    'modal.storage_btn_save': 'Save & Apply',

    'modal.pin_title': 'PIN Code Required',
    'modal.pin_sub': 'This remote share is protected. Please enter the 4-digit PIN provided by the host:',
    'modal.pin_btn': 'Unlock Data',

    // Footer
    'footer.host_prefix': 'Running on <b>QuickShare Host</b> • Storage: ',
    'footer.phone_prefix': 'Connected to <b>Host Computer</b> via local Wi-Fi',

    // Toasts
    'toast.copied': 'Copied to clipboard!',
    'toast.sent_text': 'Sent text to host computer!',
    'toast.upload_success': 'Uploaded successfully!',
    'toast.upload_error': 'Upload failed',
    'toast.folder_changed': 'Storage folder changed to: ',
    'toast.folder_opened': 'Opened storage folder in system file manager!',
    'toast.folder_open_err': 'Cannot open folder',
    'toast.deleted': 'File deleted successfully',
    'toast.delete_err': 'Error deleting file',
    'toast.saved_album': 'Opened save to photo album sheet!',
    'toast.public_started': 'Public sharing link activated!',
    'toast.public_stopped': 'Public sharing stopped!',
  }
};

let currentLang = localStorage.getItem('quickshare_lang') || (navigator.language && navigator.language.startsWith('vi') ? 'vi' : 'en');

function t(key) {
  if (translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key];
  }
  if (translations.en[key]) {
    return translations.en[key];
  }
  return key;
}

function setLanguage(lang) {
  if (lang !== 'vi' && lang !== 'en') lang = 'en';
  currentLang = lang;
  localStorage.setItem('quickshare_lang', lang);
  document.documentElement.lang = lang;
  updateDomTranslations();
  
  // Trigger event for dynamic JS listeners
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function toggleLanguage() {
  setLanguage(currentLang === 'vi' ? 'en' : 'vi');
}

function updateDomTranslations() {
  // Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = translation;
    } else {
      el.innerHTML = translation;
    }
  });

  // Update data-i18n-title elements
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });

  // Update lang toggle button text
  const currentLangLabel = document.getElementById('current-lang-label');
  if (currentLangLabel) {
    currentLangLabel.innerText = currentLang === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN';
  }
}

// Export to global window
window.t = t;
window.currentLang = () => currentLang;
window.setLanguage = setLanguage;
window.toggleLanguage = toggleLanguage;
window.updateDomTranslations = updateDomTranslations;
