// ==============================================================================
// 🌐 QuickShare Extensible Internationalization (i18n) Engine
// Complete 100% coverage across Vietnamese, English, Japanese, Chinese, and Korean.
// ==============================================================================

const SUPPORTED_LANGUAGES = {
  vi: { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  en: { code: 'en', name: 'English', flag: '🇺🇸' },
  ja: { code: 'ja', name: '日本語', flag: '🇯🇵' },
  zh: { code: 'zh', name: '中文', flag: '🇨🇳' },
  ko: { code: 'ko', name: '한국어', flag: '🇰🇷' },
};

const translations = {
  vi: {
    // Header & Navigation
    'brand.title': 'Quick Share',
    'header.connecting': 'Đang kết nối Wi-Fi...',
    'header.connected_mac': 'Kết nối với Mac: {ip}',
    'header.disconnected': 'Chưa kết nối được với server',
    'header.connect_phone': '📱 Kết nối ĐT',
    'header.public_share': '🌐 Public: ',
    'header.public_on': 'BẬT',
    'header.public_off': 'TẮT',
    'header.online': 'Online',
    'tab.instant_qr': 'QR Tải Ngay',
    'tab.sync_text': 'Văn bản',
    'tab.send_files': 'Gửi Ảnh/Video',
    'tab.shared_files': 'Tệp QuickShare',
    'tab.files_from_mac': 'Tệp từ máy tính',
    'tab.qr_default_name': 'Tên tệp',

    // Instant QR Tab
    'qr.title': '🎯 Tạo mã QR Tải Trực Tiếp về Điện thoại',
    'qr.subtitle': 'Chia sẻ file sang iPhone/Samsung: Camera quét là tải file ngay, không cần vào web.',
    'qr.subtab_file': '📁 Tệp / Hình ảnh',
    'qr.subtab_text': '🔤 Văn bản (Text thô)',
    'qr.dropzone_text': 'Kéo thả hoặc Bấm chọn Tệp / Ảnh từ Mac',
    'qr.dropzone_sub': 'Hỗ trợ mọi định dạng (Ảnh, PDF, Video, Zip...)',
    'qr.or_paste': '<b>Phím tắt Mac:</b> Chụp màn hình xong bấm <kbd>⌘</kbd> + <kbd>V</kbd> bất kỳ đâu trên trang này để sinh mã QR tức thì!',
    'qr.scan_hint': '📱 <b>Quét tải tức thì:</b> Mở Camera iPhone hoặc Samsung chĩa vào mã trên -> Chạm vào link hiện lên -> Tự động tải về máy!',
    'qr.text_placeholder': 'Gõ hoặc dán nội dung text, link, mật khẩu...',
    'qr.text_label': 'Nhập văn bản cần sinh QR:',
    'qr.btn_gen_text': 'Tạo mã QR Văn bản',
    'qr.btn_paste_mac': '📋 Lấy từ Clipboard Mac',
    'qr.text_hint': '✨ <b>Không cần mạng / web:</b> Chĩa Camera iPhone hoặc Samsung vào mã -> Camera tự hiện nội dung và có nút <b>"Sao chép văn bản" (Copy)</b> ngay trên Camera!',
    'qr.placeholder_title': 'Khu vực hiển thị mã QR',
    'qr.placeholder_sub': 'Chọn tệp hoặc dán ảnh/text bên trái để tạo mã quét ngay cho điện thoại.',

    // Sync Text Tab
    'text.card_title_phone': '🚀 Gửi Text vào Máy tính',
    'text.card_title_mac': '🚀 Gửi Text từ Máy tính',
    'text.placeholder': 'Dán hoặc gõ nội dung (link, tin nhắn, mã code, mật khẩu...)',
    'text.btn_paste_phone': '📋 Dán từ điện thoại',
    'text.btn_send': '🚀 Gửi sang máy tính',
    'text.mac_clip_title': '💻 Clipboard hiện tại trên Máy tính',
    'text.mac_clip_empty': 'Clipboard trên Mac hiện đang trống',
    'text.mac_clip_err': 'Lỗi đọc clipboard Mac',
    'text.mac_clip_reading': 'Đang đọc clipboard...',
    'text.btn_copy_phone': '📋 Sao chép',
    'text.btn_refresh': '🔄 Làm mới',

    // Upload Files Tab
    'upload.title_phone': '📷 Gửi Ảnh / Video sang Máy tính',
    'upload.btn_camera': 'Chụp ảnh',
    'upload.camera_sub': 'Mở camera ngay',
    'upload.btn_gallery': 'Thư viện ảnh',
    'upload.gallery_sub': 'Chọn ảnh / video / tệp',
    'upload.selected_count': 'Đã chọn ({count} file):',
    'upload.selected_none': 'Đã chọn: Chưa có tệp nào',
    'upload.btn_start': '🚀 Bắt đầu gửi tệp',
    'upload.uploading': '⏳ Đang chuyển sang Mac...',
    'upload.btn_default': '📤 Gửi ngay sang Mac (Lưu vào Downloads)',

    // Shared Files Tab
    'files.title_phone': '📂 Tệp từ máy tính gửi sang',
    'files.title_mac': '📂 Tệp QuickShare',
    'files.storage_label': 'Lưu tại:',
    'files.btn_change_folder': '⚙️ Đổi folder',
    'files.btn_open_folder': '📁 Mở thư mục',
    'files.btn_refresh_title': 'Làm mới danh sách',
    'files.search_placeholder': '🔍 Tìm kiếm tệp...',
    'files.filter_all': 'Tất cả',
    'files.filter_images': '🖼️ Ảnh',
    'files.filter_docs': '📄 Tài liệu',
    'files.btn_preview': '👁️ Xem',
    'files.loading': 'Đang tải danh sách file...',
    'files.empty': 'Chưa có file nào',
    'files.btn_album': '🖼️ Album',
    'files.btn_download': '⬇️ Tải',
    'files.btn_delete': '🗑️',
    'files.btn_qr': '📱 QR',
    'files.stats': '{count} tệp • {size}',
    'files.stats_zero': '0 tệp',
    'files.badge_image': 'Ảnh',
    'files.confirm_delete': 'Bạn có chắc muốn xoá file "{name}" không?',

    // Modals
    'modal.preview_title': 'Xem trước tệp',
    'modal.qr_title': '📱 Mở Trang Web trên Điện thoại',
    'modal.qr_sub': 'Mở Camera iPhone hoặc Samsung quét mã này để vào web điều khiển:',
    'modal.qr_close': 'Đóng',
    'modal.file_qr_title': 'Tải Tệp Trực Tiếp',
    'modal.file_qr_sub': '📱 Quét bằng Camera điện thoại để tải tệp tức thì:',

    'modal.public_title': 'Chia sẻ qua Internet (Public Share)',
    'modal.public_active_title': '✅ Public Tunnel đang hoạt động!',
    'modal.public_active_sub': 'Người nhận quét mã hoặc mở link sau, nhập mã PIN để tải/gửi tệp:',
    'modal.public_link_label': 'Public Link:',
    'modal.public_pin_label': 'Mã PIN bảo mật:',
    'modal.public_btn_copy': '📋 Copy Link + PIN',
    'modal.public_btn_stop': '🛑 Dừng chia sẻ Public',
    'modal.public_btn_start': '🚀 Bật Public Share ngay',
    'modal.public_close': 'Đóng',

    'modal.storage_title': 'Thư mục lưu trữ',
    'modal.storage_sub': 'Tất cả ảnh và tệp nhận từ điện thoại sẽ được lưu trực tiếp vào thư mục này. Bạn có thể đổi sang bất kỳ thư mục nào trên máy:',
    'modal.storage_label': 'Đường dẫn thư mục:',
    'modal.storage_input_placeholder': 'ví dụ: ~/Desktop/QuickShare',
    'modal.storage_presets': 'Gợi ý nhanh:',
    'modal.storage_btn_cancel': 'Hủy',
    'modal.storage_btn_save': 'Lưu & Áp dụng',
    'modal.storage_saving': 'Đang lưu...',

    'modal.pin_title': 'Yêu cầu Mã PIN',
    'modal.pin_sub': 'Trang chia sẻ từ xa này được bảo vệ. Vui lòng nhập mã PIN 4 số do chủ máy cung cấp:',
    'modal.pin_btn': 'Mở khóa dữ liệu',

    // Footer
    'footer.host_prefix': 'Đang chạy trên <b>máy chủ QuickShare</b> • Thư mục: ',
    'footer.phone_prefix': 'Đã kết nối với <b>máy tính</b> qua mạng Wi-Fi nội bộ',

    // Toasts & Alerts
    'toast.default': 'Thông báo',
    'toast.copied': 'Đã sao chép vào clipboard!',
    'toast.sent_text': 'Đã nạp vào Clipboard Mac (Cmd + V)!',
    'toast.upload_success': 'Tải lên thành công!',
    'toast.upload_error': 'Lỗi khi tải file',
    'toast.folder_changed': 'Đã đổi thư mục lưu sang: {dir}',
    'toast.folder_opened': 'Đã mở thư mục lưu trữ trên máy!',
    'toast.folder_open_err': 'Không thể mở thư mục',
    'toast.deleted': 'Đã xoá tệp thành công',
    'toast.delete_err': 'Lỗi xoá file',
    'toast.saved_album': 'Đã mở bảng lưu vào Album ảnh!',
    'toast.public_started': 'Đã kích hoạt Public Link!',
    'toast.public_stopped': 'Đã dừng Public Share!',
    'toast.qr_generating': 'Đang tải file và sinh mã QR...',
    'toast.qr_created': 'Đã tạo mã QR tải trực tiếp!',
    'toast.qr_upload_err': 'Lỗi khi tải file lên Mac',
    'toast.enter_text': 'Vui lòng nhập văn bản!',
    'toast.text_too_long': 'Văn bản quá dài (>2500 ký tự)!',
    'toast.qr_text_created': 'Đã tạo mã QR văn bản!',
    'toast.clipboard_empty': 'Clipboard Mac trống!',
    'toast.paste_phone': 'Đã dán text từ điện thoại!',
    'toast.paste_direct_hint': 'Hãy dán trực tiếp vào ô văn bản',
    'toast.text_send_err': 'Không thể kết nối với Mac',
    'toast.text_send_err_detail': 'Lỗi gửi văn bản',
    'toast.copy_err': 'Lỗi khi copy vào điện thoại',
    'toast.upload_batch': 'Đang tải {count} file lên QuickShare...',
    'toast.upload_batch_success': 'Đã tải lên {count} file thành công!',
    'toast.folder_enter_path': 'Vui lòng nhập đường dẫn thư mục',
    'toast.folder_change_err': 'Lỗi khi đổi thư mục',
    'toast.screenshot_detected': '📸 Đã bắt ảnh chụp màn hình từ Clipboard (Cmd+V)!',
    'toast.text_pasted_qr': '📋 Đã dán text từ Clipboard (Cmd+V) và sinh QR!',
    'toast.photo_processing': 'Đang xử lý ảnh để lưu vào máy...',
    'toast.photo_saved': 'Đã tải ảnh về máy thành công!',
    'toast.photo_save_err': 'Lỗi khi lưu ảnh: {error}',
    'toast.tunnel_create_err': 'Không thể tạo tunnel',
    'toast.tunnel_init_err': 'Lỗi khởi tạo Cloudflare Tunnel',
    'toast.tunnel_stop_err': 'Không thể dừng tunnel',
    'toast.pin_unlocked': 'Mở khóa thành công!',
    'toast.pin_incorrect': 'Mã PIN không chính xác!',
    'toast.pin_length': 'Mã PIN gồm 4 số!',
    'toast.pin_check_err': 'Lỗi kiểm tra mã PIN',

    // Standard Backend Error Translations
    'error.text_empty': 'Nội dung văn bản trống',
    'error.no_files': 'Không có tệp nào được chọn',
    'error.cannot_read_dir': 'Không thể đọc thư mục lưu trữ',
    'error.file_not_found': 'Không tìm thấy tệp',
    'error.public_restricted': 'Tính năng bị giới hạn cho kết nối Public',
    'error.storage_forbidden': 'Không được phép đổi thư mục qua kết nối Public',
    'error.cannot_use_dir': 'Không thể sử dụng thư mục được chọn: {error}',
  },

  en: {
    // Header & Navigation
    'brand.title': 'Quick Share',
    'header.connecting': 'Connecting Wi-Fi...',
    'header.connected_mac': 'Connected to Host: {ip}',
    'header.disconnected': 'Cannot connect to server',
    'header.connect_phone': '📱 Connect Phone',
    'header.public_share': '🌐 Public: ',
    'header.public_on': 'ON',
    'header.public_off': 'OFF',
    'header.online': 'Online',
    'tab.instant_qr': 'Instant QR',
    'tab.sync_text': 'Text & Clipboard',
    'tab.send_files': 'Send Files / Photos',
    'tab.shared_files': 'Shared Files',
    'tab.files_from_mac': 'Files from Host',
    'tab.qr_default_name': 'File Name',

    // Instant QR Tab
    'qr.title': '🎯 Direct Download QR Code',
    'qr.subtitle': 'Share files to phone: Scan with Camera to download immediately without visiting browser.',
    'qr.subtab_file': '📁 Files / Photos',
    'qr.subtab_text': '🔤 Raw Text',
    'qr.dropzone_text': 'Drag & drop or click to choose files from Host',
    'qr.dropzone_sub': 'Supports all formats (Photos, PDF, Video, Zip...)',
    'qr.or_paste': '<b>Host Shortcut:</b> Take a screenshot and press <kbd>⌘</kbd> + <kbd>V</kbd> anywhere on this page to generate QR immediately!',
    'qr.scan_hint': '📱 <b>Instant Scan & Download:</b> Open Camera on iPhone or Samsung -> Tap the detected link -> File downloads automatically without browser!',
    'qr.text_placeholder': 'Type or paste text, links, passwords, OTP...',
    'qr.text_label': 'Enter text to generate QR code:',
    'qr.btn_gen_text': 'Generate Text QR',
    'qr.btn_paste_mac': '📋 Paste Host Clipboard',
    'qr.text_hint': '✨ <b>No network required:</b> Point phone Camera at QR code -> Camera directly shows text and has a <b>"Copy Text"</b> button on-screen!',
    'qr.placeholder_title': 'QR Code Display Area',
    'qr.placeholder_sub': 'Select a file or paste text on the left to generate an instant QR code for mobile scanning.',

    // Sync Text Tab
    'text.card_title_phone': '🚀 Send Text to Computer',
    'text.card_title_mac': '🚀 Broadcast Text from Host',
    'text.placeholder': 'Paste or type text (links, messages, codes, passwords...)',
    'text.btn_paste_phone': '📋 Paste from Phone',
    'text.btn_send': '🚀 Send to Host Computer',
    'text.mac_clip_title': '💻 Current Host Clipboard',
    'text.mac_clip_empty': 'Host clipboard is currently empty',
    'text.mac_clip_err': 'Error reading host clipboard',
    'text.mac_clip_reading': 'Reading clipboard...',
    'text.btn_copy_phone': '📋 Copy',
    'text.btn_refresh': '🔄 Refresh',

    // Upload Files Tab
    'upload.title_phone': '📷 Send Photos / Videos to Computer',
    'upload.btn_camera': 'Take Photo',
    'upload.camera_sub': 'Open camera now',
    'upload.btn_gallery': 'Photo Library',
    'upload.gallery_sub': 'Choose photos / videos / files',
    'upload.selected_count': 'Selected ({count} files):',
    'upload.selected_none': 'Selected: No files chosen',
    'upload.btn_start': '🚀 Start Sending Files',
    'upload.uploading': '⏳ Transferring to Host...',
    'upload.btn_default': '📤 Send to Host (Saved in Downloads)',

    // Shared Files Tab
    'files.title_phone': '📂 Files from Host Computer',
    'files.title_mac': '📂 QuickShare Files',
    'files.storage_label': 'Saved in:',
    'files.btn_change_folder': '⚙️ Change Folder',
    'files.btn_open_folder': '📁 Open Folder',
    'files.btn_refresh_title': 'Refresh file list',
    'files.search_placeholder': '🔍 Search files...',
    'files.filter_all': 'All',
    'files.filter_images': '🖼️ Images',
    'files.filter_docs': '📄 Documents',
    'files.btn_preview': '👁️ View',
    'files.loading': 'Loading files list...',
    'files.empty': 'No files shared yet',
    'files.btn_album': '🖼️ Album',
    'files.btn_download': '⬇️ Download',
    'files.btn_delete': '🗑️',
    'files.btn_qr': '📱 QR',
    'files.stats': '{count} files • {size}',
    'files.stats_zero': '0 files',
    'files.badge_image': 'Image',
    'files.confirm_delete': 'Are you sure you want to delete file "{name}"?',

    // Modals
    'modal.preview_title': 'File Preview',
    'modal.qr_title': '📱 Open Web App on Mobile',
    'modal.qr_sub': 'Open Camera app on iPhone or Samsung and point it at this QR code to access:',
    'modal.qr_close': 'Close',
    'modal.file_qr_title': 'Direct File Download',
    'modal.file_qr_sub': '📱 Scan with phone Camera to download file directly:',

    'modal.public_title': 'Share via Internet (Public Share)',
    'modal.public_active_title': '✅ Public Tunnel is Live!',
    'modal.public_active_sub': 'Recipients can scan or visit the link below and enter the PIN code to transfer files:',
    'modal.public_link_label': 'Public Link:',
    'modal.public_pin_label': 'Security PIN:',
    'modal.public_btn_copy': '📋 Copy Link + PIN',
    'modal.public_btn_stop': '🛑 Stop Public Share',
    'modal.public_btn_start': '🚀 Start Public Share Now',
    'modal.public_close': 'Close',

    'modal.storage_title': 'Storage Folder Settings',
    'modal.storage_sub': 'All photos and files received from mobile devices will be saved directly to this folder on your computer:',
    'modal.storage_label': 'Folder Path:',
    'modal.storage_input_placeholder': 'e.g. ~/Desktop/QuickShare',
    'modal.storage_presets': 'Quick Presets:',
    'modal.storage_btn_cancel': 'Cancel',
    'modal.storage_btn_save': 'Save & Apply',
    'modal.storage_saving': 'Saving...',

    'modal.pin_title': 'PIN Code Required',
    'modal.pin_sub': 'This remote share is protected. Please enter the 4-digit PIN provided by the host:',
    'modal.pin_btn': 'Unlock Data',

    // Footer
    'footer.host_prefix': 'Running on <b>QuickShare Host</b> • Storage: ',
    'footer.phone_prefix': 'Connected to <b>Host Computer</b> via local Wi-Fi',

    // Toasts & Alerts
    'toast.default': 'Notification',
    'toast.copied': 'Copied to clipboard!',
    'toast.sent_text': 'Loaded into Host Clipboard (Cmd + V)!',
    'toast.upload_success': 'Upload successful!',
    'toast.upload_error': 'Error uploading file',
    'toast.folder_changed': 'Storage folder changed to: {dir}',
    'toast.folder_opened': 'Opened storage folder on computer!',
    'toast.folder_open_err': 'Cannot open folder',
    'toast.deleted': 'File deleted successfully',
    'toast.delete_err': 'Error deleting file',
    'toast.saved_album': 'Opened save to Photo Album sheet!',
    'toast.public_started': 'Public Sharing Link activated!',
    'toast.public_stopped': 'Public Share stopped!',
    'toast.qr_generating': 'Uploading file & generating QR code...',
    'toast.qr_created': 'Direct download QR code ready!',
    'toast.qr_upload_err': 'Failed to upload file to host',
    'toast.enter_text': 'Please enter some text!',
    'toast.text_too_long': 'Text too long (>2500 characters)!',
    'toast.qr_text_created': 'Text QR code generated!',
    'toast.clipboard_empty': 'Host clipboard is empty!',
    'toast.paste_phone': 'Pasted text from phone!',
    'toast.paste_direct_hint': 'Please paste directly into the text box',
    'toast.text_send_err': 'Cannot connect to host computer',
    'toast.text_send_err_detail': 'Failed to send text',
    'toast.copy_err': 'Error copying to phone clipboard',
    'toast.upload_batch': 'Uploading {count} files to QuickShare...',
    'toast.upload_batch_success': 'Uploaded {count} files successfully!',
    'toast.folder_enter_path': 'Please enter a folder path',
    'toast.folder_change_err': 'Failed to change folder',
    'toast.screenshot_detected': '📸 Captured screenshot from Clipboard (Cmd+V)!',
    'toast.text_pasted_qr': '📋 Pasted text from Clipboard (Cmd+V) & generated QR!',
    'toast.photo_processing': 'Processing image to save...',
    'toast.photo_saved': 'Image saved to device successfully!',
    'toast.photo_save_err': 'Error saving image: {error}',
    'toast.tunnel_create_err': 'Cannot create public tunnel',
    'toast.tunnel_init_err': 'Cloudflare Tunnel initialization failed',
    'toast.tunnel_stop_err': 'Cannot stop public tunnel',
    'toast.pin_unlocked': 'Unlocked successfully!',
    'toast.pin_incorrect': 'Incorrect PIN code!',
    'toast.pin_length': 'PIN must be 4 digits!',
    'toast.pin_check_err': 'PIN verification error',

    // Standard Backend Error Translations
    'error.text_empty': 'Text content is empty',
    'error.no_files': 'No files provided',
    'error.cannot_read_dir': 'Cannot read downloads directory',
    'error.file_not_found': 'File not found',
    'error.public_restricted': 'Action restricted for public connection',
    'error.storage_forbidden': 'Changing storage path is forbidden for public visitors',
    'error.cannot_use_dir': 'Cannot use selected directory: {error}',
  },

  ja: {
    // Header & Navigation
    'brand.title': 'Quick Share',
    'header.connecting': 'Wi-Fi接続中...',
    'header.connected_mac': 'ホスト接続: {ip}',
    'header.disconnected': 'サーバー未接続',
    'header.connect_phone': '📱 スマホ接続',
    'header.public_share': '🌐 公開: ',
    'header.public_on': 'オン',
    'header.public_off': 'オフ',
    'header.online': 'オンライン',
    'tab.instant_qr': '即時QR',
    'tab.sync_text': 'テキスト共有',
    'tab.send_files': 'ファイル送信',
    'tab.shared_files': '共有ファイル',
    'tab.files_from_mac': 'PCからのファイル',
    'tab.qr_default_name': 'ファイル名',

    // Instant QR Tab
    'qr.title': '🎯 直接ダウンロードQRコード生成',
    'qr.subtitle': 'スマホへファイル共有: カメラでスキャンするだけで即ダウンロード（ブラウザ操作不要）。',
    'qr.subtab_file': '📁 ファイル / 写真',
    'qr.subtab_text': '🔤 プレーンテキスト',
    'qr.dropzone_text': 'ファイルをドロップまたはクリックして選択',
    'qr.dropzone_sub': '写真、動画、書類、Zipなど全形式対応',
    'qr.or_paste': '<b>ショートカット:</b> 画面キャプチャ後、ページ上のどこでも <kbd>⌘</kbd> + <kbd>V</kbd> で即時QRコード生成！',
    'qr.scan_hint': '📱 <b>即時スキャン:</b> スマホのカメラを向けるだけでリンクが表示され、タップで即ダウンロード！',
    'qr.text_placeholder': '送信するテキスト、リンク、パスワードを入力...',
    'qr.text_label': 'QRコードを生成するテキストを入力:',
    'qr.btn_gen_text': 'テキストQRを生成',
    'qr.btn_paste_mac': '📋 クリップボード貼り付け',
    'qr.text_hint': '✨ <b>通信不要:</b> スマホカメラをかざすだけでテキストを認識し、画面上に<b>「テキストをコピー」</b>ボタンが出ます！',
    'qr.placeholder_title': 'QRコード表示エリア',
    'qr.placeholder_sub': '左側でファイルを選択またはテキストを入力すると、QRコードが表示されます。',

    // Sync Text Tab
    'text.card_title_phone': '🚀 PCへテキスト送信',
    'text.card_title_mac': '🚀 ホストからテキスト送信',
    'text.placeholder': 'テキスト、リンク、メッセージ、コードを貼り付け...',
    'text.btn_paste_phone': '📋 スマホから貼付',
    'text.btn_send': '🚀 PCへ送信',
    'text.mac_clip_title': '💻 PCの現在のクリップボード',
    'text.mac_clip_empty': 'PCのクリップボードは現在空です',
    'text.mac_clip_err': 'PCクリップボード読み込みエラー',
    'text.mac_clip_reading': 'クリップボードを読み込み中...',
    'text.btn_copy_phone': '📋 コピー',
    'text.btn_refresh': '🔄 更新',

    // Upload Files Tab
    'upload.title_phone': '📷 写真 / 動画をPCへ送信',
    'upload.btn_camera': '写真を撮る',
    'upload.camera_sub': '今すぐカメラを起動',
    'upload.btn_gallery': '写真ライブラリ',
    'upload.gallery_sub': '写真 / 動画 / ファイルを選択',
    'upload.selected_count': '選択済み ({count} 件):',
    'upload.selected_none': '選択済み: ファイルなし',
    'upload.btn_start': '🚀 送信を開始',
    'upload.uploading': '⏳ PCへ転送中...',
    'upload.btn_default': '📤 PCへ即時送信（Downloadsに保存）',

    // Shared Files Tab
    'files.title_phone': '📂 PCからのファイル',
    'files.title_mac': '📂 共有ファイル一覧',
    'files.storage_label': '保存先:',
    'files.btn_change_folder': '⚙️ フォルダ変更',
    'files.btn_open_folder': '📁 フォルダを開く',
    'files.btn_refresh_title': 'リストを更新',
    'files.search_placeholder': '🔍 ファイルを検索...',
    'files.filter_all': 'すべて',
    'files.filter_images': '🖼️ 画像',
    'files.filter_docs': '📄 文書',
    'files.btn_preview': '👁️ 表示',
    'files.loading': 'ファイル一覧を読み込み中...',
    'files.empty': 'ファイルはありません',
    'files.btn_album': '🖼️ アルバム',
    'files.btn_download': '⬇️ 保存',
    'files.btn_delete': '🗑️',
    'files.btn_qr': '📱 QR',
    'files.stats': '{count} 件 • {size}',
    'files.stats_zero': '0 件',
    'files.badge_image': '画像',
    'files.confirm_delete': 'ファイル「{name}」を削除してもよろしいですか？',

    // Modals
    'modal.preview_title': 'ファイルプレビュー',
    'modal.qr_title': '📱 スマホでWebを開く',
    'modal.qr_sub': 'iPhoneまたはAndroidのカメラでQRコードを読み取ってください:',
    'modal.qr_close': '閉じる',
    'modal.file_qr_title': '直接ファイルダウンロード',
    'modal.file_qr_sub': '📱 スマホのカメラでスキャンして即時ダウンロード:',

    'modal.public_title': 'インターネット経由で共有（Public Share）',
    'modal.public_active_title': '✅ 公開トンネルが有効です！',
    'modal.public_active_sub': '相手にリンクまたはQRコードを共有し、PINコードを入力して送受信します:',
    'modal.public_link_label': '公開リンク:',
    'modal.public_pin_label': 'セキュリティPIN:',
    'modal.public_btn_copy': '📋 リンクとPINをコピー',
    'modal.public_btn_stop': '🛑 公開共有を停止',
    'modal.public_btn_start': '🚀 公開共有を開始',
    'modal.public_close': '閉じる',

    'modal.storage_title': '保存先フォルダ設定',
    'modal.storage_sub': 'スマホから受信したすべての写真やファイルはこのフォルダに保存されます。PC上の任意のフォルダに変更できます:',
    'modal.storage_label': 'フォルダパス:',
    'modal.storage_input_placeholder': '例: ~/Desktop/QuickShare',
    'modal.storage_presets': 'クイック設定:',
    'modal.storage_btn_cancel': 'キャンセル',
    'modal.storage_btn_save': '保存して適用',
    'modal.storage_saving': '保存中...',

    'modal.pin_title': 'PINコードが必要です',
    'modal.pin_sub': 'このリモート共有は保護されています。ホストから提示された4桁のPINを入力してください:',
    'modal.pin_btn': 'ロック解除',

    // Footer
    'footer.host_prefix': '<b>QuickShareホスト</b>稼働中 • 保存先: ',
    'footer.phone_prefix': 'ローカルWi-Fi経由で<b>PC</b>に接続済み',

    // Toasts & Alerts
    'toast.default': '通知',
    'toast.copied': 'クリップボードにコピーしました！',
    'toast.sent_text': 'PCのクリップボードに送信しました（Cmd+V可能）！',
    'toast.upload_success': 'アップロード完了！',
    'toast.upload_error': 'ファイル送信エラー',
    'toast.folder_changed': '保存先を変更しました: {dir}',
    'toast.folder_opened': 'PCの保存先フォルダを開きました！',
    'toast.folder_open_err': 'フォルダを開けませんでした',
    'toast.deleted': 'ファイルを削除しました',
    'toast.delete_err': '削除エラー',
    'toast.saved_album': '写真アルバム保存メニューを開きました！',
    'toast.public_started': '公開リンクを有効化しました！',
    'toast.public_stopped': '公開共有を停止しました！',
    'toast.qr_generating': 'ファイルを処理しQRコードを生成中...',
    'toast.qr_created': '直接ダウンロードQRコードを作成しました！',
    'toast.qr_upload_err': 'ホストへのファイル転送エラー',
    'toast.enter_text': 'テキストを入力してください！',
    'toast.text_too_long': 'テキストが長すぎます（2500文字以内）！',
    'toast.qr_text_created': 'テキストQRコードを生成しました！',
    'toast.clipboard_empty': 'PCのクリップボードが空です！',
    'toast.paste_phone': 'スマホから貼り付けました！',
    'toast.paste_direct_hint': '入力欄に直接貼り付けてください',
    'toast.text_send_err': 'PCに接続できません',
    'toast.text_send_err_detail': 'テキストの送信に失敗しました',
    'toast.copy_err': 'コピーエラー',
    'toast.upload_batch': '{count}件のファイルを送信中...',
    'toast.upload_batch_success': '{count}件のファイルを正常に送信しました！',
    'toast.folder_enter_path': 'フォルダパスを入力してください',
    'toast.folder_change_err': 'フォルダの変更に失敗しました',
    'toast.screenshot_detected': '📸 スクリーンショットを検知し即時QR化 (Cmd+V)！',
    'toast.text_pasted_qr': '📋 クリップボードのテキストからQR生成 (Cmd+V)！',
    'toast.photo_processing': '保存用画像を処理中...',
    'toast.photo_saved': '端末に画像を保存しました！',
    'toast.photo_save_err': '画像保存エラー: {error}',
    'toast.tunnel_create_err': '公開トンネルを作成できません',
    'toast.tunnel_init_err': 'Cloudflareトンネルの初期化エラー',
    'toast.tunnel_stop_err': '公開トンネルを停止できません',
    'toast.pin_unlocked': 'ロック解除成功！',
    'toast.pin_incorrect': 'PINコードが違います！',
    'toast.pin_length': 'PINは4桁の数字です！',
    'toast.pin_check_err': 'PIN確認エラー',

    // Standard Backend Error Translations
    'error.text_empty': 'テキストが空です',
    'error.no_files': 'ファイルが選択されていません',
    'error.cannot_read_dir': '保存先ディレクトリを読み込めません',
    'error.file_not_found': 'ファイルが見つかりません',
    'error.public_restricted': '公開接続では制限されている操作です',
    'error.storage_forbidden': '公開接続からのフォルダ変更は禁止されています',
    'error.cannot_use_dir': '指定されたディレクトリを使用できません: {error}',
  },

  zh: {
    // Header & Navigation
    'brand.title': 'Quick Share',
    'header.connecting': 'Wi-Fi 连接中...',
    'header.connected_mac': '已连接至电脑: {ip}',
    'header.disconnected': '未连接到服务器',
    'header.connect_phone': '📱 连接手机',
    'header.public_share': '🌐 公网: ',
    'header.public_on': '开启',
    'header.public_off': '关闭',
    'header.online': '在线',
    'tab.instant_qr': '即时二维码',
    'tab.sync_text': '剪贴板同步',
    'tab.send_files': '发送文件/照片',
    'tab.shared_files': '共享文件',
    'tab.files_from_mac': '来自电脑的文件',
    'tab.qr_default_name': '文件名',

    // Instant QR Tab
    'qr.title': '🎯 直链下载二维码生成',
    'qr.subtitle': '跨端分享至手机: 相机扫码即可秒速下载文件，无需打开网页。',
    'qr.subtab_file': '📁 文件 / 图片',
    'qr.subtab_text': '🔤 纯文本内容',
    'qr.dropzone_text': '拖放文件或点击从电脑选择',
    'qr.dropzone_sub': '支持所有格式（图片、PDF、视频、压缩包等）',
    'qr.or_paste': '<b>电脑快捷键:</b> 截图后在此页面任意位置按下 <kbd>⌘</kbd> + <kbd>V</kbd> 即可瞬间生成二维码！',
    'qr.scan_hint': '📱 <b>即扫即下:</b> 用手机相机对准二维码 -> 点击浮现的链接 -> 无需浏览器自动下载！',
    'qr.text_placeholder': '输入或粘贴文本、链接、密码、验证码等...',
    'qr.text_label': '输入要生成二维码的文本:',
    'qr.btn_gen_text': '生成文本二维码',
    'qr.btn_paste_mac': '📋 粘贴剪贴板',
    'qr.text_hint': '✨ <b>无需网络:</b> 手机相机对准二维码 -> 屏幕直接识别文本并出现<b>“复制文本”</b>按钮！',
    'qr.placeholder_title': '二维码展示区域',
    'qr.placeholder_sub': '在左侧选择文件或粘贴内容，即可为手机生成即时扫描二维码。',

    // Sync Text Tab
    'text.card_title_phone': '🚀 发送文字到电脑',
    'text.card_title_mac': '🚀 从电脑广播文本',
    'text.placeholder': '粘贴或输入内容（链接、消息、代码、密码等）',
    'text.btn_paste_phone': '📋 从手机粘贴',
    'text.btn_send': '🚀 发送到电脑',
    'text.mac_clip_title': '💻 电脑当前剪贴板',
    'text.mac_clip_empty': '电脑剪贴板当前为空',
    'text.mac_clip_err': '读取电脑剪贴板失败',
    'text.mac_clip_reading': '正在读取剪贴板...',
    'text.btn_copy_phone': '📋 复制',
    'text.btn_refresh': '🔄 刷新',

    // Upload Files Tab
    'upload.title_phone': '📷 发送照片 / 视频到电脑',
    'upload.btn_camera': '拍照',
    'upload.camera_sub': '立即启动相机',
    'upload.btn_gallery': '相册 / 图库',
    'upload.gallery_sub': '选择照片 / 视频 / 文件',
    'upload.selected_count': '已选择 ({count} 个文件):',
    'upload.selected_none': '已选择: 暂无文件',
    'upload.btn_start': '🚀 开始发送文件',
    'upload.uploading': '⏳ 正在传输至电脑...',
    'upload.btn_default': '📤 立即发送至电脑（保存至下载文件夹）',

    // Shared Files Tab
    'files.title_phone': '📂 来自电脑的文件',
    'files.title_mac': '📂 QuickShare 文件列表',
    'files.storage_label': '存储路径:',
    'files.btn_change_folder': '⚙️ 更改目录',
    'files.btn_open_folder': '📁 打开目录',
    'files.btn_refresh_title': '刷新文件列表',
    'files.search_placeholder': '🔍 搜索文件...',
    'files.filter_all': '全部',
    'files.filter_images': '🖼️ 图片',
    'files.filter_docs': '📄 文档',
    'files.btn_preview': '👁️ 预览',
    'files.loading': '正在加载文件列表...',
    'files.empty': '暂无文件',
    'files.btn_album': '🖼️ 相册',
    'files.btn_download': '⬇️ 下载',
    'files.btn_delete': '🗑️',
    'files.btn_qr': '📱 二维码',
    'files.stats': '{count} 个文件 • {size}',
    'files.stats_zero': '0 个文件',
    'files.badge_image': '图片',
    'files.confirm_delete': '确定要删除文件 "{name}" 吗？',

    // Modals
    'modal.preview_title': '文件预览',
    'modal.qr_title': '📱 在手机上打开控制页',
    'modal.qr_sub': '使用手机相机扫码即可进入管理页面:',
    'modal.qr_close': '关闭',
    'modal.file_qr_title': '直链下载文件',
    'modal.file_qr_sub': '📱 用手机相机扫码即可立即下载:',

    'modal.public_title': '公网远程分享 (Public Share)',
    'modal.public_active_title': '✅ 公网隧道正在运行！',
    'modal.public_active_sub': '接收者扫码或访问以下链接，输入PIN码即可收发文件:',
    'modal.public_link_label': '公网链接:',
    'modal.public_pin_label': '安全PIN码:',
    'modal.public_btn_copy': '📋 复制链接和PIN码',
    'modal.public_btn_stop': '🛑 停止公网分享',
    'modal.public_btn_start': '🚀 立即开启公网分享',
    'modal.public_close': '关闭',

    'modal.storage_title': '存储目录设置',
    'modal.storage_sub': '从手机接收到的所有照片和文件都将直接保存在该目录中。您可以更改为电脑上的任意文件夹:',
    'modal.storage_label': '文件夹路径:',
    'modal.storage_input_placeholder': '例如: ~/Desktop/QuickShare',
    'modal.storage_presets': '常用快捷目录:',
    'modal.storage_btn_cancel': '取消',
    'modal.storage_btn_save': '保存并应用',
    'modal.storage_saving': '正在保存...',

    'modal.pin_title': '需要安全PIN码',
    'modal.pin_sub': '此远程分享已被保护。请输入主机提供的4位数字PIN码:',
    'modal.pin_btn': '解锁数据',

    // Footer
    'footer.host_prefix': '正在运行于 <b>QuickShare 主机</b> • 目录: ',
    'footer.phone_prefix': '已通过局域网Wi-Fi连接至<b>电脑主机</b>',

    // Toasts & Alerts
    'toast.default': '通知',
    'toast.copied': '已复制到剪贴板！',
    'toast.sent_text': '已载入电脑剪贴板（Cmd + V即可粘贴）！',
    'toast.upload_success': '上传成功！',
    'toast.upload_error': '上传文件失败',
    'toast.folder_changed': '已将存储目录更改为: {dir}',
    'toast.folder_opened': '已在电脑上打开存储目录！',
    'toast.folder_open_err': '无法打开文件夹',
    'toast.deleted': '已成功删除文件',
    'toast.delete_err': '删除文件失败',
    'toast.saved_album': '已呼出存入相册面板！',
    'toast.public_started': '已启用公网远程分享！',
    'toast.public_stopped': '已关闭公网分享！',
    'toast.qr_generating': '正在处理文件并生成二维码...',
    'toast.qr_created': '直链下载二维码已就绪！',
    'toast.qr_upload_err': '上传文件至主机失败',
    'toast.enter_text': '请输入文本内容！',
    'toast.text_too_long': '文本过长（超过2500字符）！',
    'toast.qr_text_created': '文本二维码已生成！',
    'toast.clipboard_empty': '电脑剪贴板为空！',
    'toast.paste_phone': '已从手机粘贴！',
    'toast.paste_direct_hint': '请直接粘贴在文本框中',
    'toast.text_send_err': '无法连接至电脑主机',
    'toast.text_send_err_detail': '发送文本失败',
    'toast.copy_err': '复制到手机失败',
    'toast.upload_batch': '正在上传 {count} 个文件至 QuickShare...',
    'toast.upload_batch_success': '成功上传 {count} 个文件！',
    'toast.folder_enter_path': '请输入文件夹路径',
    'toast.folder_change_err': '更改文件夹失败',
    'toast.screenshot_detected': '📸 已捕获剪贴板截图并生成二维码 (Cmd+V)！',
    'toast.text_pasted_qr': '📋 已粘贴剪贴板文字并生成二维码 (Cmd+V)！',
    'toast.photo_processing': '正在处理要保存的图片...',
    'toast.photo_saved': '图片已成功下载到设备！',
    'toast.photo_save_err': '保存图片失败: {error}',
    'toast.tunnel_create_err': '无法创建公网隧道',
    'toast.tunnel_init_err': 'Cloudflare隧道初始化错误',
    'toast.tunnel_stop_err': '无法停止公网隧道',
    'toast.pin_unlocked': '解锁成功！',
    'toast.pin_incorrect': 'PIN码不正确！',
    'toast.pin_length': 'PIN码须为4位数字！',
    'toast.pin_check_err': 'PIN码验证错误',

    // Standard Backend Error Translations
    'error.text_empty': '文本内容为空',
    'error.no_files': '未提供任何文件',
    'error.cannot_read_dir': '无法读取下载目录',
    'error.file_not_found': '未找到文件',
    'error.public_restricted': '公网连接受限操作',
    'error.storage_forbidden': '禁止远程访客更改存储路径',
    'error.cannot_use_dir': '无法使用所选目录: {error}',
  },

  ko: {
    // Header & Navigation
    'brand.title': 'Quick Share',
    'header.connecting': 'Wi-Fi 연결 중...',
    'header.connected_mac': '호스트 연결됨: {ip}',
    'header.disconnected': '서버 연결 안 됨',
    'header.connect_phone': '📱 스마트폰 연결',
    'header.public_share': '🌐 원격: ',
    'header.public_on': '켜짐',
    'header.public_off': '꺼짐',
    'header.online': '온라인',
    'tab.instant_qr': '즉시 QR',
    'tab.sync_text': '클립보드 동기화',
    'tab.send_files': '파일 전송',
    'tab.shared_files': '공유 파일',
    'tab.files_from_mac': 'PC에서 받은 파일',
    'tab.qr_default_name': '파일명',

    // Instant QR Tab
    'qr.title': '🎯 직접 다운로드 QR 코드 생성',
    'qr.subtitle': '스마트폰으로 파일 공유: 카메라로 스캔하면 웹 접속 없이 즉시 다운로드됩니다.',
    'qr.subtab_file': '📁 파일 / 사진',
    'qr.subtab_text': '🔤 텍스트',
    'qr.dropzone_text': '파일을 드래그하거나 클릭하여 선택하세요',
    'qr.dropzone_sub': '사진, 동영상, 문서, Zip 지원',
    'qr.or_paste': '<b>단축키:</b> 스크린샷 후 이 페이지 어디서든 <kbd>⌘</kbd> + <kbd>V</kbd>를 누르면 즉시 QR이 생성됩니다!',
    'qr.scan_hint': '📱 <b>즉시 다운로드:</b> 스마트폰 카메라로 QR을 스캔하고 링크를 탭하면 자동으로 다운로드됩니다!',
    'qr.text_placeholder': '텍스트, 링크, 비밀번호, 인증코드 등을 입력하세요...',
    'qr.text_label': 'QR 코드를 생성할 텍스트 입력:',
    'qr.btn_gen_text': '텍스트 QR 생성',
    'qr.btn_paste_mac': '📋 클립보드 붙여넣기',
    'qr.text_hint': '✨ <b>오프라인 작동:</b> 스마트폰 카메라를 비추면 텍스트가 바로 인식되며 화면에서 <b>"텍스트 복사"</b>가 가능합니다!',
    'qr.placeholder_title': 'QR 코드 표시 영역',
    'qr.placeholder_sub': '왼쪽에서 파일 또는 텍스트를 선택하여 모바일용 즉시 스캔 QR 코드를 생성하세요.',

    // Sync Text Tab
    'text.card_title_phone': '🚀 PC로 텍스트 보내기',
    'text.card_title_mac': '🚀 호스트에서 텍스트 전송',
    'text.placeholder': '내용 입력 또는 붙여넣기 (링크, 메시지, 코드, 비밀번호...)',
    'text.btn_paste_phone': '📋 스마트폰에서 붙여넣기',
    'text.btn_send': '🚀 PC로 전송',
    'text.mac_clip_title': '💻 PC의 현재 클립보드',
    'text.mac_clip_empty': 'PC 클립보드가 비어 있습니다',
    'text.mac_clip_err': 'PC 클립보드 읽기 오류',
    'text.mac_clip_reading': '클립보드 읽는 중...',
    'text.btn_copy_phone': '📋 복사',
    'text.btn_refresh': '🔄 새로고침',

    // Upload Files Tab
    'upload.title_phone': '📷 사진 / 동영상을 PC로 전송',
    'upload.btn_camera': '사진 촬영',
    'upload.camera_sub': '카메라 실행',
    'upload.btn_gallery': '사진 보관함',
    'upload.gallery_sub': '사진 / 동영상 / 파일 선택',
    'upload.selected_count': '선택됨 ({count}개 파일):',
    'upload.selected_none': '선택됨: 파일 없음',
    'upload.btn_start': '🚀 파일 전송 시작',
    'upload.uploading': '⏳ PC로 전송 중...',
    'upload.btn_default': '📤 PC로 전송 (다운로드 폴더에 저장)',

    // Shared Files Tab
    'files.title_phone': '📂 PC에서 전송받은 파일',
    'files.title_mac': '📂 QuickShare 파일 목록',
    'files.storage_label': '저장 위치:',
    'files.btn_change_folder': '⚙️ 폴더 변경',
    'files.btn_open_folder': '📁 폴더 열기',
    'files.btn_refresh_title': '파일 목록 새로고침',
    'files.search_placeholder': '🔍 파일 검색...',
    'files.filter_all': '전체',
    'files.filter_images': '🖼️ 이미지',
    'files.filter_docs': '📄 문서',
    'files.btn_preview': '👁️ 보기',
    'files.loading': '파일 목록을 불러오는 중...',
    'files.empty': '저장된 파일이 없습니다',
    'files.btn_album': '🖼️ 앨범',
    'files.btn_download': '⬇️ 다운로드',
    'files.btn_delete': '🗑️',
    'files.btn_qr': '📱 QR',
    'files.stats': '{count}개 파일 • {size}',
    'files.stats_zero': '0개 파일',
    'files.badge_image': '이미지',
    'files.confirm_delete': '"{name}" 파일을 삭제하시겠습니까?',

    // Modals
    'modal.preview_title': '파일 미리보기',
    'modal.qr_title': '📱 스마트폰에서 웹 열기',
    'modal.qr_sub': '스마트폰 카메라로 QR 코드를 스캔하여 접속하세요:',
    'modal.qr_close': '닫기',
    'modal.file_qr_title': '직접 파일 다운로드',
    'modal.file_qr_sub': '📱 스마트폰 카메라로 스캔하여 즉시 다운로드:',

    'modal.public_title': '인터넷 원격 공유 (Public Share)',
    'modal.public_active_title': '✅ 공개 터널이 활성화되었습니다!',
    'modal.public_active_sub': '상대방이 아래 링크 또는 QR을 스캔하고 PIN 코드를 입력하면 파일을 전송할 수 있습니다:',
    'modal.public_link_label': '공개 링크:',
    'modal.public_pin_label': '보안 PIN:',
    'modal.public_btn_copy': '📋 링크 및 PIN 복사',
    'modal.public_btn_stop': '🛑 공개 공유 중지',
    'modal.public_btn_start': '🚀 지금 공개 공유 시작',
    'modal.public_close': '닫기',

    'modal.storage_title': '저장 폴더 설정',
    'modal.storage_sub': '스마트폰에서 전송받은 모든 파일은 이 폴더에 저장됩니다. PC의 원하는 폴더로 변경할 수 있습니다:',
    'modal.storage_label': '폴더 경로:',
    'modal.storage_input_placeholder': '예: ~/Desktop/QuickShare',
    'modal.storage_presets': '빠른 프리셋:',
    'modal.storage_btn_cancel': '취소',
    'modal.storage_btn_save': '저장 및 적용',
    'modal.storage_saving': '저장 중...',

    'modal.pin_title': 'PIN 코드가 필요합니다',
    'modal.pin_sub': '원격 공유가 보호되어 있습니다. 호스트가 제공한 4자리 PIN 코드를 입력하세요:',
    'modal.pin_btn': '데이터 잠금 해제',

    // Footer
    'footer.host_prefix': '<b>QuickShare 호스트</b> 실행 중 • 저장 위치: ',
    'footer.phone_prefix': '로컬 Wi-Fi를 통해 <b>호스트 PC</b>에 연결됨',

    // Toasts & Alerts
    'toast.default': '알림',
    'toast.copied': '클립보드에 복사되었습니다!',
    'toast.sent_text': '호스트 클립보드에 복사되었습니다 (Cmd + V)!',
    'toast.upload_success': '업로드 완료!',
    'toast.upload_error': '파일 업로드 오류',
    'toast.folder_changed': '저장 폴더가 변경되었습니다: {dir}',
    'toast.folder_opened': 'PC에서 저장 폴더를 열었습니다!',
    'toast.folder_open_err': '폴더를 열 수 없습니다',
    'toast.deleted': '파일이 삭제되었습니다',
    'toast.delete_err': '파일 삭제 오류',
    'toast.saved_album': '사진 앨범 저장 창이 열렸습니다!',
    'toast.public_started': '공개 공유 링크가 활성화되었습니다!',
    'toast.public_stopped': '공개 공유가 중단되었습니다!',
    'toast.qr_generating': '파일 업로드 및 QR 코드 생성 중...',
    'toast.qr_created': '직접 다운로드 QR 코드가 생성되었습니다!',
    'toast.qr_upload_err': '호스트로 파일 전송 실패',
    'toast.enter_text': '텍스트를 입력해 주세요!',
    'toast.text_too_long': '텍스트가 너무 깁니다 (2500자 초과)!',
    'toast.qr_text_created': '텍스트 QR 코드가 생성되었습니다!',
    'toast.clipboard_empty': 'PC 클립보드가 비어 있습니다!',
    'toast.paste_phone': '스마트폰에서 붙여넣었습니다!',
    'toast.paste_direct_hint': '입력창에 직접 붙여넣어 주세요',
    'toast.text_send_err': '호스트 PC에 연결할 수 없습니다',
    'toast.text_send_err_detail': '텍스트 전송 실패',
    'toast.copy_err': '클립보드 복사 실패',
    'toast.upload_batch': '{count}개 파일 업로드 중...',
    'toast.upload_batch_success': '{count}개 파일 업로드 완료!',
    'toast.folder_enter_path': '폴더 경로를 입력해 주세요',
    'toast.folder_change_err': '폴더 변경 실패',
    'toast.screenshot_detected': '📸 클립보드 스크린샷 감지 및 QR 생성 (Cmd+V)!',
    'toast.text_pasted_qr': '📋 클립보드 텍스트 붙여넣기 및 QR 생성 (Cmd+V)!',
    'toast.photo_processing': '저장할 이미지를 처리 중입니다...',
    'toast.photo_saved': '기기에 이미지가 저장되었습니다!',
    'toast.photo_save_err': '이미지 저장 오류: {error}',
    'toast.tunnel_create_err': '공개 터널을 생성할 수 없습니다',
    'toast.tunnel_init_err': 'Cloudflare 터널 초기화 오류',
    'toast.tunnel_stop_err': '공개 터널을 중지할 수 없습니다',
    'toast.pin_unlocked': '잠금 해제 성공!',
    'toast.pin_incorrect': 'PIN 코드가 올바르지 않습니다!',
    'toast.pin_length': 'PIN은 4자리 숫자여야 합니다!',
    'toast.pin_check_err': 'PIN 확인 오류',

    // Standard Backend Error Translations
    'error.text_empty': '텍스트 내용이 비어 있습니다',
    'error.no_files': '선택된 파일이 없습니다',
    'error.cannot_read_dir': '저장 디렉터리를 읽을 수 없습니다',
    'error.file_not_found': '파일을 찾을 수 없습니다',
    'error.public_restricted': '공개 연결에서 제한된 기능입니다',
    'error.storage_forbidden': '공개 접속자는 저장 경로를 변경할 수 없습니다',
    'error.cannot_use_dir': '선택한 디렉터리를 사용할 수 없습니다: {error}',
  },
};

// Detect initial language
function detectInitialLanguage() {
  const saved = localStorage.getItem('quickshare_lang');
  if (saved && SUPPORTED_LANGUAGES[saved]) return saved;
  const navLang = (navigator.language || '').toLowerCase();
  if (navLang.startsWith('vi')) return 'vi';
  if (navLang.startsWith('ja')) return 'ja';
  if (navLang.startsWith('zh')) return 'zh';
  if (navLang.startsWith('ko')) return 'ko';
  return 'en';
}

let currentLang = detectInitialLanguage();

/**
 * Translate key with fallback chain: currentLang -> en -> vi -> key
 * Supports parameter interpolation: t('hello {name}', { name: 'World' })
 */
function t(key, params = null) {
  let str = null;
  if (translations[currentLang] && translations[currentLang][key]) {
    str = translations[currentLang][key];
  } else if (translations.en && translations.en[key]) {
    str = translations.en[key];
  } else if (translations.vi && translations.vi[key]) {
    str = translations.vi[key];
  } else {
    str = key;
  }

  if (params && typeof params === 'object') {
    Object.keys(params).forEach((p) => {
      str = str.replace(new RegExp(`\\{${p}\\}`, 'g'), params[p]);
    });
  }
  return str;
}

/**
 * Register a new language dynamically at runtime.
 */
function registerLanguage(code, metadata, dictionary) {
  if (!code || !metadata || !dictionary) return false;
  SUPPORTED_LANGUAGES[code] = { code, ...metadata };
  translations[code] = { ...dictionary };
  renderLanguageDropdown();
  return true;
}

function getSupportedLanguages() {
  return Object.values(SUPPORTED_LANGUAGES);
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGUAGES[lang]) lang = 'en';
  currentLang = lang;
  localStorage.setItem('quickshare_lang', lang);
  document.documentElement.lang = lang;
  updateDomTranslations();
  renderLanguageDropdown();

  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang, meta: SUPPORTED_LANGUAGES[lang] } }));
}

function updateDomTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = translation;
    } else {
      el.innerHTML = translation;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });

  const langInfo = SUPPORTED_LANGUAGES[currentLang] || SUPPORTED_LANGUAGES.en;
  const currentLangFlag = document.getElementById('current-lang-flag');
  const currentLangName = document.getElementById('current-lang-name');
  if (currentLangFlag) currentLangFlag.innerText = langInfo.flag;
  if (currentLangName) currentLangName.innerText = langInfo.code.toUpperCase();
}

function renderLanguageDropdown() {
  const menu = document.getElementById('lang-dropdown-menu');
  if (!menu) return;

  menu.innerHTML = Object.values(SUPPORTED_LANGUAGES)
    .map((lang) => `
      <button type="button" class="lang-option ${lang.code === currentLang ? 'active' : ''}" data-lang="${lang.code}">
        <span>${lang.flag}</span>
        <span>${lang.name}</span>
      </button>
    `)
    .join('');

  menu.querySelectorAll('.lang-option').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = btn.getAttribute('data-lang');
      setLanguage(code);
      menu.classList.add('hidden');
    });
  });
}

// Global Exports
window.t = t;
window.currentLang = () => currentLang;
window.setLanguage = setLanguage;
window.registerLanguage = registerLanguage;
window.getSupportedLanguages = getSupportedLanguages;
window.updateDomTranslations = updateDomTranslations;
window.renderLanguageDropdown = renderLanguageDropdown;
