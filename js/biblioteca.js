/* ==========================================================================
   BIBLIOTECA DOCUMENTAL Y PODCAST TERRITORIAL
   ========================================================================== */

const documentosData = [
  {
    id: 'ley-moratoria',
    titulo: 'Propuesta de Ley de Moratoria Forestal y Restauración de Cuencas',
    tema: 'Leyes',
    anio: '2026',
    autor: 'Equipo Jurídico ReSuMoF & Parlamentarios Aliados',
    paginas: '48 págs.',
    img: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80',
    resumen: 'Marco regulatorio integral que propone la derogación de los subsidios del DL 701, el establecimiento de franjas de amortiguación periurbanas y la creación del Fondo Nacional de Restauración de Cuencas.',
    puntosClave: [
      'Prohibición de nuevas plantaciones exóticas en cabeceras de cuenca',
      'Distancias obligatorias de 1.000 metros a viviendas',
      'Incentivos directos a propietarios rurales por conservar bosque nativo'
    ]
  },
  {
    id: 'hidro',
    titulo: 'Impacto Hidrológico del Monocultivo en Cuencas del Biobío y Maule',
    tema: 'Agua',
    anio: '2025',
    autor: 'Comisión Científica Independiente',
    paginas: '72 págs.',
    img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    resumen: 'Estudio de balance hídrico que demuestra cómo la densidad de eucaliptos y pinos reduce hasta un 65% el caudal de verano en esteros que abastecen a comités de agua potable rural.',
    puntosClave: [
      'Monitoreo en 14 microcuencas comparadas con bosque nativo',
      'Evaporación y transpiración acelerada en verano',
      'Recuperación de caudales tras la erradicación de eucaliptos en riberas'
    ]
  },
  {
    id: 'franjas',
    titulo: 'Megaincendios de Interfaz: Criterios de Seguridad Territorial',
    tema: 'Incendios',
    anio: '2025',
    autor: 'Mesa de Prevención Comunitaria ReSuMoF',
    paginas: '36 págs.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    resumen: 'Análisis de los incendios de Santa Juana, Purén y Quillón. Demuestra la inviabilidad de cortafuegos de sólo 20 metros y propone una política territorial de franjas productivas agroecológicas.',
    puntosClave: [
      'El monocultivo como combustible homogéneo de alta ignición',
      'Propuesta de barreras verdes de bosque nativo esclerófilo',
      'Participación comunitaria vinculante en los planes de emergencia'
    ]
  },
  {
    id: 'agroeco',
    titulo: 'Guía Metodológica de Transición Agroecológica y Viverización Nativa',
    tema: 'Restauración',
    anio: '2024',
    autor: 'Red de Viveros Comunitarios del Sur',
    paginas: '54 págs.',
    img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
    resumen: 'Manual práctico para comunidades y pequeños agricultores que deseen recolectar semillas nativas, construir viveros rústicos y restaurar quebradas degradadas por la industria forestal.',
    puntosClave: [
      'Calendario de recolección de semillas (roble, peumo, boldo, quillay)',
      'Técnicas de siembra y trasplante en secano',
      'Asociación con cultivos de autoconsumo campesino'
    ]
  },
  {
    id: 'manifiesto',
    titulo: 'Manifiesto de Purén: Soberanía Territorial y Descentralización',
    tema: 'Pueblos',
    anio: '2024',
    autor: 'IV Encuentro Plurinacional de la Red',
    paginas: '18 págs.',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    resumen: 'Declaración política consensuada por más de 40 organizaciones campesinas, ecologistas y mapuche tras el encuentro nacional en la Cordillera de Nahuelbuta.',
    puntosClave: [
      'Reconocimiento a las zonas de sacrificio y memoria de las víctimas',
      'Llamado a la moratoria inmediata de expansión forestal',
      'Articulación con redes socioambientales del Cono Sur'
    ]
  },
  {
    id: 'sacrificio',
    titulo: 'Cartografía de Zonas de Sacrificio Forestal en el Centro-Sur',
    tema: 'Leyes',
    anio: '2023',
    autor: 'Observatorio Latinoamericano de Conflictos Ambientales (OLCA)',
    paginas: '60 págs.',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    resumen: 'Catastro exhaustivo de las instalaciones de celulosa, ductos marítimos, vertederos industriales y termoeléctricas de biomasa asociadas a los consorcios Arauco y CMPC.',
    puntosClave: [
      'Impacto en la salud respiratoria en Nacimiento y Laja',
      'Contaminación del Golfo de Arauco y pesca artesanal',
      'Pasivos ambientales acumulados sin plan de cierre'
    ]
  }
];

// Función para obtener documentos desde localStorage o datos base
function getDocumentos() {
  const local = localStorage.getItem('rf_documentos_data');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach(doc => {
          if (!doc.img) {
            const base = documentosData.find(d => d.id === doc.id);
            doc.img = base ? base.img : 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80';
          }
        });
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }
  return documentosData;
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. RENDER Y FILTRO DE DOCUMENTOS
  const bibContainer = document.getElementById('bibContainer');
  let currentDocs = getDocumentos();

  if (bibContainer) {
    function renderDocumentos(list) {
      if (!list.length) {
        bibContainer.innerHTML = `<div style="grid-column:1/-1;padding:40px;text-align:center;color:#9EAAA0;background:rgba(255,255,255,0.03);border-radius:8px;">No se encontraron documentos con los filtros seleccionados.</div>`;
        return;
      }

      bibContainer.innerHTML = list.map(doc => {
        const coverImg = doc.img || 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80';
        return `
        <div class="bib-card">
          <div class="bib-card-thumb">
            <img src="${coverImg}" alt="${doc.titulo}" loading="lazy">
            <span class="bib-theme-tag">${(doc.tema || 'GENERAL').toUpperCase()}</span>
          </div>
          <div class="bib-card-content">
            <div class="bib-card-meta">
              <span>📅 ${doc.anio || '2026'}</span>
              <span>📄 ${doc.paginas || 'Doc'}</span>
            </div>
            <h4 style="font-size:1.15rem;color:#F9F7F2;margin:8px 0 6px;line-height:1.3;">${doc.titulo}</h4>
            <p style="font-size:0.8rem;color:#9EAAA2;margin-bottom:8px;font-family:'IBM Plex Mono',monospace;">Por: ${doc.autor}</p>
            <p style="font-size:0.88rem;color:#C4D1C9;line-height:1.45;margin-bottom:16px;">${doc.resumen}</p>
            <button type="button" class="btn btn-outline-light" style="font-size:0.82rem;padding:7px 14px;margin-top:auto;width:100%;text-align:center;" onclick="openDocModal('${doc.id}')">
              Ver Ficha Técnica y Descargar PDF →
            </button>
          </div>
        </div>
      `;
      }).join('');
    }

    renderDocumentos(currentDocs);

    function filterDocs() {
      currentDocs = getDocumentos();
      const search = (document.getElementById('bibSearchInput')?.value || '').toLowerCase();
      const topic = document.getElementById('bibTopicSelect')?.value || 'todos';
      const year = document.getElementById('bibYearSelect')?.value || 'todos';

      const filtered = currentDocs.filter(d => {
        const matchSearch = !search || (d.titulo && d.titulo.toLowerCase().includes(search)) || (d.autor && d.autor.toLowerCase().includes(search)) || (d.resumen && d.resumen.toLowerCase().includes(search));
        const matchTopic = (topic === 'todos') || (d.tema === topic);
        const matchYear = (year === 'todos') || (d.anio === year);
        return matchSearch && matchTopic && matchYear;
      });

      renderDocumentos(filtered);
    }

    document.getElementById('bibSearchInput')?.addEventListener('input', filterDocs);
    document.getElementById('bibTopicSelect')?.addEventListener('change', filterDocs);
    document.getElementById('bibYearSelect')?.addEventListener('change', filterDocs);
  }

  // ==========================================================================
  // 2. RADIO COMUNITARIA EN VIVO DE CHILE
  // ==========================================================================
  const radioStationsData = {
    kurruf: {
      name: 'Radio Kurruf: Medios Libres y Defensa Territorial',
      origin: 'Región del Biobío y La Araucanía · Comunicación Popular y Autónoma',
      desc: 'Emisora comunitaria que transmite desde el centro-sur y Wallmapu. Cobertura ininterrumpida de los conflictos por la defensa de los bosques, la crisis hídrica inducida por forestales y la autonomía de las comunidades.',
      dial: 'WALLMAPU · 107.5 FM / SEÑAL ONLINE',
      streamUrl: 'https://radio.latina.red/radiokurruf.mp3',
      fallbackStream: 'https://sonic-us.arkeo.cl/8186/stream',
      webUrl: 'https://radiokurruf.org'
    },
    jgm: {
      name: 'Radio JGM: Comunicación Comunitaria y Popular',
      origin: 'Santiago y Señal Nacional · Debate Socioambiental y DD.HH.',
      desc: 'Radio comunitaria y ciudadana comprometida con los movimientos sociales, asambleas ambientales, derechos humanos y cobertura de problemáticas territoriales de todo Chile.',
      dial: 'CENTRO · SEÑAL ONLINE NACIONAL',
      streamUrl: 'https://sonic-us.arkeo.cl/8186/stream',
      fallbackStream: 'https://archi-us.digitalproserver.com/ritoquefm_aac',
      webUrl: 'https://radiojgm.uchile.cl'
    },
    ritoque: {
      name: 'Radio Ritoque / Placeres: Voces de la Costa y Territorio',
      origin: 'Región de Valparaíso · Cultura y Comunicación Libre',
      desc: 'Emisora independiente de la costa central chilena dedicada a la cultura comunitaria, difusión de problemáticas de cuencas costeras y música local sin censura comercial.',
      dial: 'COSTA CENTRAL · 107.9 FM / ONLINE',
      streamUrl: 'https://archi-us.digitalproserver.com/ritoquefm_aac',
      fallbackStream: 'https://sonic-us.arkeo.cl/8186/stream',
      webUrl: 'https://ritoquefm.cl'
    }
  };

  let currentStationKey = 'kurruf';
  let isRadioPlaying = false;
  const liveRadioAudio = document.getElementById('liveRadioAudio');
  const radioPlayBtn = document.getElementById('radioPlayBtn');
  const radioPlayIcon = document.getElementById('radioPlayIcon');
  const radioBtnLabel = document.getElementById('radioBtnLabel');
  const radioStatusDot = document.getElementById('radioStatusDot');
  const radioStatusText = document.getElementById('radioStatusText');
  const radioVisualizer = document.getElementById('radioVisualizer');
  const radioVolSlider = document.getElementById('radioVolSlider');
  const stationDialBadge = document.getElementById('stationDialBadge');
  const stationOrigin = document.getElementById('stationOrigin');
  const stationName = document.getElementById('stationName');
  const stationDesc = document.getElementById('stationDesc');
  const stationWebLink = document.getElementById('stationWebLink');
  const stationTabBtns = document.querySelectorAll('.station-tab-btn');

  function setRadioStatus(status, text) {
    if (!radioStatusDot || !radioStatusText) return;
    radioStatusDot.className = 'status-dot-state ' + status;
    radioStatusText.innerText = text;
  }

  function applyStation(key, autoPlay = false) {
    currentStationKey = key;
    const st = radioStationsData[key];
    if (!st) return;

    if (stationDialBadge) stationDialBadge.innerText = st.dial;
    if (stationOrigin) stationOrigin.innerText = st.origin;
    if (stationName) stationName.innerText = st.name;
    if (stationDesc) stationDesc.innerText = st.desc;
    if (stationWebLink) {
      stationWebLink.href = st.webUrl;
      stationWebLink.innerText = 'Visitar ' + (st.name.split(':')[0]) + ' ↗';
    }

    stationTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.station === key);
    });

    if (liveRadioAudio) {
      const wasPlaying = isRadioPlaying;
      liveRadioAudio.pause();
      liveRadioAudio.src = st.streamUrl;
      if (wasPlaying || autoPlay) {
        startRadioPlayback();
      } else {
        setRadioStatus('', `Sintonizada ${st.name.split(':')[0]}. Presiona 'Sintonizar Señal'.`);
      }
    }
  }

  function startRadioPlayback() {
    if (!liveRadioAudio) return;
    const st = radioStationsData[currentStationKey];
    setRadioStatus('loading', `Conectando con la señal de ${st.name.split(':')[0]}...`);
    if (radioBtnLabel) radioBtnLabel.innerText = 'Conectando...';

    // Asegurarse de que el source esté cargado
    if (!liveRadioAudio.src || liveRadioAudio.src === '') {
      liveRadioAudio.src = st.streamUrl;
    }

    liveRadioAudio.play().then(() => {
      isRadioPlaying = true;
      if (radioPlayIcon) radioPlayIcon.innerText = '⏸';
      if (radioBtnLabel) radioBtnLabel.innerText = 'Pausar Transmisión';
      if (radioPlayBtn) radioPlayBtn.classList.add('playing');
      if (radioVisualizer) radioVisualizer.classList.add('active');
      setRadioStatus('live', `🔴 Transmitiendo en directo: ${st.name.split(':')[0]}`);
    }).catch(err => {
      console.warn('Error al iniciar stream principal, intentando fallback...', err);
      // Intento de fallback stream si el servidor primario tiene CORS restrictivo
      if (st.fallbackStream && liveRadioAudio.src !== st.fallbackStream) {
        liveRadioAudio.src = st.fallbackStream;
        liveRadioAudio.play().then(() => {
          isRadioPlaying = true;
          if (radioPlayIcon) radioPlayIcon.innerText = '⏸';
          if (radioBtnLabel) radioBtnLabel.innerText = 'Pausar Transmisión';
          if (radioPlayBtn) radioPlayBtn.classList.add('playing');
          if (radioVisualizer) radioVisualizer.classList.add('active');
          setRadioStatus('live', `🔴 Transmitiendo en directo (Señal territorial alternativa)`);
        }).catch(e2 => {
          console.warn('Fallback stream error', e2);
          setRadioStatus('live', `🔴 Transmisión comunitaria activa (Haz clic en el enlace web si tu navegador bloquea audio mixto)`);
          if (radioBtnLabel) radioBtnLabel.innerText = 'Reintentar Señal';
          if (radioPlayIcon) radioPlayIcon.innerText = '▶';
        });
      } else {
        setRadioStatus('live', `🔴 Sintonizado. Haz clic para reproducir o escuchar en ${st.webUrl}`);
        if (radioBtnLabel) radioBtnLabel.innerText = 'Sintonizar Señal';
        if (radioPlayIcon) radioPlayIcon.innerText = '▶';
      }
    });
  }

  function pauseRadioPlayback() {
    if (!liveRadioAudio) return;
    liveRadioAudio.pause();
    isRadioPlaying = false;
    if (radioPlayIcon) radioPlayIcon.innerText = '▶';
    if (radioBtnLabel) radioBtnLabel.innerText = 'Sintonizar Señal';
    if (radioPlayBtn) radioPlayBtn.classList.remove('playing');
    if (radioVisualizer) radioVisualizer.classList.remove('active');
    setRadioStatus('', `Transmisión en pausa. Haz clic en 'Sintonizar Señal'.`);
  }

  function toggleRadio() {
    if (isRadioPlaying) {
      pauseRadioPlayback();
    } else {
      // Pausar el podcast si estaba reproduciéndose para no mezclar audios
      if (isPlaying) togglePodcastPlay();
      startRadioPlayback();
    }
  }

  if (radioPlayBtn) {
    radioPlayBtn.addEventListener('click', toggleRadio);
  }

  stationTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const station = this.dataset.station;
      applyStation(station, isRadioPlaying);
    });
  });

  if (radioVolSlider && liveRadioAudio) {
    radioVolSlider.addEventListener('input', (e) => {
      liveRadioAudio.volume = parseFloat(e.target.value);
    });
  }

  if (liveRadioAudio) {
    liveRadioAudio.addEventListener('waiting', () => {
      setRadioStatus('loading', 'Almacenando búfer de la señal comunitaria...');
    });
    liveRadioAudio.addEventListener('playing', () => {
      setRadioStatus('live', `🔴 Transmitiendo en directo desde Chile`);
    });
    liveRadioAudio.addEventListener('pause', () => {
      if (!isRadioPlaying) {
        setRadioStatus('', `Transmisión pausada.`);
      }
    });
  }

  // Inicializar radio en kurruf
  applyStation('kurruf', false);


  // ==========================================================================
  // 3. PODCAST POR LA DEFENSA DE LOS BOSQUES (AUDIO ENRIQUECIDO)
  // ==========================================================================
  const podcastTracks = [
    {
      title: 'Santa Juana después del fuego: el renacer del bosque nativo',
      desc: 'Conversación con dirigentas campesinas de comités de agua tras el megaincendio de 2023. Desafíos de la reconstrucción y viveros nativos comunitarios.',
      duration: '28:45',
      totalSecs: 1725,
      frequency: 220
    },
    {
      title: '¿Por qué las plantaciones no son bosque? Claves con AIFBN',
      desc: 'Diálogo con ingenieros forestales por el bosque nativo y el OLCA sobre balance hídrico, monocultivos de pino y eucalipto y ecología del fuego.',
      duration: '34:10',
      totalSecs: 2050,
      frequency: 246
    },
    {
      title: 'La cuenca de Contulmo y la sed campesina frente al eucalipto',
      desc: 'Relatos de familias que vivieron el secado sistemático de pozos y esteros en la Cordillera de Nahuelbuta.',
      duration: '22:15',
      totalSecs: 1335,
      frequency: 261
    },
    {
      title: 'Mujeres lafkenche y la defensa comunitaria del Itrofill Mogen',
      desc: 'Lideresas de Tirúa y Cañete abordan el valor sagrado de los humedales, menokos y relictos nativos frente a las forestales.',
      duration: '31:00',
      totalSecs: 1860,
      frequency: 293
    },
    {
      title: 'Zonas de sacrificio forestal y celulosa: De Nacimiento a Valdivia',
      desc: 'Investigación sobre la contaminación del Río Cruces, el Golfo de Arauco y los pasivos ambientales de las plantas de pulpa de celulosa.',
      duration: '26:30',
      totalSecs: 1590,
      frequency: 329
    }
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;
  let playbackSeconds = 0;
  let playbackTimer = null;
  let audioContext = null;
  let ambientOsc = null;
  let ambientGain = null;

  // Generador de Paisaje Sonoro de Bosque Nativo (Web Audio API)
  function initForestAudio() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  function startForestAmbient(freq = 220) {
    try {
      initForestAudio();
      if (!audioContext) return;

      if (ambientOsc) {
        ambientOsc.stop();
        ambientOsc.disconnect();
      }

      // Sintetizador sutil armónico tipo susurro del viento entre copas de bosque nativo
      ambientOsc = audioContext.createOscillator();
      ambientGain = audioContext.createGain();

      ambientOsc.type = 'sine';
      ambientOsc.frequency.setValueAtTime(freq, audioContext.currentTime);

      // Modulación suave para simular la brisa en el follaje
      ambientGain.gain.setValueAtTime(0.001, audioContext.currentTime);
      ambientGain.gain.exponentialRampToValueAtTime(0.03, audioContext.currentTime + 2);

      ambientOsc.connect(ambientGain);
      ambientGain.connect(audioContext.destination);
      ambientOsc.start();
    } catch (e) {
      console.log('WebAudio ambient info:', e);
    }
  }

  function stopForestAmbient() {
    try {
      if (ambientGain && audioContext) {
        ambientGain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.8);
        setTimeout(() => {
          if (ambientOsc) {
            ambientOsc.stop();
            ambientOsc.disconnect();
            ambientOsc = null;
          }
        }, 800);
      }
    } catch (e) {}
  }

  const waveformContainer = document.getElementById('waveform');
  if (waveformContainer) {
    for (let i = 0; i < 36; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar';
      bar.style.animationDelay = `${(i * 0.04).toFixed(2)}s`;
      waveformContainer.appendChild(bar);
    }
  }

  const playPauseBtn = document.getElementById('playPauseBtn');
  const playIcon = document.getElementById('playIcon');
  const currentTimeEl = document.getElementById('currentTime');
  const totalTimeEl = document.getElementById('totalTime');
  const progressFill = document.getElementById('progressFill');
  const progressBar = document.getElementById('progressBar');

  function formatSeconds(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function loadPodcastTrack(index) {
    currentTrackIndex = index;
    const track = podcastTracks[index];
    const tEl = document.getElementById('playerEpTitle');
    const dEl = document.getElementById('playerEpDesc');
    if (tEl) tEl.innerText = track.title;
    if (dEl) dEl.innerText = track.desc;
    if (totalTimeEl) totalTimeEl.innerText = track.duration;
    playbackSeconds = 0;
    if (currentTimeEl) currentTimeEl.innerText = '00:00';
    if (progressFill) progressFill.style.width = '0%';

    document.querySelectorAll('.episode-item').forEach((item, idx) => {
      item.classList.toggle('active', idx === index);
    });

    if (isPlaying) {
      startForestAmbient(track.frequency || 220);
    }
  }

  function togglePodcastPlay() {
    if (!playIcon || !waveformContainer) return;
    if (isPlaying) {
      clearInterval(playbackTimer);
      isPlaying = false;
      playIcon.innerText = '▶';
      waveformContainer.classList.remove('playing');
      stopForestAmbient();
    } else {
      // Pausar radio comunitaria si estaba en vivo para no duplicar sonido
      if (isRadioPlaying) pauseRadioPlayback();

      isPlaying = true;
      playIcon.innerText = '⏸';
      waveformContainer.classList.add('playing');
      startForestAmbient(podcastTracks[currentTrackIndex]?.frequency || 220);

      playbackTimer = setInterval(() => {
        const track = podcastTracks[currentTrackIndex];
        playbackSeconds++;
        if (playbackSeconds > track.totalSecs) {
          playbackSeconds = 0;
          togglePodcastPlay();
        }
        if (currentTimeEl) currentTimeEl.innerText = formatSeconds(playbackSeconds);
        const pct = (playbackSeconds / track.totalSecs) * 100;
        if (progressFill) progressFill.style.width = `${pct}%`;
      }, 1000);
    }
  }

  if (playPauseBtn) playPauseBtn.addEventListener('click', togglePodcastPlay);

  if (progressBar) {
    progressBar.addEventListener('click', e => {
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const track = podcastTracks[currentTrackIndex];
      playbackSeconds = Math.floor(track.totalSecs * pct);
      if (currentTimeEl) currentTimeEl.innerText = formatSeconds(playbackSeconds);
      if (progressFill) progressFill.style.width = `${pct * 100}%`;
    });
  }

  document.querySelectorAll('.episode-item').forEach(item => {
    item.addEventListener('click', function() {
      const idx = parseInt(this.dataset.index, 10);
      loadPodcastTrack(idx);
      if (!isPlaying) togglePodcastPlay();
    });
  });

  // 3. CONTROL DEL MODAL DE VIDEO
  window.openVideoModal = function(url, title, ytUrl) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    const titleEl = document.getElementById('videoModalTitle');
    const directLink = document.getElementById('videoDirectLink');

    if (!modal || !iframe) return;
    iframe.src = url;
    if (titleEl) titleEl.innerText = title;
    if (directLink) directLink.href = ytUrl || url;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeVideoModal = function() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    if (!modal) return;
    if (iframe) iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  const closeBtn = document.getElementById('closeVideoModalBtn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeVideoModal);
  }
  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('click', e => {
      if (e.target === videoModal) closeVideoModal();
    });
  }
});
