// 1. DEVICE DETECTION: PHONE VS MAC
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || (navigator.maxTouchPoints > 1 && window.innerWidth <= 768);

    if (isMobile) {
      document.body.classList.remove('is-mac');
      document.body.classList.add('is-phone');
    } else {
      document.body.classList.remove('is-phone');
      document.body.classList.add('is-mac');
    }

    function updateTitles() {
      const appTitle = document.getElementById('app-title');
      const tabFilesTitle = document.getElementById('tab-files-title');
      if (typeof t !== 'function') return;
      if (isMobile) {
        if (appTitle) appTitle.innerText = `📱 ${t('brand.title')} (${t('tab.files_from_mac')})`;
        if (tabFilesTitle) tabFilesTitle.innerText = t('tab.files_from_mac');
      } else {
        if (appTitle) appTitle.innerText = `💻 ${t('brand.title')}`;
        if (tabFilesTitle) tabFilesTitle.innerText = t('tab.shared_files');
      }
    }

    // Extensible Language Dropdown Setup
    const btnLangDropdown = document.getElementById('btn-lang-dropdown');
    const langDropdownMenu = document.getElementById('lang-dropdown-menu');

    if (btnLangDropdown && langDropdownMenu) {
      btnLangDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdownMenu.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!langDropdownMenu.contains(e.target) && !btnLangDropdown.contains(e.target)) {
          langDropdownMenu.classList.add('hidden');
        }
      });
    }

    const tr = (key, fallback, params) => {
      if (typeof t === 'function') {
        const val = t(key, params);
        if (val && val !== key) return val;
      }
      return fallback;
    };

    const ERROR_I18N_MAP = {
      'Text content is empty': 'error.text_empty',
      'No files provided': 'error.no_files',
      'No file selected': 'error.no_files',
      'Cannot read downloads directory': 'error.cannot_read_dir',
      'File not found': 'error.file_not_found',
      'Access restricted for public visitors': 'error.public_restricted',
      'Action not allowed on public connection': 'error.public_restricted',
      'Feature disabled on public connection': 'error.public_restricted',
      'Changing storage path is forbidden for public visitors': 'error.storage_forbidden',
      'Directory path is required': 'toast.folder_enter_path',
      'Invalid PIN code': 'toast.pin_incorrect',
      'Failed to start tunnel': 'toast.tunnel_create_err',
      'Tunnel initialization timed out': 'toast.tunnel_create_err',
    };

    function formatErrorMessage(errOrMsg, fallbackKey, fallbackDefault) {
      const raw = typeof errOrMsg === 'string' ? errOrMsg : (errOrMsg && errOrMsg.message) ? errOrMsg.message : '';
      if (raw && ERROR_I18N_MAP[raw]) {
        return tr(ERROR_I18N_MAP[raw], raw);
      }
      if (raw && raw.startsWith('Cannot use directory:')) {
        const detail = raw.replace('Cannot use directory:', '').trim();
        return tr('error.cannot_use_dir', raw, { error: detail });
      }
      if (raw) return raw;
      return tr(fallbackKey, fallbackDefault);
    }

    window.addEventListener('languageChanged', () => {
      updateTitles();
      loadFiles();
      loadInfo();
      loadClipboard();
      checkTunnelStatus();
    });

    if (window.renderLanguageDropdown) {
      window.renderLanguageDropdown();
    }
    if (window.updateDomTranslations) {
      window.updateDomTranslations();
    }
    updateTitles();

    // Elements
    const toast = document.getElementById('toast');
    const toastText = document.getElementById('toast-text');
    const textInput = document.getElementById('text-input');
    const btnSendText = document.getElementById('btn-send-text');
    const btnPastePhone = document.getElementById('btn-paste-phone');
    const macClipboardContent = document.getElementById('mac-clipboard-content');
    const btnRefreshClipboard = document.getElementById('btn-refresh-clipboard');
    const btnCopyToPhone = document.getElementById('btn-copy-to-phone');
    const cameraInput = document.getElementById('camera-input');
    const galleryInput = document.getElementById('gallery-input');
    const selectedFilesContainer = document.getElementById('selected-files-container');
    const selectedFilesCount = document.getElementById('selected-files-count');
    const selectedFilesList = document.getElementById('selected-files-list');
    const btnUploadFiles = document.getElementById('btn-upload-files');
    const filesList = document.getElementById('files-list');
    const btnRefreshFiles = document.getElementById('btn-refresh-files');
    const btnOpenFolder = document.getElementById('btn-open-folder');
    const qrModal = document.getElementById('qr-modal');
    const btnShowAppQr = document.getElementById('btn-show-app-qr');
    const btnCloseQr = document.getElementById('btn-close-qr');
    const modalQrCode = document.getElementById('modal-qrcode');
    const modalUrl = document.getElementById('modal-url');
    const macIpLabel = document.getElementById('mac-ip-label');

    // Instant QR Elements
    const subtabFileMode = document.getElementById('subtab-file-mode');
    const subtabTextMode = document.getElementById('subtab-text-mode');
    const instantQrFileSection = document.getElementById('instant-qr-file-section');
    const instantQrTextSection = document.getElementById('instant-qr-text-section');
    const instantFileInput = document.getElementById('instant-file-input');
    const fileQrDisplay = document.getElementById('file-qr-display');
    const fileQrcodeBox = document.getElementById('file-qrcode-box');
    const fileQrName = document.getElementById('file-qr-name');
    const fileQrSize = document.getElementById('file-qr-size');
    const rawTextInput = document.getElementById('raw-text-input');
    const btnGenTextQr = document.getElementById('btn-gen-text-qr');
    const btnUseMacClipboardForQr = document.getElementById('btn-use-mac-clipboard-for-qr');
    const textQrDisplay = document.getElementById('text-qr-display');
    const textQrcodeBox = document.getElementById('text-qrcode-box');
    const instantDropzone = document.getElementById('instant-dropzone');

    // Single File Modal
    const singleFileModal = document.getElementById('single-file-modal');
    const modalFileTitle = document.getElementById('modal-file-title');
    const modalFileQr = document.getElementById('modal-file-qr');
    const btnCloseFileModal = document.getElementById('btn-close-file-modal');

    let currentMacClipboard = '';
    let pendingFiles = [];

    function showToast(msg, icon = '✅') {
      toastText.innerText = msg;
      document.getElementById('toast-icon').innerText = icon;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function formatBytes(bytes) {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    // Tab Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
        btn.classList.add('active');
        const content = document.getElementById(btn.dataset.tab);
        if (content) content.classList.remove('hidden');
        if (btn.dataset.tab === 'tab-files') loadFiles();
        if (btn.dataset.tab === 'tab-text') loadClipboard();
      });
    });

    // Default tab by device
    if (isMobile) {
      const defaultBtn = document.querySelector('[data-tab="tab-media"]');
      if (defaultBtn) defaultBtn.click();
    } else {
      const defaultBtn = document.querySelector('[data-tab="tab-instant-qr"]');
      if (defaultBtn) defaultBtn.click();
    }

    // Subtab: File vs Text inside Instant QR
    if (subtabFileMode && subtabTextMode) {
      subtabFileMode.addEventListener('click', () => {
        subtabFileMode.classList.add('active');
        subtabTextMode.classList.remove('active');
        instantQrFileSection.classList.remove('hidden');
        instantQrTextSection.classList.add('hidden');
      });

      subtabTextMode.addEventListener('click', () => {
        subtabTextMode.classList.add('active');
        subtabFileMode.classList.remove('active');
        instantQrTextSection.classList.remove('hidden');
        instantQrFileSection.classList.add('hidden');
      });
    }

    // Fetch system info and local IP
    async function loadInfo() {
      try {
        const res = await apiFetch('/api/info');
        const data = await res.json();
        if (isMobile) {
          macIpLabel.innerText = tr('header.connected_mac', `Kết nối với Mac: ${data.local_ip}`, { ip: data.local_ip });
        } else {
          macIpLabel.innerText = `Wi-Fi IP: ${data.local_ip}:${data.port}`;
        }
        modalUrl.innerText = data.url;

        if (modalQrCode) {
          modalQrCode.innerHTML = '';
          new QRCode(modalQrCode, {
            text: data.url,
            width: 180,
            height: 180,
            colorDark: '#0f172a',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
          });
        }
      } catch (err) {
        macIpLabel.innerText = tr('header.disconnected', 'Chưa kết nối được với server');
      }
    }

    if (btnShowAppQr) btnShowAppQr.addEventListener('click', () => qrModal.classList.add('active'));
    if (btnCloseQr) btnCloseQr.addEventListener('click', () => qrModal.classList.remove('active'));
    if (qrModal) {
      qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) qrModal.classList.remove('active');
      });
    }

    // --- INSTANT QR GENERATION (MAC ONLY) ---
    async function processInstantFile(file) {
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);

      showToast(tr('toast.qr_generating', 'Đang tải file và sinh mã QR...'), '⏳');

      try {
        const res = await apiFetch('/api/quick-qr-file', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (res.ok) {
          fileQrName.innerText = data.filename;
          fileQrSize.innerText = formatBytes(data.size);
          
          fileQrcodeBox.innerHTML = '';
          new QRCode(fileQrcodeBox, {
            text: data.direct_url,
            width: 190,
            height: 190,
            colorDark: '#0f172a',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
          });

          fileQrDisplay.classList.remove('hidden');
          const qrPlaceholder = document.getElementById('qr-empty-placeholder');
          if (qrPlaceholder) qrPlaceholder.classList.add('hidden');
          showToast(tr('toast.qr_created', 'Đã tạo mã QR tải trực tiếp!'), '🎯');
          loadFiles();
        } else {
          showToast(formatErrorMessage(data.error, 'toast.upload_error', 'Lỗi tải file'), '❌');
        }
      } catch (err) {
        showToast(tr('toast.qr_upload_err', 'Lỗi khi tải file lên Mac'), '❌');
      }
    }

    if (instantFileInput) {
      instantFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          processInstantFile(e.target.files[0]);
          e.target.value = '';
        }
      });
    }

    if (instantDropzone) {
      ['dragenter', 'dragover'].forEach(eventName => {
        instantDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          instantDropzone.classList.add('drag-over');
        }, false);
      });

      ['dragleave', 'dragend'].forEach(eventName => {
        instantDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          instantDropzone.classList.remove('drag-over');
        }, false);
      });

      instantDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        instantDropzone.classList.remove('drag-over');
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          processInstantFile(dt.files[0]);
        }
      }, false);
    }

    // Global drag & drop handler for Mac desktop
    window.addEventListener('dragover', (e) => e.preventDefault(), false);
    window.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!isMobile) {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          const tabInstantBtn = document.querySelector('[data-tab="tab-instant-qr"]');
          if (tabInstantBtn) tabInstantBtn.click();
          if (subtabFileMode) subtabFileMode.click();
          processInstantFile(dt.files[0]);
        }
      }
    }, false);

    // Raw text QR code generation
    if (btnGenTextQr) {
      btnGenTextQr.addEventListener('click', () => {
        const text = rawTextInput.value.trim();
        if (!text) {
          showToast(tr('toast.enter_text', 'Vui lòng nhập văn bản!'), '⚠️');
          return;
        }
        if (text.length > 2500) {
          showToast(tr('toast.text_too_long', 'Văn bản quá dài (>2500 ký tự)!'), '⚠️');
          return;
        }

        textQrcodeBox.innerHTML = '';
        new QRCode(textQrcodeBox, {
          text: text,
          width: 190,
          height: 190,
          colorDark: '#0f172a',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.L
        });

        textQrDisplay.classList.remove('hidden');
        const qrPlaceholder = document.getElementById('qr-empty-placeholder');
        if (qrPlaceholder) qrPlaceholder.classList.add('hidden');
        showToast(tr('toast.qr_text_created', 'Đã tạo mã QR văn bản!'), '✨');
      });
    }

    if (btnUseMacClipboardForQr) {
      btnUseMacClipboardForQr.addEventListener('click', async () => {
        await loadClipboard();
        if (currentMacClipboard) {
          rawTextInput.value = currentMacClipboard;
          btnGenTextQr.click();
        } else {
          showToast(tr('toast.clipboard_empty', 'Clipboard Mac trống!'), '⚠️');
        }
      });
    }

    // --- TAB: TEXT & CLIPBOARD SYNC ---
    btnSendText.addEventListener('click', async () => {
      const text = textInput.value.trim();
      if (!text) {
        showToast(tr('toast.enter_text', 'Vui lòng nhập văn bản cần gửi!'), '⚠️');
        return;
      }
      btnSendText.disabled = true;
      try {
        const res = await apiFetch('/api/clipboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });
        const data = await res.json();
        if (res.ok) {
          showToast(tr('toast.sent_text', 'Đã nạp vào Clipboard Mac (Cmd + V)!'), '🚀');
          textInput.value = '';
          loadClipboard();
        } else {
          showToast(formatErrorMessage(data.error, 'toast.text_send_err_detail', 'Lỗi gửi văn bản'), '❌');
        }
      } catch (err) {
        showToast(tr('toast.text_send_err', 'Không thể kết nối với Mac'), '❌');
      } finally {
        btnSendText.disabled = false;
      }
    });

    if (btnPastePhone) {
      btnPastePhone.addEventListener('click', async () => {
        try {
          const text = await navigator.clipboard.readText();
          textInput.value = text;
          showToast(tr('toast.paste_phone', 'Đã dán text từ điện thoại!'), '📋');
        } catch (err) {
          textInput.focus();
          showToast(tr('toast.paste_direct_hint', 'Hãy dán trực tiếp vào ô văn bản'), '💡');
        }
      });
    }

    async function loadClipboard() {
      try {
        const res = await apiFetch('/api/clipboard');
        const data = await res.json();
        currentMacClipboard = data.text || '';
        if (currentMacClipboard) {
          macClipboardContent.innerText = currentMacClipboard;
        } else {
          macClipboardContent.innerHTML = `<span class="clipboard-empty">${tr('text.mac_clip_empty', 'Clipboard trên Mac hiện đang trống')}</span>`;
        }
      } catch (err) {
        macClipboardContent.innerHTML = `<span class="clipboard-empty">${tr('text.mac_clip_err', 'Lỗi đọc clipboard Mac')}</span>`;
      }
    }
    btnRefreshClipboard.addEventListener('click', loadClipboard);

    async function copyToClipboard(text) {
      if (!text) return false;

      // 1. Try modern navigator.clipboard (available on HTTPS or localhost)
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          return true;
        } catch (e) {
          // Fallback below
        }
      }

      // 2. Battle-tested fallback for iOS Safari and mobile browsers on local HTTP
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        textArea.style.fontSize = '16px'; // Prevent auto-zoom on iOS
        textArea.setAttribute('readonly', '');
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, text.length);

        let successful = false;
        try {
          successful = document.execCommand('copy');
        } catch (e) {
          successful = false;
        }

        // If readonly attribute blocked copy on specific iOS versions
        if (!successful) {
          textArea.removeAttribute('readonly');
          textArea.select();
          textArea.setSelectionRange(0, text.length);
          successful = document.execCommand('copy');
        }

        document.body.removeChild(textArea);
        return successful;
      } catch (err) {
        console.warn('Fallback copy error:', err);
        return false;
      }
    }

    btnCopyToPhone.addEventListener('click', async () => {
      if (!currentMacClipboard) {
        showToast(tr('toast.clipboard_empty', 'Clipboard Mac trống!'), '⚠️');
        return;
      }
      const ok = await copyToClipboard(currentMacClipboard);
      if (ok) {
        showToast(tr('toast.copied', 'Đã copy vào bộ nhớ tạm!'), '📋');
      } else {
        // Fallback for restricted iOS webview: auto-select text so user can tap native "Copy"
        try {
          const range = document.createRange();
          range.selectNodeContents(macClipboardContent);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          showToast(tr('toast.copy_manual_hint', 'Đã chọn văn bản, chạm "Sao chép" trên màn hình'), '📋');
        } catch (e) {
          showToast(tr('toast.copy_err', 'Lỗi khi copy vào điện thoại'), '❌');
        }
      }
    });

    // --- TAB: MEDIA UPLOADS (PHONE) ---
    function handleSelectedFiles(files) {
      pendingFiles = Array.from(files);
      if (pendingFiles.length === 0) return;
      selectedFilesContainer.classList.remove('hidden');
      selectedFilesCount.innerText = tr('upload.selected_count', `Đã chọn (${pendingFiles.length} file):`, { count: pendingFiles.length });
      selectedFilesList.innerHTML = pendingFiles.map(f => `
        <div style="background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 6px; display: flex; justify-content: space-between;">
          <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 200px;">${f.name}</span>
          <span style="color: var(--text-muted);">${formatBytes(f.size)}</span>
        </div>
      `).join('');
    }

    if (cameraInput) cameraInput.addEventListener('change', (e) => handleSelectedFiles(e.target.files));
    if (galleryInput) galleryInput.addEventListener('change', (e) => handleSelectedFiles(e.target.files));

    if (btnUploadFiles) {
      btnUploadFiles.addEventListener('click', async () => {
        if (pendingFiles.length === 0) return;
        btnUploadFiles.disabled = true;
        btnUploadFiles.innerText = tr('upload.uploading', '⏳ Đang chuyển sang Mac...');

        const formData = new FormData();
        pendingFiles.forEach(f => formData.append('files', f));

        try {
          const res = await apiFetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          if (res.ok) {
            showToast(tr('toast.upload_batch_success', `Đã chuyển ${pendingFiles.length} file vào Downloads Mac!`, { count: pendingFiles.length }), '🎉');
            pendingFiles = [];
            selectedFilesContainer.classList.add('hidden');
            if (cameraInput) cameraInput.value = '';
            if (galleryInput) galleryInput.value = '';
            loadFiles();
          } else {
            showToast(formatErrorMessage(data.error, 'toast.upload_error', 'Lỗi gửi file'), '❌');
          }
        } catch (err) {
          showToast(tr('toast.upload_error', 'Lỗi kết nối khi gửi file'), '❌');
        } finally {
          btnUploadFiles.disabled = false;
          btnUploadFiles.innerText = tr('upload.btn_default', '📤 Gửi ngay sang Mac (Lưu vào Downloads)');
        }
      });
    }

    // --- TAB: FILES & DOWNLOADS LIST (PRO MAX) ---
    let allLoadedFiles = [];
    let currentFilter = 'all';

    async function loadFiles() {
      try {
        const res = await apiFetch('/api/files');
        const data = await res.json();
        allLoadedFiles = data.files || [];
        renderFiles();
      } catch (err) {
        filesList.innerHTML = `<div style="text-align: center; color: #f87171; font-size: 13px; padding: 24px;">${tr('files.loading', 'Không thể tải danh sách file.')}</div>`;
      }
    }

    function renderFiles() {
      const searchInput = document.getElementById('file-search-input');
      const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
      const statsTag = document.getElementById('file-stats-tag');

      let filtered = allLoadedFiles.filter(f => {
        if (query && !f.name.toLowerCase().includes(query)) return false;
        if (currentFilter === 'image') return f.is_image;
        if (currentFilter === 'doc') {
          const ext = f.name.split('.').pop().toLowerCase();
          return ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'md', 'json', 'csv'].includes(ext);
        }
        return true;
      });

      if (statsTag) {
        const totalBytes = allLoadedFiles.reduce((acc, cur) => acc + (cur.size || 0), 0);
        statsTag.innerText = tr('files.stats', `${allLoadedFiles.length} tệp • ${formatBytes(totalBytes)}`, { count: allLoadedFiles.length, size: formatBytes(totalBytes) });
      }

      if (filtered.length === 0) {
        filesList.innerHTML = `<div style="text-align: center; color: var(--text-muted); font-size: 13px; padding: 32px;">${tr('files.empty', 'Chưa có file nào')}</div>`;
        return;
      }

      filesList.innerHTML = filtered.map((f) => {
        const isImg = f.is_image;
        const safeName = f.name.replace(/"/g, '&quot;');
        const encName = encodeURIComponent(f.name);
        return `
          <div class="file-item">
            <div class="file-info">
              ${isImg ? `
                <div class="file-thumb-wrap" onclick="previewImage('${encName}', '${f.direct_url}')" title="${tr('files.btn_preview', 'Bấm để xem ảnh lớn')}">
                  <img src="${f.direct_url}" class="file-thumb-img" alt="${safeName}" loading="lazy" onerror="this.parentElement.innerHTML='🖼️'">
                </div>
              ` : `
                <div class="file-icon">📄</div>
              `}
              <div class="file-details">
                <div class="file-name" title="${safeName}">${safeName}</div>
                <div class="file-meta-row">
                  <span class="file-size">${formatBytes(f.size)}</span>
                  ${isImg ? `<span style="color: #38bdf8;">• ${tr('files.badge_image', 'Ảnh')}</span>` : ''}
                </div>
              </div>
            </div>
            <div class="file-actions">
              ${isImg ? `
                <button onclick="previewImage('${encName}', '${f.direct_url}')" class="btn btn-secondary btn-sm mac-only" title="${tr('files.btn_preview', 'Xem ảnh lớn')}">
                  ${tr('files.btn_preview', '👁️ Xem')}
                </button>
                <button onclick="saveToGallery('${encName}')" class="btn btn-sm phone-only" style="background: #2563eb; color: #fff;" title="${tr('files.btn_album', 'Lưu vào Album')}">
                  ${tr('files.btn_album', '🖼️ Album')}
                </button>
              ` : ''}
              <button onclick="showFileQr('${encName}', '${f.direct_url}')" class="btn btn-secondary btn-sm mac-only" title="${tr('files.btn_qr', 'Hiện mã QR để điện thoại quét tải thẳng')}">
                ${tr('files.btn_qr', '📱 QR')}
              </button>
              <a href="/api/download/${encName}" download="${safeName}" class="btn btn-primary btn-sm" style="text-decoration: none;">
                ${tr('files.btn_download', '⬇️ Tải')}
              </a>
              <button onclick="deleteFile('${safeName}')" class="btn btn-secondary btn-sm mac-only" style="color: #f87171;" title="${tr('files.btn_delete', 'Xoá file')}">
                ${tr('files.btn_delete', '🗑️')}
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    btnRefreshFiles.addEventListener('click', loadFiles);

    // Search and Filter Listeners
    const fileSearchInput = document.getElementById('file-search-input');
    if (fileSearchInput) {
      fileSearchInput.addEventListener('input', renderFiles);
    }

    document.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter || 'all';
        renderFiles();
      });
    });

    // Lightbox Image Preview Modal
    const imagePreviewModal = document.getElementById('image-preview-modal');
    const previewModalImg = document.getElementById('preview-modal-img');
    const previewModalFilename = document.getElementById('preview-modal-filename');
    const previewModalDownload = document.getElementById('preview-modal-download');
    const btnClosePreviewModal = document.getElementById('btn-close-preview-modal');
    const btnClosePreviewAction = document.getElementById('btn-close-preview-action');

    window.previewImage = function(encName, url) {
      if (!imagePreviewModal) return;
      const filename = decodeURIComponent(encName);
      if (previewModalFilename) previewModalFilename.innerText = filename;
      if (previewModalImg) previewModalImg.src = url;
      if (previewModalDownload) {
        previewModalDownload.href = url;
        previewModalDownload.download = filename;
      }
      imagePreviewModal.classList.add('active');
    };

    function closePreviewModal() {
      if (imagePreviewModal) {
        imagePreviewModal.classList.remove('active');
        if (previewModalImg) previewModalImg.src = '';
      }
    }
    if (btnClosePreviewModal) btnClosePreviewModal.addEventListener('click', closePreviewModal);
    if (btnClosePreviewAction) btnClosePreviewAction.addEventListener('click', closePreviewModal);
    if (imagePreviewModal) {
      imagePreviewModal.addEventListener('click', (e) => {
        if (e.target === imagePreviewModal) closePreviewModal();
      });
    }

    // Drag & Drop Upload directly onto Shared Files Card (Desktop)
    const sharedFilesCard = document.getElementById('shared-files-card');
    if (sharedFilesCard) {
      ['dragenter', 'dragover'].forEach(eventName => {
        sharedFilesCard.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          sharedFilesCard.style.borderColor = '#10b981';
          sharedFilesCard.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.3)';
        });
      });
      ['dragleave', 'dragend'].forEach(eventName => {
        sharedFilesCard.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          sharedFilesCard.style.borderColor = '';
          sharedFilesCard.style.boxShadow = '';
        });
      });
      sharedFilesCard.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        sharedFilesCard.style.borderColor = '';
        sharedFilesCard.style.boxShadow = '';
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          handleDesktopFilesUpload(Array.from(dt.files));
        }
      });
    }

    async function handleDesktopFilesUpload(files) {
      if (files.length === 0) return;
      showToast(tr('toast.upload_batch', `Đang tải ${files.length} file lên QuickShare...`, { count: files.length }), '⏳');
      const formData = new FormData();
      files.forEach(f => formData.append('files', f));
      try {
        const res = await apiFetch('/api/upload', { method: 'POST', body: formData });
        if (res.ok) {
          showToast(tr('toast.upload_batch_success', `Đã tải lên ${files.length} file thành công!`, { count: files.length }), '🎉');
          loadFiles();
        } else {
          const data = await res.json();
          showToast(formatErrorMessage(data.error, 'toast.upload_error', 'Lỗi tải file'), '❌');
        }
      } catch (err) {
        showToast(tr('toast.upload_error', 'Lỗi kết nối khi tải file'), '❌');
      }
    }

    // Show dedicated file download QR modal (Mac only)
    window.showFileQr = function(filename, directUrl) {
      if (!singleFileModal) return;
      modalFileTitle.innerText = decodeURIComponent(filename);
      modalFileQr.innerHTML = '';
      new QRCode(modalFileQr, {
        text: directUrl,
        width: 180,
        height: 180,
        colorDark: '#0f172a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
      singleFileModal.classList.add('active');
    };

    if (btnCloseFileModal) btnCloseFileModal.addEventListener('click', () => singleFileModal.classList.remove('active'));
    if (singleFileModal) {
      singleFileModal.addEventListener('click', (e) => {
        if (e.target === singleFileModal) singleFileModal.classList.remove('active');
      });
    }

    window.deleteFile = async function(filename) {
      const confirmMsg = tr('files.confirm_delete', `Bạn có chắc muốn xoá file "${filename}" không?`, { name: filename });
      if (!confirm(confirmMsg)) return;
      try {
        const res = await apiFetch(`/api/files/${encodeURIComponent(filename)}`, { method: 'DELETE' });
        if (res.ok) {
          showToast(tr('toast.deleted', 'Đã xoá tệp thành công'), '🗑️');
          loadFiles();
        } else {
          showToast(tr('toast.delete_err', 'Lỗi xoá file'), '❌');
        }
      } catch (err) {
        showToast(tr('toast.delete_err', 'Lỗi xoá file'), '❌');
      }
    };

    if (btnOpenFolder) {
      btnOpenFolder.addEventListener('click', async () => {
        try {
          await apiFetch('/api/open-folder', { method: 'POST' });
          showToast(tr('toast.folder_opened', 'Đã mở thư mục lưu trữ trên máy!'), '📂');
        } catch (err) {
          showToast(tr('toast.folder_open_err', 'Không thể mở thư mục'), '❌');
        }
      });
    }

    // --- FEATURE: CONFIGURABLE STORAGE FOLDER ---
    const storageDirPath = document.getElementById('storage-dir-path');
    const footerStoragePath = document.getElementById('footer-storage-path');
    const storageModal = document.getElementById('storage-modal');
    const btnChangeFolder = document.getElementById('btn-change-folder');
    const btnCloseStorageModal = document.getElementById('btn-close-storage-modal');
    const btnCancelStorage = document.getElementById('btn-cancel-storage');
    const btnSaveStorage = document.getElementById('btn-save-storage');
    const inputStorageDir = document.getElementById('input-storage-dir');
    const storageStatusMsg = document.getElementById('storage-status-msg');
    const storagePresetBtns = document.querySelectorAll('.storage-preset-btn');

    async function loadStorageSettings() {
      if (isMobile) return;
      try {
        const data = await apiFetch('/api/settings/storage');
        if (data && data.current_dir) {
          if (storageDirPath) storageDirPath.innerText = data.current_dir;
          if (footerStoragePath) footerStoragePath.innerText = data.current_dir;
          if (inputStorageDir) inputStorageDir.value = data.current_dir;
        }
      } catch (err) {}
    }

    if (btnChangeFolder) {
      btnChangeFolder.addEventListener('click', () => {
        loadStorageSettings();
        if (storageStatusMsg) storageStatusMsg.style.display = 'none';
        if (storageModal) storageModal.style.display = 'flex';
      });
    }

    if (btnCloseStorageModal) {
      btnCloseStorageModal.addEventListener('click', () => {
        if (storageModal) storageModal.style.display = 'none';
      });
    }

    if (btnCancelStorage) {
      btnCancelStorage.addEventListener('click', () => {
        if (storageModal) storageModal.style.display = 'none';
      });
    }

    storagePresetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const pathVal = btn.getAttribute('data-path');
        if (inputStorageDir) inputStorageDir.value = pathVal;
      });
    });

    if (btnSaveStorage) {
      btnSaveStorage.addEventListener('click', async () => {
        const newDir = inputStorageDir.value.trim();
        if (!newDir) {
          showToast(tr('toast.folder_enter_path', 'Vui lòng nhập đường dẫn thư mục'), '⚠️');
          return;
        }
        btnSaveStorage.disabled = true;
        btnSaveStorage.innerText = tr('modal.storage_saving', 'Đang lưu...');
        try {
          const res = await apiFetch('/api/settings/storage', {
            method: 'POST',
            body: JSON.stringify({ dir: newDir }),
          });
          if (res && res.status === 'ok') {
            if (storageDirPath) storageDirPath.innerText = res.current_dir;
            if (footerStoragePath) footerStoragePath.innerText = res.current_dir;
            showToast(tr('toast.folder_changed', `Đã đổi thư mục lưu sang: ${res.current_dir}`, { dir: res.current_dir }), '📂');
            if (storageModal) storageModal.style.display = 'none';
            loadFiles();
          }
        } catch (err) {
          if (storageStatusMsg) {
            storageStatusMsg.style.display = 'block';
            storageStatusMsg.style.background = 'rgba(239, 68, 68, 0.15)';
            storageStatusMsg.style.color = '#ef4444';
            storageStatusMsg.innerText = formatErrorMessage(err, 'toast.folder_change_err', 'Lỗi khi đổi thư mục');
          }
        } finally {
          btnSaveStorage.disabled = false;
          btnSaveStorage.innerText = tr('modal.storage_btn_save', 'Lưu & Áp dụng');
        }
      });
    }
    loadStorageSettings();

    // --- FEATURE 1: Cmd + V (PASTE SCREENSHOT OR TEXT ANYWHERE ON MAC) ---
    window.addEventListener('paste', async (e) => {
      if (isMobile) return; // Only for Mac

      const target = e.target;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      const clipboardData = e.clipboardData || window.clipboardData;
      if (!clipboardData) return;

      const items = clipboardData.items;
      let imageFile = null;

      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            if (blob) {
              const ext = items[i].type.split('/')[1] || 'png';
              const now = new Date();
              const pad = (n) => String(n).padStart(2, '0');
              const ts = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
              imageFile = new File([blob], `screenshot_${ts}.${ext}`, { type: items[i].type });
              break;
            }
          }
        }
      }

      if (imageFile) {
        e.preventDefault();
        const tabInstantBtn = document.querySelector('[data-tab="tab-instant-qr"]');
        if (tabInstantBtn) tabInstantBtn.click();
        if (subtabFileMode) subtabFileMode.click();
        showToast(tr('toast.screenshot_detected', '📸 Đã bắt ảnh chụp màn hình từ Clipboard (Cmd+V)!'), '⚡');
        processInstantFile(imageFile);
        return;
      }

      if (!isInput) {
        const pastedText = clipboardData.getData('text');
        if (pastedText && pastedText.trim()) {
          e.preventDefault();
          const tabInstantBtn = document.querySelector('[data-tab="tab-instant-qr"]');
          if (tabInstantBtn) tabInstantBtn.click();
          if (subtabTextMode) subtabTextMode.click();
          rawTextInput.value = pastedText;
          btnGenTextQr.click();
          showToast(tr('toast.text_pasted_qr', '📋 Đã dán text từ Clipboard (Cmd+V) và sinh QR!'), '⚡');
        }
      }
    });

    // --- FEATURE 2: SAVE DIRECTLY TO GALLERY / CAMERA ROLL (IPHONE & SAMSUNG) ---
    window.saveToGallery = async function(encodedName) {
      const filename = decodeURIComponent(encodedName);
      showToast(tr('toast.photo_processing', 'Đang xử lý ảnh để lưu vào máy...'), '⏳');

      try {
        const res = await apiFetch(`/api/download/${encodeURIComponent(filename)}`);
        const blob = await res.blob();
        const file = new File([blob], filename, { type: blob.type || 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: filename,
          });
          showToast(tr('toast.saved_album', 'Đã mở bảng lưu ảnh vào Album!'), '🎉');
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          showToast(tr('toast.photo_saved', 'Đã tải ảnh về máy thành công!'), '📥');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          showToast(tr('toast.photo_save_err', 'Lỗi khi lưu ảnh: ' + err.message, { error: err.message }), '❌');
        }
      }
    };


    // --- PUBLIC SHARE & PIN MANAGEMENT ---
    let currentPin = new URLSearchParams(window.location.search).get('pin') || sessionStorage.getItem('quickshare_pin') || '';
    if (currentPin) {
      sessionStorage.setItem('quickshare_pin', currentPin);
    }

    function apiFetch(url, options = {}) {
      options.headers = options.headers || {};
      if (currentPin) {
        options.headers['x-public-pin'] = currentPin;
        const sep = url.includes('?') ? '&' : '?';
        url = `${url}${sep}pin=${encodeURIComponent(currentPin)}`;
      }
      return fetch(url, options).then(async (res) => {
        if (res.status === 401) {
          const data = await res.clone().json().catch(() => ({}));
          if (data.require_pin) {
            const modal = document.getElementById('pin-prompt-modal');
            if (modal) modal.classList.add('active');
          }
        }
        return res;
      });
    }

    // Modal elements
    const btnTogglePublic = document.getElementById('btn-toggle-public');
    const publicTunnelModal = document.getElementById('public-tunnel-modal');
    const btnCloseTunnelModal = document.getElementById('btn-close-tunnel-modal');
    const btnStartTunnel = document.getElementById('btn-start-tunnel');
    const btnStopTunnel = document.getElementById('btn-stop-tunnel');
    const btnCopyPublicLink = document.getElementById('btn-copy-public-link');
    const tunnelLoading = document.getElementById('tunnel-loading');
    const tunnelActiveBox = document.getElementById('tunnel-active-box');
    const tunnelInactiveBox = document.getElementById('tunnel-inactive-box');
    const publicShareLink = document.getElementById('public-share-link');
    const publicPinBadge = document.getElementById('public-pin-badge');
    const publicQrcode = document.getElementById('public-qrcode');
    const publicStatusText = document.getElementById('public-status-text');

    // PIN prompt elements
    const pinPromptModal = document.getElementById('pin-prompt-modal');
    const visitorPinInput = document.getElementById('visitor-pin-input');
    const btnSubmitPin = document.getElementById('btn-submit-pin');

    if (btnTogglePublic) {
      btnTogglePublic.addEventListener('click', () => {
        checkTunnelStatus();
        publicTunnelModal.classList.add('active');
      });
    }

    if (btnCloseTunnelModal) {
      btnCloseTunnelModal.addEventListener('click', () => {
        publicTunnelModal.classList.remove('active');
      });
    }

    if (publicTunnelModal) {
      publicTunnelModal.addEventListener('click', (e) => {
        if (e.target === publicTunnelModal) publicTunnelModal.classList.remove('active');
      });
    }

    async function checkTunnelStatus() {
      try {
        const res = await fetch('/api/tunnel/status');
        const data = await res.json();
        if (data.active) {
          showTunnelActive(data.share_link, data.pin);
          if (publicStatusText) {
            publicStatusText.innerText = tr('header.public_on', 'BẬT');
            publicStatusText.style.color = '#34d399';
          }
        } else {
          showTunnelInactive();
          if (publicStatusText) {
            publicStatusText.innerText = tr('header.public_off', 'TẮT');
            publicStatusText.style.color = '#94a3b8';
          }
        }
      } catch (err) {}
    }

    function showTunnelActive(link, pin) {
      if (!tunnelActiveBox) return;
      tunnelLoading.classList.add('hidden');
      tunnelInactiveBox.classList.add('hidden');
      tunnelActiveBox.classList.remove('hidden');
      publicShareLink.innerText = link;
      publicPinBadge.innerText = pin;

      publicQrcode.innerHTML = '';
      new QRCode(publicQrcode, {
        text: link,
        width: 170,
        height: 170,
        colorDark: '#0f172a',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
      });
    }

    function showTunnelInactive() {
      if (!tunnelInactiveBox) return;
      tunnelLoading.classList.add('hidden');
      tunnelActiveBox.classList.add('hidden');
      tunnelInactiveBox.classList.remove('hidden');
    }

    if (btnStartTunnel) {
      btnStartTunnel.addEventListener('click', async () => {
        tunnelInactiveBox.classList.add('hidden');
        tunnelLoading.classList.remove('hidden');
        try {
          const res = await fetch('/api/tunnel/start', { method: 'POST' });
          const data = await res.json();
          if (data.status === 'ok') {
            showTunnelActive(data.share_link, data.pin);
            if (publicStatusText) {
              publicStatusText.innerText = tr('header.public_on', 'BẬT');
              publicStatusText.style.color = '#34d399';
            }
            showToast(tr('toast.public_started', 'Đã tạo Public Share Link thành công!'), '🌐');
          } else {
            showToast(formatErrorMessage(data.error, 'toast.tunnel_create_err', 'Không thể tạo tunnel'), '❌');
            showTunnelInactive();
          }
        } catch (err) {
          showToast(tr('toast.tunnel_init_err', 'Lỗi khởi tạo Cloudflare Tunnel'), '❌');
          showTunnelInactive();
        }
      });
    }

    if (btnStopTunnel) {
      btnStopTunnel.addEventListener('click', async () => {
        try {
          await fetch('/api/tunnel/stop', { method: 'POST' });
          showTunnelInactive();
          if (publicStatusText) {
            publicStatusText.innerText = tr('header.public_off', 'TẮT');
            publicStatusText.style.color = '#94a3b8';
          }
          showToast(tr('toast.public_stopped', 'Đã tắt Public Share an toàn!'), '🛑');
        } catch (err) {
          showToast(tr('toast.tunnel_stop_err', 'Không thể dừng tunnel'), '❌');
        }
      });
    }

    if (btnCopyPublicLink) {
      btnCopyPublicLink.addEventListener('click', async () => {
        const link = publicShareLink.innerText;
        const ok = await copyToClipboard(link);
        if (ok) {
          showToast(tr('modal.public_btn_copy', 'Đã copy link kèm mã PIN!'), '📋');
        } else {
          showToast(tr('toast.copy_err', 'Lỗi khi copy link'), '❌');
        }
      });
    }

    // Submit PIN for Public Visitors
    if (btnSubmitPin && visitorPinInput) {
      btnSubmitPin.addEventListener('click', async () => {
        const pin = visitorPinInput.value.trim();
        if (pin.length !== 4) {
          showToast(tr('toast.pin_length', 'Mã PIN gồm 4 số!'), '⚠️');
          return;
        }
        btnSubmitPin.disabled = true;
        try {
          const res = await fetch('/api/tunnel/verify-pin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin })
          });
          if (res.ok) {
            currentPin = pin;
            sessionStorage.setItem('quickshare_pin', pin);
            pinPromptModal.classList.remove('active');
            showToast(tr('toast.pin_unlocked', 'Mở khóa thành công!'), '🎉');
            loadInfo();
            loadClipboard();
            loadFiles();
          } else {
            showToast(tr('toast.pin_incorrect', 'Mã PIN không chính xác!'), '❌');
          }
        } catch (err) {
          showToast(tr('toast.pin_check_err', 'Lỗi kiểm tra mã PIN'), '❌');
        } finally {
          btnSubmitPin.disabled = false;
        }
      });

      visitorPinInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') btnSubmitPin.click();
      });
    }

    // Start
    loadInfo();
    checkTunnelStatus();
    loadClipboard();
    setInterval(loadClipboard, 5000);
