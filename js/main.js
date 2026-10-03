/* ==========================================================================
   RED POR LA SUPERACIÓN DEL MODELO FORESTAL - MAIN NAVIGATION & GLOBAL UX
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. NAVBAR SCROLL EFFECT
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    });
  }

  // 2. DROPDOWN DE BIBLIOTECA & MEDIOS
  const dropdownTrigger = document.getElementById('dropdownTrigger');
  const dropdownMenu = document.getElementById('dropdownMenu');
  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = dropdownTrigger.getAttribute('aria-expanded') === 'true';
      dropdownTrigger.setAttribute('aria-expanded', !isExpanded);
      dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!dropdownTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownTrigger.setAttribute('aria-expanded', 'false');
        dropdownMenu.classList.remove('active');
      }
    });
  }

  // 3. MENÚ MÓVIL Y DRAWER
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileClose = document.getElementById('mobileDrawerClose');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }

    // Cerrar al pulsar un enlace
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 4. PETITORIO CIUDADANO & FIRMAS
  let currentSignatures = parseInt(localStorage.getItem('rf_signatures') || '14825', 10);
  const sigCountEl = document.getElementById('signatureCount');
  const sigBarFillEl = document.getElementById('signatureBarFill');

  function updateSignaturesDisplay() {
    if (sigCountEl) {
      sigCountEl.innerText = currentSignatures.toLocaleString('es-CL');
    }
    if (sigBarFillEl) {
      const percentage = Math.min(100, (currentSignatures / 20000) * 100);
      sigBarFillEl.style.width = `${percentage}%`;
    }
  }
  updateSignaturesDisplay();

  const joinForm = document.getElementById('joinForm');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('fName');

      if (!nameInput || !nameInput.value.trim()) {
        alert('Por favor, ingresa tu nombre u organización.');
        return;
      }

      currentSignatures += 1;
      localStorage.setItem('rf_signatures', currentSignatures.toString());
      updateSignaturesDisplay();

      const successBox = document.createElement('div');
      successBox.style.cssText = 'background:#1E3F32;color:#F9F7F2;padding:18px;border-radius:8px;margin-top:16px;font-family:"IBM Plex Sans",sans-serif;text-align:center;animation:fadeIn 0.4s;';
      successBox.innerHTML = `
        <h4 style="color:#F4D389;font-size:1.15rem;margin-bottom:6px;">¡Adhesión Registrada con Éxito!</h4>
        <p style="font-size:0.9rem;margin:0;">Gracias <strong>${nameInput.value.trim()}</strong>. Tu firma fortalece la moratoria forestal en los territorios del centro-sur.</p>
      `;

      joinForm.parentNode.replaceChild(successBox, joinForm);
    });
  }

  // 5. MODAL DE DOCUMENTO (BIBLIOTECA)
  window.openDocModal = function(title, meta, bodyText, downloadUrl) {
    const modal = document.getElementById('docReaderModal');
    if (!modal) return;
    document.getElementById('docModalTitle').innerText = title;
    document.getElementById('docModalMeta').innerText = meta;
    document.getElementById('docModalBody').innerHTML = bodyText;
    const dlBtn = document.getElementById('docModalDownloadBtn');
    if (dlBtn && downloadUrl) {
      dlBtn.href = downloadUrl;
    }
    modal.classList.add('active');
  };

  window.closeDocModal = function() {
    const modal = document.getElementById('docReaderModal');
    if (modal) modal.classList.remove('active');
  };

  // 6. COMPARADOR SPLIT-SLIDER VISUAL
  const sliderContainer = document.getElementById('splitSliderContainer');
  const afterWrapper = document.getElementById('sliderAfterWrapper');
  const handle = document.getElementById('sliderHandle');

  if (sliderContainer && afterWrapper && handle) {
    let isSliding = false;

    function updateSliderPos(clientX) {
      const rect = sliderContainer.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      const percentage = (x / rect.width) * 100;
      afterWrapper.style.width = percentage + '%';
      handle.style.left = percentage + '%';
    }

    sliderContainer.addEventListener('mousedown', e => {
      isSliding = true;
      updateSliderPos(e.clientX);
    });
    window.addEventListener('mouseup', () => { isSliding = false; });
    window.addEventListener('mousemove', e => {
      if (!isSliding) return;
      updateSliderPos(e.clientX);
    });

    sliderContainer.addEventListener('touchstart', e => {
      isSliding = true;
      updateSliderPos(e.touches[0].clientX);
    });
    window.addEventListener('touchend', () => { isSliding = false; });
    window.addEventListener('touchmove', e => {
      if (!isSliding) return;
      updateSliderPos(e.touches[0].clientX);
    });
  }

  // 7. REPRODUCTOR DE RADIO COMUNITARIA EN INICIO (HOME)
  const homeRadioBtn = document.getElementById('homeRadioPlayBtn');
  const homeRadioAudio = document.getElementById('homeRadioAudio');
  const homeRadioIcon = document.getElementById('homeRadioIcon');
  const homeRadioText = document.getElementById('homeRadioText');
  const homeRadioStatus = document.getElementById('homeRadioStatus');

  if (homeRadioBtn && homeRadioAudio) {
    let isHomePlaying = false;

    homeRadioBtn.addEventListener('click', () => {
      if (isHomePlaying) {
        homeRadioAudio.pause();
        isHomePlaying = false;
        if (homeRadioIcon) homeRadioIcon.innerText = '▶';
        if (homeRadioText) homeRadioText.innerText = 'Sintonizar Señal en Vivo';
        if (homeRadioStatus) homeRadioStatus.innerText = '● Señal pausada. Haz clic para reanudar.';
      } else {
        if (homeRadioStatus) homeRadioStatus.innerText = '⏳ Conectando con Radio Kurruf (Biobío / Wallmapu)...';
        if (homeRadioText) homeRadioText.innerText = 'Conectando...';

        homeRadioAudio.play().then(() => {
          isHomePlaying = true;
          if (homeRadioIcon) homeRadioIcon.innerText = '⏸';
          if (homeRadioText) homeRadioText.innerText = 'Pausar Transmisión';
          if (homeRadioStatus) homeRadioStatus.innerText = '🔴 TRANSMITIENDO EN VIVO DESDE CHILE: Radio Kurruf 107.5 FM';
        }).catch(err => {
          console.warn('Error al reproducir stream en home:', err);
          if (homeRadioStatus) homeRadioStatus.innerText = '⚠️ Transmisión comunitaria activa. Haz clic en "Cambiar de Radio" si tu navegador restringe audio.';
          if (homeRadioText) homeRadioText.innerText = 'Reintentar Señal';
        });
      }
    });
  }

  // 8. SINTONIZADOR DE RADIO & PODCAST EN EL MENÚ GLOBAL
  const headerWidget = document.getElementById('headerAudioWidget');
  const headerPlayBtn = document.getElementById('headerAudioPlayBtn');
  const headerPlayIcon = document.getElementById('headerAudioPlayIcon');
  const headerSelect = document.getElementById('headerAudioSelect');
  let globalAudio = document.getElementById('globalHeaderAudio');

  if (!globalAudio) {
    globalAudio = document.createElement('audio');
    globalAudio.id = 'globalHeaderAudio';
    globalAudio.preload = 'none';
    document.body.appendChild(globalAudio);
  }

  if (headerPlayBtn && headerSelect) {
    let isHeaderPlaying = false;

    function getSelectedStream() {
      const opt = headerSelect.options[headerSelect.selectedIndex];
      return {
        src: opt.getAttribute('data-src') || 'https://radio.latina.red/radiokurruf.mp3',
        type: opt.getAttribute('data-type') || 'radio',
        name: opt.text
      };
    }

    function startPlayback() {
      const item = getSelectedStream();
      globalAudio.src = item.src;
      headerPlayBtn.title = 'Conectando...';

      globalAudio.play().then(() => {
        isHeaderPlaying = true;
        headerPlayIcon.innerText = '⏸';
        headerPlayBtn.classList.add('playing');
        if (headerWidget) headerWidget.classList.add('playing');
        headerPlayBtn.title = `Pausar: ${item.name}`;
      }).catch(err => {
        console.warn('Error al reproducir audio del header:', err);
        // Fallback sutil
        isHeaderPlaying = false;
        headerPlayIcon.innerText = '▶';
        headerPlayBtn.classList.remove('playing');
        if (headerWidget) headerWidget.classList.remove('playing');
      });
    }

    function pausePlayback() {
      globalAudio.pause();
      isHeaderPlaying = false;
      headerPlayIcon.innerText = '▶';
      headerPlayBtn.classList.remove('playing');
      if (headerWidget) headerWidget.classList.remove('playing');
      headerPlayBtn.title = 'Reproducir';
    }

    headerPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isHeaderPlaying) {
        pausePlayback();
      } else {
        startPlayback();
      }
    });

    headerSelect.addEventListener('change', () => {
      if (isHeaderPlaying) {
        startPlayback();
      }
    });

    globalAudio.addEventListener('ended', () => {
      pausePlayback();
    });
  }
});

