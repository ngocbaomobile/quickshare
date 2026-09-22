// ==============================================================================
// 🌐 QuickShare Extensible Internationalization (i18n) Engine
// Supports dynamic multi-language registration, fallbacks & parameter injection.
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
    'text.btn_copy_phone': '📋 Sao chép',
    'text.btn_refresh': '🔄 Làm mới',

    // Upload Files Tab
    'upload.title_phone': '📷 Gửi Ảnh / Video sang Máy tính',
    'upload.btn_camera': 'Chụp ảnh',
    'upload.camera_sub': 'Mở camera ngay',
    'upload.btn_gallery': 'Thư viện ảnh',
    'upload.gallery_sub': 'Chọn ảnh / video / tệp',
    'upload.selected_count': 'Đã chọn ({count} file):',
    'upload.btn_start': '🚀 Bắt đầu gửi tệp',
    'upload.uploading': '⏳ Đang chuyển sang Mac...',
    'upload.btn_default': '📤 Gửi ngay sang Mac (Lưu vào Downloads)',

    // Shared Files Tab
    'files.title_phone': '📂 Tệp từ máy tính gửi sang',
    'files.title_mac': '📂 Tệp QuickShare',
    'files.storage_label': 'Lưu tại:',
    'files.btn_change_folder': '⚙️ Đổi folder',
    'files.btn_open_folder': '📁 Mở thư mục',
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

    // Toasts
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
    'toast.copy_err': 'Lỗi khi copy vào điện thoại',
    'toast.upload_batch': 'Đang tải {count} file lên QuickShare...',
    'toast.upload_batch_success': 'Đã tải lên {count} file thành công!',
    'toast.folder_enter_path': 'Vui lòng nhập đường dẫn thư mục',
    'toast.screenshot_detected': '📸 Đã bắt ảnh chụp màn hình từ Clipboard (Cmd+V)!',
    'toast.text_pasted_qr': '📋 Đã dán text từ Clipboard (Cmd+V) và sinh QR!',
    'toast.photo_processing': 'Đang xử lý ảnh để lưu vào máy...',
    'toast.photo_saved': 'Đã tải ảnh về máy thành công!',
    'toast.pin_unlocked': 'Mở khóa thành công!',
    'toast.pin_incorrect': 'Mã PIN không chính xác!',
    'toast.pin_length': 'Mã PIN gồm 4 số!',
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
    'text.btn_copy_phone': '📋 Copy',
    'text.btn_refresh': '🔄 Refresh',

    // Upload Files Tab
    'upload.title_phone': '📷 Send Photos / Videos to Computer',
    'upload.btn_camera': 'Take Photo',
    'upload.camera_sub': 'Open camera now',
    'upload.btn_gallery': 'Photo Library',
    'upload.gallery_sub': 'Choose photos / videos / files',
    'upload.selected_count': 'Selected ({count} files):',
    'upload.btn_start': '🚀 Start Sending Files',
    'upload.uploading': '⏳ Transferring to Host...',
    'upload.btn_default': '📤 Send to Host (Saved in Downloads)',

    // Shared Files Tab
    'files.title_phone': '📂 Files from Host Computer',
    'files.title_mac': '📂 QuickShare Files',
    'files.storage_label': 'Saved in:',
    'files.btn_change_folder': '⚙️ Change Folder',
    'files.btn_open_folder': '📁 Open Folder',
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

    // Toasts
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
    'toast.copy_err': 'Error copying to phone clipboard',
    'toast.upload_batch': 'Uploading {count} files to QuickShare...',
    'toast.upload_batch_success': 'Uploaded {count} files successfully!',
    'toast.folder_enter_path': 'Please enter a folder path',
    'toast.screenshot_detected': '📸 Captured screenshot from Clipboard (Cmd+V)!',
    'toast.text_pasted_qr': '📋 Pasted text from Clipboard (Cmd+V) & generated QR!',
    'toast.photo_processing': 'Processing image to save...',
    'toast.photo_saved': 'Image saved to device successfully!',
    'toast.pin_unlocked': 'Unlocked successfully!',
    'toast.pin_incorrect': 'Incorrect PIN code!',
    'toast.pin_length': 'PIN must be 4 digits!',
  },

  ja: {
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
    'qr.title': '🎯 直接ダウンロードQRコード',
    'qr.subtab_file': '📁 ファイル / 写真',
    'qr.subtab_text': '🔤 テキスト',
    'qr.dropzone_text': 'ファイルをドロップまたはクリックして選択',
    'qr.dropzone_sub': '写真、動画、書類、Zip対応',
    'qr.or_paste': '<b>ショートカット:</b> 画面キャプチャ後に <kbd>⌘</kbd> + <kbd>V</kbd> で即時QR生成！',
    'qr.scan_hint': '📱 スマホのカメラで読み取ると即ダウンロードされます',
    'qr.text_placeholder': '送信するテキストを入力...',
    'qr.btn_gen_text': 'テキストQRを生成',
    'qr.btn_paste_mac': '📋 クリップボード貼り付け',
    'qr.placeholder_title': 'QRコード表示エリア',
    'qr.placeholder_sub': '左側でファイルを選択またはテキストを入力すると、QRコードが表示されます。',
    'text.card_title_phone': '🚀 PCへテキスト送信',
    'text.btn_send': '🚀 PCへ送信',
    'text.mac_clip_title': '💻 PCのクリップボード',
    'files.title_mac': '📂 共有ファイル一覧',
    'files.storage_label': '保存先:',
    'files.btn_change_folder': '⚙️ フォルダ変更',
    'files.btn_open_folder': '📁 フォルダを開く',
    'files.search_placeholder': '🔍 ファイルを検索...',
    'files.filter_all': 'すべて',
    'files.filter_images': '🖼️ 画像',
    'files.filter_docs': '📄 文書',
    'files.btn_preview': '👁️ 表示',
    'files.empty': 'ファイルはありません',
    'files.btn_download': '⬇️ 保存',
    'files.btn_delete': '🗑️',
    'files.btn_qr': '📱 QR',
    'files.stats': '{count} 件 • {size}',
    'files.badge_image': '画像',
    'files.confirm_delete': 'ファイル「{name}」を削除してもよろしいですか？',
    'modal.preview_title': 'ファイルプレビュー',
    'modal.qr_close': '閉じる',
    'modal.storage_title': '保存先フォルダ設定',
    'modal.storage_btn_save': '保存して適用',
    'toast.copied': 'クリップボードにコピーしました！',
    'toast.deleted': 'ファイルを削除しました',
    'toast.delete_err': '削除エラー',
  },

  zh: {
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
    'qr.title': '🎯 直链下载二维码',
    'qr.subtab_file': '📁 文件 / 图片',
    'qr.subtab_text': '🔤 纯文本',
    'qr.dropzone_text': '拖放文件或点击选择',
    'qr.dropzone_sub': '支持图片、视频、文档、Zip等',
    'qr.or_paste': '<b>电脑快捷键:</b> 截屏后按 <kbd>⌘</kbd> + <kbd>V</kbd> 即可瞬间生成二维码！',
    'qr.scan_hint': '📱 手机相机扫码即可立即下载',
    'qr.text_placeholder': '输入要发送到手机的文本...',
    'qr.btn_gen_text': '生成文本二维码',
    'qr.btn_paste_mac': '📋 粘贴剪贴板',
    'qr.placeholder_title': '二维码展示区域',
    'qr.placeholder_sub': '在左侧选择或粘贴文件/文本以生成手机扫描二维码。',
    'text.card_title_phone': '🚀 发送文字到电脑',
    'text.btn_send': '🚀 发送到电脑',
    'text.mac_clip_title': '💻 电脑当前剪贴板',
    'files.title_mac': '📂 共享文件列表',
    'files.storage_label': '存储路径:',
    'files.btn_change_folder': '⚙️ 更改目录',
    'files.btn_open_folder': '📁 打开目录',
    'files.search_placeholder': '🔍 搜索文件...',
    'files.filter_all': '全部',
    'files.filter_images': '🖼️ 图片',
    'files.filter_docs': '📄 文档',
    'files.btn_preview': '👁️ 预览',
    'files.empty': '暂无文件',
    'files.btn_download': '⬇️ 下载',
    'files.btn_delete': '🗑️',
    'files.btn_qr': '📱 二维码',
    'files.stats': '{count} 个文件 • {size}',
    'files.badge_image': '图片',
    'files.confirm_delete': '确定要删除文件 "{name}" 吗？',
    'modal.preview_title': '文件预览',
    'modal.qr_close': '关闭',
    'modal.storage_title': '存储目录设置',
    'modal.storage_btn_save': '保存并应用',
    'toast.copied': '已复制到剪贴板！',
    'toast.deleted': '已成功删除文件',
    'toast.delete_err': '删除文件失败',
  },

  ko: {
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
    'qr.title': '🎯 직접 다운로드 QR 코드',
    'qr.subtab_file': '📁 파일 / 사진',
    'qr.subtab_text': '🔤 일반 텍스트',
    'qr.dropzone_text': '파일을 드래그하거나 클릭하여 선택하세요',
    'qr.dropzone_sub': '사진, 동영상, 문서, Zip 지원',
    'qr.or_paste': '<b>단축키:</b> 스크린샷 후 <kbd>⌘</kbd> + <kbd>V</kbd>를 누르면 즉시 QR 코드가 생성됩니다!',
    'qr.scan_hint': '📱 카메라로 QR 코드를 스캔하세요',
    'qr.text_placeholder': '스마트폰으로 보낼 텍스트 입력...',
    'qr.btn_gen_text': '텍스트 QR 생성',
    'qr.btn_paste_mac': '📋 클립보드 붙여넣기',
    'qr.placeholder_title': 'QR 코드 표시 영역',
    'qr.placeholder_sub': '왼쪽에서 파일 또는 텍스트를 선택하여 즉시 스캔 QR을 생성하세요.',
    'text.card_title_phone': '🚀 PC로 텍스트 보내기',
    'text.btn_send': '🚀 PC로 전송',
    'text.mac_clip_title': '💻 PC의 현재 클립보드',
    'files.title_mac': '📂 공유 파일 목록',
    'files.storage_label': '저장 위치:',
    'files.btn_change_folder': '⚙️ 폴더 변경',
    'files.btn_open_folder': '📁 폴더 열기',
    'files.search_placeholder': '🔍 파일 검색...',
    'files.filter_all': '전체',
    'files.filter_images': '🖼️ 이미지',
    'files.filter_docs': '📄 문서',
    'files.btn_preview': '👁️ 보기',
    'files.empty': '저장된 파일이 없습니다',
    'files.btn_download': '⬇️ 다운로드',
    'files.btn_delete': '🗑️',
    'files.btn_qr': '📱 QR',
    'files.stats': '{count}개 파일 • {size}',
    'files.badge_image': '이미지',
    'files.confirm_delete': '"{name}" 파일을 삭제하시겠습니까?',
    'modal.preview_title': '파일 미리보기',
    'modal.qr_close': '닫기',
    'modal.storage_title': '저장 폴더 설정',
    'modal.storage_btn_save': '저장 및 적용',
    'toast.copied': '클립보드에 복사되었습니다!',
    'toast.deleted': '파일이 삭제되었습니다',
    'toast.delete_err': '파일 삭제 오류',
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
