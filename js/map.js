/* ==========================================================================
   MAPA DE CONFLICTOS TERRITORIALES - LEAFLET CON VISTA SATELITAL & REGISTRO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('mapa-canvas');
  if (!mapContainer) return;

  // 1. INICIALIZACIÓN DEL MAPA
  const map = L.map('mapa-canvas', {
    scrollWheelZoom: false,
    zoomControl: true
  }).setView([-37.8, -72.6], 7);

  window.mapInstance = map;

  // 2. CAPAS BASE: CARTOGRÁFICA VS SATELITAL ACTUALIZADO (GOOGLE HD & ESRI)
  const cartoBase = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OSM</a>',
    maxZoom: 18
  });

  const googleSat = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    attribution: '&copy; Google Maps &mdash; Vista Satelital de Alta Definición',
    maxZoom: 20
  });

  const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics',
    maxZoom: 19
  });

  const esriLabels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri',
    maxZoom: 19
  });

  // Selector personalizado de interfaz (Botones Carto / Satelital / Autocarga)
  const btnCarto = document.getElementById('btnViewCarto');
  const btnSat = document.getElementById('btnViewSat');
  const btnAutoSat = document.getElementById('btnAutoSat');
  const autoSatStatus = document.getElementById('autoSatStatus');

  function isAutoSatEnabled() {
    const pref = localStorage.getItem('rf_autoload_satellite');
    // Por defecto es true para cumplir con el requerimiento de autocarga
    return pref === null || pref === 'true';
  }

  function updateAutoSatUI(enabled) {
    if (!btnAutoSat) return;
    if (enabled) {
      btnAutoSat.classList.add('active');
      if (autoSatStatus) autoSatStatus.textContent = 'ACTIVO';
      btnAutoSat.setAttribute('aria-pressed', 'true');
    } else {
      btnAutoSat.classList.remove('active');
      if (autoSatStatus) autoSatStatus.textContent = 'DESACTIVADO';
      btnAutoSat.setAttribute('aria-pressed', 'false');
    }
  }

  function showMapToast(msg) {
    let toast = document.getElementById('mapAutoToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mapAutoToast';
      toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#11261F;color:#F9F7F2;padding:12px 18px;border-radius:8px;font-family:"IBM Plex Sans",sans-serif;font-size:0.88rem;box-shadow:0 8px 24px rgba(0,0,0,0.35);z-index:9999;transition:all 0.3s ease;border:1px solid #4E8262;display:flex;align-items:center;gap:10px;';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 3200);
  }

  function setMapView(mode) {
    if (mode === 'sat') {
      map.removeLayer(cartoBase);
      map.removeLayer(esriSat);
      map.removeLayer(esriLabels);
      map.addLayer(googleSat);
      if (btnSat) btnSat.classList.add('active');
      if (btnCarto) btnCarto.classList.remove('active');
    } else {
      map.removeLayer(googleSat);
      map.removeLayer(esriSat);
      map.removeLayer(esriLabels);
      map.addLayer(cartoBase);
      if (btnCarto) btnCarto.classList.add('active');
      if (btnSat) btnSat.classList.remove('active');
    }
  }

  if (btnCarto) btnCarto.addEventListener('click', () => setMapView('carto'));
  if (btnSat) btnSat.addEventListener('click', () => setMapView('sat'));

  if (btnAutoSat) {
    btnAutoSat.addEventListener('click', () => {
      const current = isAutoSatEnabled();
      const next = !current;
      localStorage.setItem('rf_autoload_satellite', next ? 'true' : 'false');
      updateAutoSatUI(next);
      if (next) {
        setMapView('sat');
        showMapToast('🛰️ Vista Satelital configurada para autocargar siempre');
      } else {
        showMapToast('🗺️ Autocarga desactivada. Recordaremos tu preferencia.');
      }
    });
  }

  // Inicialización según preferencia guardada (por defecto Satelital siempre)
  const autoSatActive = isAutoSatEnabled();
  updateAutoSatUI(autoSatActive);
  if (autoSatActive) {
    setMapView('sat');
  } else {
    setMapView('carto');
  }

  // Control nativo de capas de Leaflet
  const baseMaps = {
    "🛰️ Satelital Google HD (Actualizado)": googleSat,
    "🛰️ Satelital Esri World Imagery": esriSat,
    "🗺️ Mapa Claro CartoDB": cartoBase
  };
  const overlays = {
    "Etiquetas & Caminos Esri": esriLabels
  };
  L.control.layers(baseMaps, overlays, { position: 'topright' }).addTo(map);

  // 3. CONFIGURACIÓN DE CAPAS Y ESTILOS
  const layerConfig = {
    incendios: { color: '#D64020', name: 'Megaincendio / Peligro Interfaz', icon: '🔥' },
    agua: { color: '#2B6979', name: 'Crisis Hídrica / Secado', icon: '💧' },
    industria: { color: '#4A524D', name: 'Planta Celulosa / Ducto', icon: '🏭' },
    restauracion: { color: '#4E8262', name: 'Restauración Nativa', icon: '🌱' },
    organizaciones: { color: '#11261F', name: 'Asamblea / Organización', icon: '✊' },
    resistencia: { color: '#DDA136', name: 'Comunidad Campesina / Mapuche', icon: '📜' }
  };

  // Puntos base territoriales verificados
  const defaultPoints = [
    {
      layer: 'incendios',
      lat: -37.18, lng: -72.93,
      titulo: 'Santa Juana: Megaincendio de Interfaz Forestal',
      comuna: 'Santa Juana, Región del Biobío',
      fecha: 'Febrero 2023 · Temporada activa',
      desc: 'Más del 70% de la comuna consumida por el fuego debido a la proximidad de monocultivos continuos de pino a las viviendas. La comunidad exige 1.000 metros de cortafuegos libres de plantación exótica.',
      fuente: 'Red Ambiental Santa Juana'
    },
    {
      layer: 'incendios',
      lat: -38.03, lng: -73.08,
      titulo: 'Purén y Lumaco: Devastación en Nahuelbuta',
      comuna: 'Purén, Región de La Araucanía',
      fecha: 'Verano 2023',
      desc: 'Tormentas de fuego originadas en paños forestales industriales de CMPC y Arauco rodearon la zona urbana. Reconstrucción comunitaria impulsando fajas agrícolas y nativas.',
      fuente: 'Comité de Reconstrucción Nahuelbuta'
    },
    {
      layer: 'incendios',
      lat: -36.73, lng: -72.48,
      titulo: 'Quillón: Tormentas de Fuego Recurrentes',
      comuna: 'Quillón, Región de Ñuble',
      fecha: '2017 y 2023',
      desc: 'El monocultivo masivo en secano interior propaga el fuego a gran velocidad, arrasando con viñedos centenarios patrimoniales de familias campesinas.',
      fuente: 'Viñateros Campesinos del Itata'
    },
    {
      layer: 'incendios',
      lat: -35.60, lng: -72.33,
      titulo: 'Empedrado y Santa Olga: Tragedia de 2017 y Resiliencia',
      comuna: 'Empedrado, Región del Maule',
      fecha: 'Histórico 2017 - Alerta 2026',
      desc: 'Cicatriz histórica del incendio Las Máquinas. Comunidades denuncian que tras la catástrofe se volvió a plantar pino sin respetar distancias de seguridad.',
      fuente: 'Asamblea Maule Sur Libre'
    },
    {
      layer: 'agua',
      lat: -37.47, lng: -73.34,
      titulo: 'Curanilahue: Cuenca del Río Seco',
      comuna: 'Curanilahue, Región del Biobío',
      fecha: 'Monitoreo Permanente',
      desc: 'Comuna rodeada por más de 80.000 ha de monocultivo. Racionamiento de agua permanente y abastecimiento mediante camiones aljibe durante todo el año.',
      fuente: 'Red de Mujeres de Curanilahue'
    },
    {
      layer: 'agua',
      lat: -38.41, lng: -72.78,
      titulo: 'Galvarino: Desecamiento de Pozos y Vertientes',
      comuna: 'Galvarino, Región de La Araucanía',
      fecha: '2024-2026',
      desc: 'Comunidades mapuche con napas de agua agotadas tras tres rotaciones continuas de eucalipto en los cerros circundantes.',
      fuente: 'Asociación de Comunidades de Galvarino'
    },
    {
      layer: 'agua',
      lat: -36.60, lng: -72.95,
      titulo: 'Tomé: Secado de Cuencas Costeras',
      comuna: 'Tomé, Región del Biobío',
      fecha: 'Alerta Vigente',
      desc: 'Estéreos históricos secos por plantaciones forestales densas en las cabeceras de cuenca. Proyectos de comités de agua potable rural en crisis.',
      fuente: 'Coordinadora de Cuencas de Tomé'
    },
    {
      layer: 'industria',
      lat: -37.50, lng: -72.67,
      titulo: 'Nacimiento: Contaminación Industrial y Malos Olores',
      comuna: 'Nacimiento, Región del Biobío',
      fecha: '2020-2026',
      desc: 'Población expuesta a emisiones de sulfuro y material particulado de las plantas de celulosa Santa Fe. Altos índices de afecciones broncopulmonares.',
      fuente: 'Vecinos por la Salud de Nacimiento'
    },
    {
      layer: 'industria',
      lat: -39.75, lng: -73.20,
      titulo: 'Río Cruces: Desastre de los Cisnes y Celulosa Valdivia',
      comuna: 'Mariquina, Región de Los Ríos',
      fecha: 'Memoria Histórica y Seguimiento',
      desc: 'El desastre ecológico de 2004 en el Santuario de la Naturaleza Carlos Anwandter demostró el peligro de la descarga de riles industriales.',
      fuente: 'Acción por los Cisnes'
    },
    {
      layer: 'restauracion',
      lat: -39.85, lng: -73.22,
      titulo: 'Valdivia: Vivero Comunitario y Restauración de Cuencas',
      comuna: 'Valdivia, Región de Los Ríos',
      fecha: 'Proyecto Activo',
      desc: 'Siembra comunitaria de más de 30.000 árboles nativos para recuperar las cabeceras de agua potable rural en sectores periurbanos.',
      fuente: 'Vivero Comunitario Bosque Vivo'
    },
    {
      layer: 'restauracion',
      lat: -37.30, lng: -73.15,
      titulo: 'Coronel / Santa Juana: Corredor Biológico Nahuelbuta',
      comuna: 'Santa Juana / Coronel, Biobío',
      fecha: 'En desarrollo',
      desc: 'Iniciativa ciudadana de erradicación de rebrote de pino para instalar bosquetes de queule, pitao y ruil en peligro de extinción.',
      fuente: 'Colectivo Biodiversidad Nahuelbuta'
    },
    {
      layer: 'resistencia',
      lat: -38.25, lng: -72.85,
      titulo: 'Traiguén y Lumaco: Recuperación Territorial Ancestral',
      comuna: 'Traiguén, Región de La Araucanía',
      fecha: 'Vigente',
      desc: 'Comunidades mapuche en defensa de sus títulos de merced y recuperación de espacios ceremoniales usurpados durante la dictadura bajo el D.L. 701.',
      fuente: 'Alianza Territorial Mapuche'
    },
    {
      layer: 'organizaciones',
      lat: -36.82, lng: -73.05,
      titulo: 'Concepción: Secretaría Técnica de la Red Centro-Sur',
      comuna: 'Concepción, Región del Biobío',
      fecha: 'Coordinación Permanente',
      desc: 'Espacio de articulación legal, técnica y comunicacional de las más de 40 organizaciones de Maule, Ñuble, Biobío, Araucanía, Los Ríos y Los Lagos.',
      fuente: 'Mesa de Coordinación de la Red'
    }
  ];

  // Recuperar conflictos guardados en localStorage
  let userConflicts = [];
  try {
    userConflicts = JSON.parse(localStorage.getItem('rf_user_conflicts') || '[]');
  } catch (err) {
    userConflicts = [];
  }

  const allPoints = [...defaultPoints, ...userConflicts];

  // Marcadores y capas Leaflet
  const markerGroup = L.layerGroup().addTo(map);
  const markersList = [];

  function createCustomIcon(layerKey) {
    const conf = layerConfig[layerKey] || { color: '#11261F', icon: '📍' };
    return L.divIcon({
      className: 'custom-map-pin',
      html: `
        <div style="
          width: 34px; height: 34px;
          background: ${conf.color};
          border: 2px solid #FFFFFF;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.35);
          cursor: pointer;
          transition: transform 0.2s ease;
        ">
          ${conf.icon}
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -18]
    });
  }

  function renderPoints(pointsToRender) {
    markerGroup.clearLayers();
    markersList.length = 0;

    pointsToRender.forEach(p => {
      const conf = layerConfig[p.layer] || { color: '#11261F', name: 'Conflicto', icon: '📍' };
      const icon = createCustomIcon(p.layer);
      const marker = L.marker([p.lat, p.lng], { icon: icon });

      const popupContent = `
        <div style="font-family:'IBM Plex Sans',sans-serif;max-width:280px;padding:4px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <span style="background:${conf.color};color:#FFF;padding:2px 8px;border-radius:4px;font-size:0.75rem;font-family:'IBM Plex Mono',monospace;font-weight:700;">
              ${conf.name}
            </span>
          </div>
          <h4 style="font-size:1.05rem;color:#11261F;margin-bottom:4px;font-family:'Archivo',sans-serif;">${p.titulo}</h4>
          <p style="font-size:0.82rem;color:#565C58;margin-bottom:6px;font-family:'IBM Plex Mono',monospace;">📍 ${p.comuna}</p>
          <p style="font-size:0.86rem;color:#2A2F2C;line-height:1.45;margin-bottom:8px;">${p.desc}</p>
          <div style="font-size:0.75rem;color:#872E16;font-weight:600;border-top:1px solid #EFECE4;padding-top:6px;">
            📢 Fuente: ${p.fuente || 'Reporte Comunitario'}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.pointData = p;
      markerGroup.addLayer(marker);
      markersList.push(marker);
    });

    // Actualizar resumen de estadísticas
    const statsEl = document.getElementById('mapStatsSummary');
    if (statsEl) {
      statsEl.innerHTML = `Mostrando <strong>${pointsToRender.length}</strong> conflictos territoriales activos`;
    }
  }

  renderPoints(allPoints);

  // 4. FILTROS POR CATEGORÍA
  let currentLayerFilter = 'todos';
  let currentSearchQuery = '';

  function applyFilters() {
    let filtered = allPoints;
    if (currentLayerFilter !== 'todos') {
      filtered = filtered.filter(p => p.layer === currentLayerFilter);
    }
    if (currentSearchQuery.trim() !== '') {
      const q = currentSearchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.titulo.toLowerCase().includes(q) ||
        p.comuna.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
      );
    }
    renderPoints(filtered);
  }

  document.querySelectorAll('.map-filter-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      document.querySelectorAll('.map-filter-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      currentLayerFilter = this.dataset.layer || 'todos';
      applyFilters();
    });
  });

  const searchInput = document.getElementById('mapSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      currentSearchQuery = this.value;
      applyFilters();
    });
  }

  // 5. REGISTRO INTERACTIVO DE NUEVO CONFLICTO EN EL MAPA
  let isPickingCoords = false;
  let tempMarker = null;
  const btnPickCoords = document.getElementById('btnPickCoords');
  const pCoordsInput = document.getElementById('pCoords');
  const newPointForm = document.getElementById('newPointForm');

  if (btnPickCoords) {
    btnPickCoords.addEventListener('click', () => {
      isPickingCoords = !isPickingCoords;
      if (isPickingCoords) {
        btnPickCoords.classList.add('picking');
        btnPickCoords.innerHTML = '🎯 Haz clic en el mapa para marcar...';
        map.getContainer().style.cursor = 'crosshair';
      } else {
        btnPickCoords.classList.remove('picking');
        btnPickCoords.innerHTML = '📍 Marcar Coordenadas en el Mapa';
        map.getContainer().style.cursor = '';
      }
    });
  }

  map.on('click', (e) => {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    if (isPickingCoords || pCoordsInput) {
      if (pCoordsInput) {
        pCoordsInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      }

      if (tempMarker) {
        map.removeLayer(tempMarker);
      }

      tempMarker = L.circleMarker([lat, lng], {
        radius: 9,
        color: '#D64020',
        fillColor: '#F4D389',
        fillOpacity: 0.9,
        weight: 3
      }).addTo(map);

      tempMarker.bindPopup('<div style="font-family:sans-serif;font-size:0.85rem;"><strong>Ubicación seleccionada</strong><br>Completa el formulario para registrar este conflicto.</div>').openPopup();

      if (isPickingCoords && btnPickCoords) {
        isPickingCoords = false;
        btnPickCoords.classList.remove('picking');
        btnPickCoords.innerHTML = `✅ Coordenadas fijadas: ${lat.toFixed(3)}, ${lng.toFixed(3)}`;
        map.getContainer().style.cursor = '';
      }
    }
  });

  if (newPointForm) {
    newPointForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const layer = document.getElementById('pLayer').value;
      const titulo = document.getElementById('pTitle').value.trim();
      const comuna = document.getElementById('pComuna').value.trim();
      const coordsVal = document.getElementById('pCoords').value.trim();
      const desc = document.getElementById('pDesc').value.trim();
      const fuente = document.getElementById('pSource').value.trim();

      if (!layer || !titulo || !comuna || !desc) {
        alert('Por favor completa todos los campos requeridos.');
        return;
      }

      let lat = -37.5;
      let lng = -72.8;

      if (coordsVal && coordsVal.includes(',')) {
        const parts = coordsVal.split(',');
        lat = parseFloat(parts[0]);
        lng = parseFloat(parts[1]);
      }

      const pendingConflict = {
        id: 'conf-' + Date.now(),
        layer,
        titulo,
        comuna,
        lat,
        lng,
        desc,
        fuente: fuente || 'Reporte Ciudadano / Comunitario',
        fecha: new Date().toLocaleDateString('es-CL'),
        status: 'pending',
        submittedAt: new Date().toISOString()
      };

      // Guardar en la cola de moderación de denuncias pendientes
      let pendingConflicts = [];
      try {
        pendingConflicts = JSON.parse(localStorage.getItem('rf_pending_conflicts') || '[]');
      } catch (err) {
        pendingConflicts = [];
      }
      pendingConflicts.unshift(pendingConflict);
      try {
        localStorage.setItem('rf_pending_conflicts', JSON.stringify(pendingConflicts));
      } catch (err) {
        console.error('Error guardando denuncia pendiente en localStorage', err);
      }

      if (tempMarker) {
        map.removeLayer(tempMarker);
        tempMarker = null;
      }

      // Cerrar modal si está en un modal
      const modal = document.getElementById('reportPointModal');
      if (modal) modal.classList.remove('active');

      // Limpiar formulario
      newPointForm.reset();
      if (btnPickCoords) {
        btnPickCoords.innerHTML = '📍 Marcar Coordenadas en el Mapa';
      }

      alert('¡Denuncia territorial registrada con éxito! Para resguardar la rigurosidad comunitaria, tu reporte ha ingresado a revisión por la administración de la Red (superacionmodeloforestal@gmail.com). Una vez autorizado por el administrador, se publicará como marcador en el mapa cartográfico.');
    });
  }

  // Abrir / cerrar modal de reporte si existe
  const openReportModalBtn = document.getElementById('openReportModalBtn');
  const reportModal = document.getElementById('reportPointModal');
  const closeReportModalBtn = document.getElementById('closeReportModalBtn');

  if (openReportModalBtn && reportModal) {
    openReportModalBtn.addEventListener('click', () => {
      reportModal.classList.add('active');
    });
  }
  if (closeReportModalBtn && reportModal) {
    closeReportModalBtn.addEventListener('click', () => {
      reportModal.classList.remove('active');
    });
  }
});
