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
  },

  ja: {
    'brand.title': 'Quick Share',
    'header.connecting': 'Wi-Fi接続中...',
    'header.connect_phone': '📱 スマホ接続',
    'header.public_share': '🌐 公開共有',
    'header.online': 'オンライン',
    'tab.instant_qr': '即時QR',
    'tab.sync_text': 'テキスト共有',
    'tab.send_files': 'ファイル送信',
    'tab.shared_files': '共有ファイル',
    'tab.files_from_mac': 'PCからのファイル',
    'qr.title': '直接ダウンロードQRコード',
    'qr.subtitle': 'iPhone / Androidカメラでスキャンするだけで即時ダウンロード。',
    'qr.subtab_file': '📁 ファイル / 写真',
    'qr.subtab_text': '🔤 テキスト',
    'qr.dropzone_text': 'ファイルをドロップまたはクリックして選択',
    'qr.dropzone_sub': '写真、動画、書類、Zip対応 (最大500MB)',
    'qr.or_paste': 'または画面をキャプチャして <b>Cmd + V</b> で即時QR生成！',
    'qr.scan_hint': '📱 スマホのカメラで読み取ると即ダウンロードされます',
    'qr.text_placeholder': '送信するテキストを入力...',
    'qr.btn_gen_text': 'テキストQRを生成',
    'qr.btn_paste_mac': '📋 クリップボード貼り付け',
    'text.card_title_phone': '✍️ PCへテキスト送信',
    'text.card_title_mac': '✍️ テキストを配信',
    'text.placeholder': 'テキストを入力または貼り付け...',
    'text.btn_send': '🚀 PCへ送信',
    'text.mac_clip_title': '📋 PCのクリップボード',
    'files.title_mac': '📂 共有ファイル一覧',
    'files.storage_label': '保存先:',
    'files.btn_change_folder': '⚙️ フォルダ変更',
    'files.btn_open_folder': '📁 フォルダを開く',
    'files.empty': 'ファイルはありません',
    'files.btn_download': '⬇️ 保存',
    'modal.storage_title': '保存先フォルダ設定',
    'modal.storage_btn_save': '保存して適用',
    'toast.copied': 'クリップボードにコピーしました！',
  },

  zh: {
    'brand.title': 'Quick Share',
    'header.connecting': 'Wi-Fi 连接中...',
    'header.connect_phone': '📱 连接手机',
    'header.public_share': '🌐 公网分享',
    'header.online': '在线',
    'tab.instant_qr': '即时二维码',
    'tab.sync_text': '剪贴板同步',
    'tab.send_files': '发送文件/照片',
    'tab.shared_files': '共享文件',
    'tab.files_from_mac': '来自电脑的文件',
    'qr.title': '直链下载二维码',
    'qr.subtitle': '用手机相机扫描即可直接下载文件，无需打开网页。',
    'qr.subtab_file': '📁 文件 / 图片',
    'qr.subtab_text': '🔤 纯文本',
    'qr.dropzone_text': '拖放文件或点击选择',
    'qr.dropzone_sub': '支持图片、视频、文档、Zip等（最大500MB）',
    'qr.or_paste': '截屏后按 <b>Cmd + V</b> 即可瞬间生成二维码！',
    'qr.scan_hint': '📱 手机相机扫码即可立即下载',
    'qr.text_placeholder': '输入要发送到手机的文本...',
    'qr.btn_gen_text': '生成文本二维码',
    'qr.btn_paste_mac': '📋 粘贴剪贴板',
    'text.card_title_phone': '✍️ 发送文字到电脑',
    'text.card_title_mac': '✍️ 广播文字',
    'text.placeholder': '在此输入或粘贴文字...',
    'text.btn_send': '🚀 发送到电脑',
    'text.mac_clip_title': '📋 电脑当前剪贴板',
    'files.title_mac': '📂 共享文件列表',
    'files.storage_label': '存储路径:',
    'files.btn_change_folder': '⚙️ 更改目录',
    'files.btn_open_folder': '📁 打开目录',
    'files.empty': '暂无文件',
    'files.btn_download': '⬇️ 下载',
    'modal.storage_title': '存储目录设置',
    'modal.storage_btn_save': '保存并应用',
    'toast.copied': '已复制到剪贴板！',
  },

  ko: {
    'brand.title': 'Quick Share',
    'header.connecting': 'Wi-Fi 연결 중...',
    'header.connect_phone': '📱 스마트폰 연결',
    'header.public_share': '🌐 원격 공유',
    'header.online': '온라인',
    'tab.instant_qr': '즉시 QR',
    'tab.sync_text': '클립보드 동기화',
    'tab.send_files': '파일 전송',
    'tab.shared_files': '공유 파일',
    'tab.files_from_mac': 'PC에서 받은 파일',
    'qr.title': '직접 다운로드 QR 코드',
    'qr.subtitle': '스마트폰 카메라로 스캔하면 웹 접속 없이 즉시 파일이 다운로드됩니다.',
    'qr.subtab_file': '📁 파일 / 사진',
    'qr.subtab_text': '🔤 일반 텍스트',
    'qr.dropzone_text': '파일을 드래그하거나 클릭하여 선택하세요',
    'qr.dropzone_sub': '사진, 동영상, 문서, Zip 지원 (최대 500MB)',
    'qr.or_paste': '스크린샷 후 <b>Cmd + V</b>를 누르면 즉시 QR 코드가 생성됩니다!',
    'qr.scan_hint': '📱 카메라로 QR 코드를 스캔하세요',
    'qr.text_placeholder': '스마트폰으로 보낼 텍스트 입력...',
    'qr.btn_gen_text': '텍스트 QR 생성',
    'qr.btn_paste_mac': '📋 클립보드 붙여넣기',
    'text.card_title_phone': '✍️ PC로 텍스트 보내기',
    'text.card_title_mac': '✍️ 텍스트 브로드캐스트',
    'text.placeholder': '텍스트를 입력하거나 붙여넣으세요...',
    'text.btn_send': '🚀 PC로 전송',
    'text.mac_clip_title': '📋 PC의 현재 클립보드',
    'files.title_mac': '📂 공유 파일 목록',
    'files.storage_label': '저장 위치:',
    'files.btn_change_folder': '⚙️ 폴더 변경',
    'files.btn_open_folder': '📁 폴더 열기',
    'files.empty': '저장된 파일이 없습니다',
    'files.btn_download': '⬇️ 다운로드',
    'modal.storage_title': '저장 폴더 설정',
    'modal.storage_btn_save': '저장 및 적용',
    'toast.copied': '클립보드에 복사되었습니다!',
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
 * Translate key with fallback chain: currentLang -> en -> key
 * Supports parameter interpolation: t('hello {name}', { name: 'World' })
 */
function t(key, params = null) {
  let str = null;
  if (translations[currentLang] && translations[currentLang][key]) {
    str = translations[currentLang][key];
  } else if (translations.en && translations.en[key]) {
    str = translations.en[key];
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
 * Usage: window.registerLanguage('fr', { name: 'Français', flag: '🇫🇷' }, { ...translations })
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
