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

  // 6. COMPARADOR SPLIT-SLIDER VISUAL (SIN DISTORSIÓN DE IMÁGENES)
  const sliderContainer = document.getElementById('splitSliderContainer');
  const afterWrapper = document.getElementById('sliderAfterWrapper');
  const handle = document.getElementById('sliderHandle');

  if (sliderContainer && afterWrapper && handle) {
    let isSliding = false;

    function syncSliderImgWidth() {
      const w = sliderContainer.offsetWidth;
      sliderContainer.style.setProperty('--slider-container-w', w + 'px');
      const afterImg = afterWrapper.querySelector('.slider-img');
      if (afterImg) afterImg.style.width = w + 'px';
    }
    syncSliderImgWidth();
    window.addEventListener('resize', syncSliderImgWidth);

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
    }, { passive: true });
    window.addEventListener('touchend', () => { isSliding = false; });
    window.addEventListener('touchmove', e => {
      if (!isSliding) return;
      updateSliderPos(e.touches[0].clientX);
    }, { passive: true });
  }

  // 7. SINTONIZADOR DE RADIO & PODCAST EN EL MENÚ GLOBAL (MOTOR DE AUDIO ROBUSTO)
  const STREAMS_CATALOG = {
    jgm: {
      src: 'https://sonic-us.arkeo.cl/8186/stream',
      name: 'Radio JGM (Comunitaria U. de Chile)',
      type: 'radio'
    },
    ritoque: {
      src: 'https://archi-us.digitalproserver.com/ritoquefm_aac',
      name: 'Radio Ritoque FM (Valparaíso)',
      type: 'radio'
    },
    biobio: {
      src: 'https://unlimited3-cl.dps.live/biobiosantiago/mp3/icecast.audio',
      name: 'Radio Biobío (Centro-Sur)',
      type: 'radio'
    },
    kambio: {
      src: 'https://sonic.streamingchilenos.com/8048/stream',
      name: 'Radio Kambio (Señal Comunitaria)',
      type: 'radio'
    },
    podcast1: {
      src: 'https://dn721906.ca.archive.org/0/items/AnaLeyAgroforestal/Ana%20ley%20agroforestal.mp3',
      name: 'Podcast: Ley Agroforestal & Cuencas',
      type: 'podcast'
    },
    podcast2: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Singing-in-the-Rain-Forest-How-a-Tropical-Bird-Song-Transfers-Information-pone.0001580.s001.ogg',
      name: 'Podcast: Biodiversidad & Canto del Chucao',
      type: 'podcast'
    }
  };

  const headerWidget = document.getElementById('headerAudioWidget');
  const headerPlayBtn = document.getElementById('headerAudioPlayBtn');
  const headerPlayIcon = document.getElementById('headerAudioPlayIcon');
  const headerSelect = document.getElementById('headerAudioSelect');
  const headerWave = document.getElementById('headerAudioWave');

  let globalAudio = document.getElementById('globalHeaderAudio');
  if (!globalAudio) {
    globalAudio = document.createElement('audio');
    globalAudio.id = 'globalHeaderAudio';
    globalAudio.preload = 'none';
    document.body.appendChild(globalAudio);
  }

  if (headerPlayBtn && headerSelect) {
    let isHeaderPlaying = false;
    let isBuffering = false;

    function getSelectedStream() {
      const val = headerSelect.value;
      const opt = headerSelect.options[headerSelect.selectedIndex];
      if (STREAMS_CATALOG[val]) {
        return STREAMS_CATALOG[val];
      }
      return {
        src: (opt && opt.getAttribute('data-src')) || 'https://sonic-us.arkeo.cl/8186/stream',
        name: (opt && opt.text) || 'Radio Comunitaria',
        type: 'radio'
      };
    }

    function setPlayingUI(playing, item) {
      isHeaderPlaying = playing;
      if (playing) {
        if (headerPlayIcon) headerPlayIcon.innerText = '⏸';
        headerPlayBtn.classList.add('playing');
        if (headerWidget) headerWidget.classList.add('playing');
        if (headerWave) headerWave.style.display = 'flex';
        headerPlayBtn.title = `Pausar: ${item ? item.name : 'Audio'}`;
      } else {
        if (headerPlayIcon) headerPlayIcon.innerText = '▶';
        headerPlayBtn.classList.remove('playing');
        if (headerWidget) headerWidget.classList.remove('playing');
        if (headerWave) headerWave.style.display = 'none';
        headerPlayBtn.title = 'Reproducir señal seleccionada';
      }
    }

    function startPlayback() {
      const item = getSelectedStream();
      if (!globalAudio.src || !globalAudio.src.includes(item.src)) {
        globalAudio.src = item.src;
      }
      headerPlayBtn.title = 'Sintonizando transmisión...';
      if (headerPlayIcon) headerPlayIcon.innerText = '⏳';
      isBuffering = true;

      const playPromise = globalAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isBuffering = false;
          setPlayingUI(true, item);
        }).catch(err => {
          console.warn('Fallo al reproducir señal principal, probando alternativa:', err);
          isBuffering = false;
          if (item.src !== STREAMS_CATALOG.jgm.src) {
            headerSelect.value = 'jgm';
            globalAudio.src = STREAMS_CATALOG.jgm.src;
            globalAudio.play().then(() => {
              setPlayingUI(true, STREAMS_CATALOG.jgm);
            }).catch(() => {
              setPlayingUI(false);
            });
          } else {
            setPlayingUI(false);
          }
        });
      }
    }

    function pausePlayback() {
      globalAudio.pause();
      setPlayingUI(false);
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
      if (isHeaderPlaying || isBuffering) {
        startPlayback();
      }
    });

    globalAudio.addEventListener('waiting', () => {
      if (headerPlayIcon) headerPlayIcon.innerText = '⏳';
    });

    globalAudio.addEventListener('playing', () => {
      setPlayingUI(true, getSelectedStream());
    });

    globalAudio.addEventListener('pause', () => {
      setPlayingUI(false);
    });

    globalAudio.addEventListener('ended', () => {
      setPlayingUI(false);
    });

    globalAudio.addEventListener('error', (e) => {
      console.warn('Error en la señal de audio:', e);
      setPlayingUI(false);
    });

    window.playRadioStream = function(key) {
      if (STREAMS_CATALOG[key]) {
        headerSelect.value = key;
        startPlayback();
      }
    };
  }
});

