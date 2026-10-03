/* ==========================================================================
   PANEL DE ADMINISTRACIÓN - RED POR LA SUPERACIÓN DEL MODELO FORESTAL
   Lógica interactiva de autenticación, moderación y gestión de contenidos
   ========================================================================== */

// Datos iniciales de respaldo para artículos si no existen en localStorage
const defaultInitialPosts = [
  {
    id: 'post-1',
    cat: 'Comunicados',
    isDraft: false,
    titulo: 'Rechazo ciudadano a nueva ampliación industrial en el Biobío',
    fecha: '28 de Agosto, 2026',
    autor: 'Mesa Coordinadora de la Red',
    territorio: 'Golfo de Arauco / Concepción',
    img: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    resumen: 'Las organizaciones de la Red firman una declaración exigiendo al Servicio de Evaluación Ambiental el rechazo del proyecto de ampliación de riles en el Golfo de Arauco.',
    contenido: '<p>Frente al reingreso del proyecto de ampliación del sistema de descarga de residuos industriales líquidos al mar por parte de la industria celulosa, las más de 40 organizaciones agrupadas en la Red por la Superación del Modelo Forestal manifestamos nuestro categórico rechazo.</p><p>Las comunidades pesqueras artesanales y lafkenche de la zona han documentado durante más de dos décadas la pérdida sostenida de bancos naturales de mariscos y la acidificación localizada de las aguas costeras. Exigimos una moratoria inmediata a nuevas inversiones contaminantes y la reconversión de los procesos productivos.</p>',
    comentarios: [
      {
        autor: 'Marcos Cayupi',
        territorio: 'Lof Mapu Arauco',
        fecha: '29 de Agosto, 2026',
        texto: 'Total respaldo desde Arauco. No permitiremos más ductos en el mar que destruyan la pesca de subsistencia.'
      },
      {
        autor: 'Camila Retamal',
        territorio: 'Coronel Despierta',
        fecha: '30 de Agosto, 2026',
        texto: 'Excelente declaración. Estaremos presentes en la asamblea con la delegación juvenil.'
      }
    ]
  },
  {
    id: 'post-2',
    cat: 'Investigación',
    isDraft: false,
    titulo: 'Catastro 2026: El 82% del agua en camiones aljibe va a comunas forestales',
    fecha: '15 de Agosto, 2026',
    autor: 'Equipo Técnico & SIG de la Red',
    territorio: 'Regiones de Maule a La Araucanía',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    resumen: 'Análisis de presupuestos municipales revela el gasto millonario que el Fisco desembolsa anualmente para compensar el desecamiento provocado por el monocultivo de eucalipto.',
    contenido: '<p>Un exhaustivo cruce de datos de la Subdere, municipios rurales y la Dirección General de Aguas (DGA) realizado por el equipo de investigación de la Red comprobó una correlación directa y alarmante: el 82% del gasto público en camiones aljibe se concentra en comunas donde las plantaciones de pino y eucalipto superan el 50% de la superficie comunal.</p>',
    comentarios: [
      {
        autor: 'Ing. Rodrigo Valenzuela',
        territorio: 'Hidrología Comunitaria',
        fecha: '16 de Agosto, 2026',
        texto: 'El dato de los 50 litros por persona es demoledor. Es el estándar de supervivencia de la OMS en zonas de guerra aplicado en pleno campo chileno.'
      }
    ]
  }
];

// Documentos base de biblioteca
const defaultInitialDocs = [
  {
    id: 'ley-moratoria',
    titulo: 'Propuesta de Ley de Moratoria Forestal y Restauración de Cuencas',
    tema: 'Leyes',
    anio: '2026',
    autor: 'Equipo Jurídico ReSuMoF & Parlamentarios Aliados',
    paginas: '48 págs.',
    resumen: 'Marco regulatorio integral que propone la derogación de los subsidios del DL 701, el establecimiento de franjas de amortiguación periurbanas y la creación del Fondo Nacional de Restauración de Cuencas.'
  },
  {
    id: 'hidro',
    titulo: 'Impacto Hidrológico del Monocultivo en Cuencas del Biobío y Maule',
    tema: 'Agua',
    anio: '2025',
    autor: 'Comisión Científica Independiente',
    paginas: '72 págs.',
    resumen: 'Estudio de balance hídrico que demuestra cómo la densidad de eucaliptos y pinos reduce hasta un 65% el caudal de verano en esteros que abastecen a comités de agua potable rural.'
  }
];

// ==========================================================================
// 1. HELPERS DE ALMACENAMIENTO LOCAL
// ==========================================================================
function getAdminPosts() {
  const local = localStorage.getItem('rf_blog_posts');
  if (local) {
    try { return JSON.parse(local); } catch(e) { console.error(e); }
  }
  return defaultInitialPosts;
}

function saveAdminPosts(posts) {
  localStorage.setItem('rf_blog_posts', JSON.stringify(posts));
}

function getPendingComments() {
  try {
    return JSON.parse(localStorage.getItem('rf_pending_comments') || '[]');
  } catch(e) { return []; }
}

function savePendingComments(comments) {
  localStorage.setItem('rf_pending_comments', JSON.stringify(comments));
}

function getPendingConflicts() {
  try {
    return JSON.parse(localStorage.getItem('rf_pending_conflicts') || '[]');
  } catch(e) { return []; }
}

function savePendingConflicts(conflicts) {
  localStorage.setItem('rf_pending_conflicts', JSON.stringify(conflicts));
}

function getUserConflicts() {
  try {
    return JSON.parse(localStorage.getItem('rf_user_conflicts') || '[]');
  } catch(e) { return []; }
}

function saveUserConflicts(conflicts) {
  localStorage.setItem('rf_user_conflicts', JSON.stringify(conflicts));
}

function getAdminDocs() {
  const local = localStorage.getItem('rf_documentos_data');
  if (local) {
    try { return JSON.parse(local); } catch(e) { console.error(e); }
  }
  return defaultInitialDocs;
}

function saveAdminDocs(docs) {
  localStorage.setItem('rf_documentos_data', JSON.stringify(docs));
}

// ==========================================================================
// 2. CONTROL DE SESIÓN Y LOGIN
// ==========================================================================
const DEFAULT_PIN = 'resumof2026';

function isLogged() {
  return sessionStorage.getItem('rf_admin_logged') === 'true';
}

function setLogged(val) {
  if (val) {
    sessionStorage.setItem('rf_admin_logged', 'true');
  } else {
    sessionStorage.removeItem('rf_admin_logged');
  }
}

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', () => {
  const loginOverlay = document.getElementById('adminLoginOverlay');
  const loginForm = document.getElementById('adminLoginForm');
  const logoutBtn = document.getElementById('logoutBtn');

  // Verificar sesión
  if (isLogged()) {
    loginOverlay.classList.add('hidden');
    initAdminPanel();
  } else {
    loginOverlay.classList.remove('hidden');
  }

  // Submit Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pwd = document.getElementById('adminPassword').value.trim();
    const customPwd = localStorage.getItem('rf_admin_custom_pwd');

    if (pwd === DEFAULT_PIN || (customPwd && pwd === customPwd)) {
      setLogged(true);
      loginOverlay.classList.add('hidden');
      initAdminPanel();
    } else {
      alert('Clave incorrecta. La clave predeterminada es resumof2026');
    }
  });

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('¿Deseas cerrar la sesión de administración?')) {
        setLogged(false);
        window.location.reload();
      }
    });
  }

  // Inicializar estado por si el usuario visita /admin sin haber visitado el blog
  if (!localStorage.getItem('rf_blog_posts')) {
    saveAdminPosts(defaultInitialPosts);
  }
  if (!localStorage.getItem('rf_documentos_data')) {
    saveAdminDocs(defaultInitialDocs);
  }
});

// ==========================================================================
// 3. INICIALIZACIÓN DEL PANEL
// ==========================================================================
function initAdminPanel() {
  setupNavigation();
  updateKPIsAndBadges();
  renderDashboard();
  renderCommentsModeration('pending');
  renderConflictsModeration('pending');
  renderArticlesList();
  setupForms();
}

// ==========================================================================
// 4. NAVEGACIÓN ENTRE PESTAÑAS
// ==========================================================================
const tabTitles = {
  dashboard: 'Dashboard General',
  comentarios: 'Moderación de Comentarios',
  denuncias: 'Moderación de Denuncias del Mapa',
  articulos: 'Gestión de Artículos & Borradores',
  biblioteca: 'Biblioteca Documental & Medios',
  ajustes: 'Ajustes Institucionales & Respaldo'
};

function setupNavigation() {
  document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const target = this.dataset.tab;
      switchTab(target);
    });
  });

  const quickBtn = document.getElementById('btnQuickNewPost');
  if (quickBtn) {
    quickBtn.addEventListener('click', () => {
      switchTab('articulos');
      document.getElementById('postTitle').focus();
    });
  }
}

window.switchTab = function(tabId) {
  // Actualizar botones de navegación
  document.querySelectorAll('.sidebar-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  // Mostrar pane correspondiente
  document.querySelectorAll('.admin-tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `pane-${tabId}`);
  });

  // Título de la cabecera
  const heading = document.getElementById('pageHeading');
  if (heading && tabTitles[tabId]) {
    heading.innerText = tabTitles[tabId];
  }

  // Refrescar vistas pertinentes
  if (tabId === 'dashboard') renderDashboard();
  if (tabId === 'comentarios') renderCommentsModeration('pending');
  if (tabId === 'denuncias') renderConflictsModeration('pending');
  if (tabId === 'articulos') renderArticlesList();
  updateKPIsAndBadges();
};

// ==========================================================================
// 5. KPIS Y BADGES
// ==========================================================================
function updateKPIsAndBadges() {
  const pendingComments = getPendingComments();
  const pendingConflicts = getPendingConflicts();
  const posts = getAdminPosts();
  const docs = getAdminDocs();

  // Badges sidebar
  const cBadge = document.getElementById('pendingCommentsBadge');
  if (cBadge) {
    cBadge.innerText = pendingComments.length;
    cBadge.style.display = pendingComments.length > 0 ? 'inline-block' : 'none';
  }

  const dBadge = document.getElementById('pendingConflictsBadge');
  if (dBadge) {
    dBadge.innerText = pendingConflicts.length;
    dBadge.style.display = pendingConflicts.length > 0 ? 'inline-block' : 'none';
  }

  // KPIs Dashboard
  const kpiC = document.getElementById('kpiPendingComments');
  if (kpiC) kpiC.innerText = pendingComments.length;

  const kpiD = document.getElementById('kpiPendingConflicts');
  if (kpiD) kpiD.innerText = pendingConflicts.length;

  const kpiP = document.getElementById('kpiTotalPosts');
  if (kpiP) kpiP.innerText = posts.length;

  const kpiDoc = document.getElementById('kpiTotalDocs');
  if (kpiDoc) kpiDoc.innerText = docs.length;
}

// ==========================================================================
// 6. RENDER DASHBOARD
// ==========================================================================
function renderDashboard() {
  const pendingComments = getPendingComments().slice(0, 3);
  const pendingConflicts = getPendingConflicts().slice(0, 3);

  const cPreview = document.getElementById('dashPendingCommentsPreview');
  if (cPreview) {
    if (pendingComments.length === 0) {
      cPreview.innerHTML = '<p style="font-size:0.86rem;color:var(--admin-text-muted);font-style:italic;">No hay comentarios pendientes en cola. Todo al día ✅</p>';
    } else {
      cPreview.innerHTML = pendingComments.map(c => `
        <div style="background:rgba(0,0,0,0.25);border-radius:6px;padding:12px;margin-bottom:8px;font-size:0.85rem;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <strong>${c.autor}</strong> <span style="color:var(--admin-accent);">${c.territorio}</span>
          </div>
          <p style="color:#C6D4CC;margin:0 0 6px;">"${c.texto.substring(0, 80)}${c.texto.length > 80 ? '...' : ''}"</p>
          <button class="btn-admin btn-admin-primary" style="padding:4px 10px;font-size:0.75rem;" onclick="switchTab('comentarios')">
            Moderar Comentario →
          </button>
        </div>
      `).join('');
    }
  }

  const dPreview = document.getElementById('dashPendingConflictsPreview');
  if (dPreview) {
    if (pendingConflicts.length === 0) {
      dPreview.innerHTML = '<p style="font-size:0.86rem;color:var(--admin-text-muted);font-style:italic;">No hay denuncias pendientes de validación. Todo al día ✅</p>';
    } else {
      dPreview.innerHTML = pendingConflicts.map(d => `
        <div style="background:rgba(0,0,0,0.25);border-radius:6px;padding:12px;margin-bottom:8px;font-size:0.85rem;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <strong style="color:#FFF;">${d.titulo}</strong>
            <span class="mod-badge mod-badge-pending">${d.layer.toUpperCase()}</span>
          </div>
          <p style="color:#C6D4CC;margin:0 0 6px;">📍 ${d.comuna}</p>
          <button class="btn-admin btn-admin-primary" style="padding:4px 10px;font-size:0.75rem;" onclick="switchTab('denuncias')">
            Revisar Denuncia →
          </button>
        </div>
      `).join('');
    }
  }
}

// ==========================================================================
// 7. MODERACIÓN DE COMENTARIOS
// ==========================================================================
let currentCommentFilter = 'pending';

window.filterCommentsTab = function(mode) {
  currentCommentFilter = mode;
  document.getElementById('filterCommentsPendingBtn').classList.toggle('btn-admin-primary', mode === 'pending');
  document.getElementById('filterCommentsPendingBtn').classList.toggle('btn-admin-outline', mode !== 'pending');
  document.getElementById('filterCommentsApprovedBtn').classList.toggle('btn-admin-primary', mode === 'approved');
  document.getElementById('filterCommentsApprovedBtn').classList.toggle('btn-admin-outline', mode !== 'approved');
  renderCommentsModeration(mode);
};

function renderCommentsModeration(mode = 'pending') {
  const listEl = document.getElementById('commentsModerationList');
  if (!listEl) return;

  if (mode === 'pending') {
    const pending = getPendingComments();
    if (pending.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center;padding:40px;color:var(--admin-text-muted);background:rgba(0,0,0,0.15);border-radius:8px;">
          <span style="font-size:2rem;display:block;margin-bottom:8px;">🎉</span>
          <strong>No hay comentarios pendientes de revisión.</strong><br>
          <span style="font-size:0.85rem;">Los comentarios enviados por los lectores aparecerán aquí esperando tu aprobación.</span>
        </div>
      `;
      return;
    }

    listEl.innerHTML = pending.map(c => `
      <div class="mod-item">
        <div class="mod-item-top">
          <div>
            <span class="mod-badge mod-badge-pending">⏳ PENDIENTE DE AUTORIZACIÓN</span>
            <span class="mod-meta" style="margin-left:8px;">Fecha: ${c.fecha}</span>
          </div>
          <span class="mod-meta">Artículo: <strong>${c.postTitle || c.postId}</strong></span>
        </div>
        
        <div class="mod-title">
          👤 ${c.autor} <span style="font-size:0.85rem;color:var(--admin-accent);font-weight:normal;">(📍 ${c.territorio})</span>
        </div>

        <div class="mod-text">
          ${c.texto}
        </div>

        <div class="mod-actions">
          <button type="button" class="btn-admin btn-admin-success" onclick="approveComment('${c.id}')">
            ✅ Aprobar y Publicar en el Blog
          </button>
          <button type="button" class="btn-admin btn-admin-danger" onclick="rejectComment('${c.id}')">
            ❌ Rechazar / Eliminar
          </button>
          <a href="mailto:superacionmodeloforestal@gmail.com?subject=Moderación de Comentario: ${encodeURIComponent(c.autor)}&body=Estimado/a ${encodeURIComponent(c.autor)}, respecto a tu comentario..." class="btn-admin btn-admin-outline">
            ✉️ Contactar al Autor
          </a>
        </div>
      </div>
    `).join('');
  } else {
    // Ver comentarios aprobados
    const posts = getAdminPosts();
    let approved = [];
    posts.forEach(p => {
      if (p.comentarios && p.comentarios.length > 0) {
        p.comentarios.forEach(c => {
          approved.push({ ...c, postTitle: p.titulo, postId: p.id });
        });
      }
    });

    if (approved.length === 0) {
      listEl.innerHTML = '<div style="text-align:center;padding:30px;color:var(--admin-text-muted);">No hay comentarios aprobados en este momento.</div>';
      return;
    }

    listEl.innerHTML = approved.map(c => `
      <div class="mod-item">
        <div class="mod-item-top">
          <span class="mod-badge mod-badge-approved">✅ PUBLICADO EN BLOG</span>
          <span class="mod-meta">Artículo: <strong>${c.postTitle}</strong></span>
        </div>
        <div class="mod-title">👤 ${c.autor} (${c.territorio}) · <small>${c.fecha}</small></div>
        <div class="mod-text">${c.texto}</div>
        <div class="mod-actions">
          <button type="button" class="btn-admin btn-admin-danger" style="font-size:0.75rem;" onclick="removeApprovedComment('${c.postId}', '${c.autor}', '${c.texto.substring(0, 20)}')">
            Despublicar / Eliminar
          </button>
        </div>
      </div>
    `).join('');
  }
}

window.approveComment = function(commentId) {
  let pending = getPendingComments();
  const itemIndex = pending.findIndex(c => c.id === commentId);
  if (itemIndex === -1) return;

  const item = pending[itemIndex];
  const posts = getAdminPosts();
  const postIndex = posts.findIndex(p => p.id === item.postId);

  const approvedComment = {
    autor: item.autor,
    territorio: item.territorio,
    fecha: item.fecha,
    texto: item.texto
  };

  if (postIndex !== -1) {
    if (!posts[postIndex].comentarios) posts[postIndex].comentarios = [];
    posts[postIndex].comentarios.push(approvedComment);
    saveAdminPosts(posts);
  } else {
    // Si el post no existe en la lista base, lo añadimos al primer post por defecto
    if (posts.length > 0) {
      if (!posts[0].comentarios) posts[0].comentarios = [];
      posts[0].comentarios.push(approvedComment);
      saveAdminPosts(posts);
    }
  }

  // Quitar de la cola de pendientes
  pending.splice(itemIndex, 1);
  savePendingComments(pending);

  updateKPIsAndBadges();
  renderCommentsModeration('pending');
  alert(`¡Comentario de ${item.autor} aprobado! Ya está visible públicamente en el blog.`);
};

window.rejectComment = function(commentId) {
  if (!confirm('¿Seguro que deseas rechazar y eliminar este comentario?')) return;
  let pending = getPendingComments();
  pending = pending.filter(c => c.id !== commentId);
  savePendingComments(pending);
  updateKPIsAndBadges();
  renderCommentsModeration('pending');
};

window.removeApprovedComment = function(postId, author, textExcerpt) {
  if (!confirm('¿Deseas despublicar este comentario del artículo?')) return;
  const posts = getAdminPosts();
  const post = posts.find(p => p.id === postId);
  if (post && post.comentarios) {
    post.comentarios = post.comentarios.filter(c => !(c.autor === author && c.texto.startsWith(textExcerpt)));
    saveAdminPosts(posts);
    renderCommentsModeration('approved');
  }
};

// ==========================================================================
// 8. MODERACIÓN DE DENUNCIAS DEL MAPA
// ==========================================================================
let currentConflictFilter = 'pending';

window.filterConflictsTab = function(mode) {
  currentConflictFilter = mode;
  document.getElementById('filterConflictsPendingBtn').classList.toggle('btn-admin-primary', mode === 'pending');
  document.getElementById('filterConflictsPendingBtn').classList.toggle('btn-admin-outline', mode !== 'pending');
  document.getElementById('filterConflictsApprovedBtn').classList.toggle('btn-admin-primary', mode === 'approved');
  document.getElementById('filterConflictsApprovedBtn').classList.toggle('btn-admin-outline', mode !== 'approved');
  renderConflictsModeration(mode);
};

function renderConflictsModeration(mode = 'pending') {
  const listEl = document.getElementById('conflictsModerationList');
  if (!listEl) return;

  if (mode === 'pending') {
    const pending = getPendingConflicts();
    if (pending.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center;padding:40px;color:var(--admin-text-muted);background:rgba(0,0,0,0.15);border-radius:8px;">
          <span style="font-size:2rem;display:block;margin-bottom:8px;">🗺️</span>
          <strong>No hay denuncias pendientes de revisión territorial.</strong><br>
          <span style="font-size:0.85rem;">Cuando las comunidades envíen puntos desde el mapa, aparecerán aquí para tu verificación técnica.</span>
        </div>
      `;
      return;
    }

    listEl.innerHTML = pending.map(d => `
      <div class="mod-item">
        <div class="mod-item-top">
          <div>
            <span class="mod-badge mod-badge-pending">⏳ DENUNCIA EN REVISIÓN</span>
            <span class="mod-badge" style="background:#2D5A46;color:#FFF;margin-left:6px;">${d.layer.toUpperCase()}</span>
          </div>
          <span class="mod-meta">Fecha: ${d.fecha || 'Reciente'}</span>
        </div>

        <div class="mod-title" style="font-size:1.15rem;">
          📢 ${d.titulo}
        </div>

        <div style="font-family:'IBM Plex Mono',monospace;font-size:0.82rem;color:var(--admin-accent);">
          📍 ${d.comuna} · Coordenadas: ${d.lat.toFixed(4)}, ${d.lng.toFixed(4)}
        </div>

        <div class="mod-text">
          ${d.desc}
        </div>

        <div style="font-size:0.82rem;color:var(--admin-text-muted);">
          🏛️ <strong>Organización / Fuente denunciante:</strong> ${d.fuente || 'Reporte de la comunidad'}
        </div>

        <div class="mod-actions">
          <button type="button" class="btn-admin btn-admin-success" onclick="approveConflict('${d.id}')">
            ✅ Aprobar y Publicar en el Mapa Interactivo
          </button>
          <button type="button" class="btn-admin btn-admin-danger" onclick="rejectConflict('${d.id}')">
            ❌ Rechazar / Descartar
          </button>
          <a href="https://www.google.com/maps?q=${d.lat},${d.lng}" target="_blank" class="btn-admin btn-admin-outline">
            📍 Abrir Coordenadas en Satélite ↗
          </a>
          <a href="mailto:superacionmodeloforestal@gmail.com?subject=Denuncia Territorial: ${encodeURIComponent(d.titulo)}&body=Detalles: ${encodeURIComponent(d.desc)}" class="btn-admin btn-admin-outline">
            ✉️ Reenviar al Correo Oficial
          </a>
        </div>
      </div>
    `).join('');
  } else {
    // Ver denuncias aprobadas
    const userConflicts = getUserConflicts();
    if (userConflicts.length === 0) {
      listEl.innerHTML = '<div style="text-align:center;padding:30px;color:var(--admin-text-muted);">No hay denuncias de usuarios publicadas actualmente en el mapa (aparte de los hitos base de la Red).</div>';
      return;
    }

    listEl.innerHTML = userConflicts.map((d, index) => `
      <div class="mod-item">
        <div class="mod-item-top">
          <span class="mod-badge mod-badge-approved">✅ PUBLICADO EN EL MAPA</span>
          <span class="mod-meta">📍 ${d.comuna}</span>
        </div>
        <div class="mod-title">${d.titulo}</div>
        <div class="mod-text">${d.desc}</div>
        <div class="mod-actions">
          <button type="button" class="btn-admin btn-admin-danger" style="font-size:0.75rem;" onclick="removeApprovedConflict(${index})">
            Quitar del Mapa
          </button>
        </div>
      </div>
    `).join('');
  }
}

window.approveConflict = function(conflictId) {
  let pending = getPendingConflicts();
  const idx = pending.findIndex(c => c.id === conflictId);
  if (idx === -1) return;

  const item = pending[idx];
  let userConflicts = getUserConflicts();

  // Guardar en la lista pública de conflictos
  userConflicts.unshift({
    layer: item.layer,
    titulo: item.titulo,
    comuna: item.comuna,
    lat: item.lat,
    lng: item.lng,
    desc: item.desc,
    fuente: item.fuente,
    fecha: item.fecha
  });
  saveUserConflicts(userConflicts);

  // Quitar de pendientes
  pending.splice(idx, 1);
  savePendingConflicts(pending);

  updateKPIsAndBadges();
  renderConflictsModeration('pending');
  alert(`¡Denuncia "${item.titulo}" aprobada exitosamente! Ya es visible como marcador en el mapa público.`);
};

window.rejectConflict = function(conflictId) {
  if (!confirm('¿Deseas descartar esta denuncia?')) return;
  let pending = getPendingConflicts();
  pending = pending.filter(c => c.id !== conflictId);
  savePendingConflicts(pending);
  updateKPIsAndBadges();
  renderConflictsModeration('pending');
};

window.removeApprovedConflict = function(index) {
  if (!confirm('¿Deseas remover esta denuncia del mapa territorial?')) return;
  let userConflicts = getUserConflicts();
  userConflicts.splice(index, 1);
  saveUserConflicts(userConflicts);
  renderConflictsModeration('approved');
};

// ==========================================================================
// 9. GESTOR DE ARTÍCULOS Y BLOG
// ==========================================================================
function renderArticlesList() {
  const container = document.getElementById('adminArticlesList');
  const countText = document.getElementById('articlesCountText');
  if (!container) return;

  const posts = getAdminPosts();
  if (countText) countText.innerText = `${posts.length} publicaciones registradas`;

  container.innerHTML = posts.map(post => {
    const commentCount = post.comentarios ? post.comentarios.length : 0;
    return `
      <div class="mod-item">
        <div class="mod-item-top">
          <div>
            <span class="mod-badge" style="background:rgba(221,161,54,0.15);color:var(--admin-accent);">${post.cat}</span>
            ${post.isDraft ? '<span class="mod-badge mod-badge-pending" style="margin-left:6px;">BORRADOR EN REVISIÓN</span>' : ''}
          </div>
          <span class="mod-meta">📅 ${post.fecha} · 💬 ${commentCount} comentarios</span>
        </div>

        <div style="display:flex;gap:16px;align-items:center;">
          <img src="${post.img}" style="width:70px;height:70px;border-radius:6px;object-fit:cover;flex-shrink:0;">
          <div>
            <h4 style="font-size:1.05rem;color:var(--admin-text);margin-bottom:4px;">${post.titulo}</h4>
            <p style="font-size:0.85rem;color:var(--admin-text-muted);margin:0;">✍️ ${post.autor} · 📍 ${post.territorio}</p>
          </div>
        </div>

        <div class="mod-actions">
          <button type="button" class="btn-admin btn-admin-primary" style="font-size:0.8rem;" onclick="editPost('${post.id}')">
            ✏️ Editar Artículo
          </button>
          <button type="button" class="btn-admin btn-admin-danger" style="font-size:0.8rem;" onclick="deletePost('${post.id}')">
            🗑️ Eliminar
          </button>
          <a href="../blog.html" target="_blank" class="btn-admin btn-admin-outline" style="font-size:0.8rem;">
            Ver en el Blog ↗
          </a>
        </div>
      </div>
    `;
  }).join('');
}

window.editPost = function(postId) {
  const posts = getAdminPosts();
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  document.getElementById('editingPostId').value = post.id;
  document.getElementById('postTitle').value = post.titulo;
  document.getElementById('postCategory').value = post.cat;
  document.getElementById('postAuthor').value = post.autor;
  document.getElementById('postTerritory').value = post.territorio;
  document.getElementById('postImage').value = post.img;
  document.getElementById('postSummary').value = post.resumen;
  // Convertir tags HTML simples a texto si es necesario
  document.getElementById('postContent').value = post.contenido.replace(/<p>/g, '').replace(/<\/p>/g, '\n\n').trim();
  document.getElementById('postIsDraft').checked = !!post.isDraft;

  document.getElementById('articleFormHeader').innerText = `✏️ Editando: ${post.titulo}`;
  document.getElementById('btnSavePost').innerText = '💾 Actualizar Cambios';
  document.getElementById('btnCancelEditPost').style.display = 'inline-flex';

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.cancelEditPost = function() {
  document.getElementById('adminPostForm').reset();
  document.getElementById('editingPostId').value = '';
  document.getElementById('articleFormHeader').innerText = '📝 Redactar Nuevo Artículo o Crónica';
  document.getElementById('btnSavePost').innerText = '💾 Guardar y Publicar Artículo';
  document.getElementById('btnCancelEditPost').style.display = 'none';
};

window.deletePost = function(postId) {
  if (!confirm('¿Estás seguro de que deseas eliminar este artículo de la plataforma?')) return;
  let posts = getAdminPosts();
  posts = posts.filter(p => p.id !== postId);
  saveAdminPosts(posts);
  renderArticlesList();
  updateKPIsAndBadges();
};

window.setPostPresetImg = function(type) {
  const presets = {
    bosque: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    incendio: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    asamblea: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    agua: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
  };
  if (presets[type]) {
    document.getElementById('postImage').value = presets[type];
  }
};

// ==========================================================================
// 10. SETUP DE FORMULARIOS
// ==========================================================================
function setupForms() {
  // Formulario Artículos
  const postForm = document.getElementById('adminPostForm');
  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('editingPostId').value;
      const titulo = document.getElementById('postTitle').value.trim();
      const cat = document.getElementById('postCategory').value;
      const autor = document.getElementById('postAuthor').value.trim();
      const territorio = document.getElementById('postTerritory').value.trim();
      const img = document.getElementById('postImage').value.trim() || 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80';
      const resumen = document.getElementById('postSummary').value.trim();
      const rawContent = document.getElementById('postContent').value.trim();
      const isDraft = document.getElementById('postIsDraft').checked;

      // Formatear contenido en párrafos HTML
      const contenido = rawContent.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');
      let posts = getAdminPosts();

      if (editId) {
        // Actualizar existente
        const idx = posts.findIndex(p => p.id === editId);
        if (idx !== -1) {
          posts[idx] = {
            ...posts[idx],
            titulo,
            cat,
            autor,
            territorio,
            img,
            resumen,
            contenido,
            isDraft
          };
          saveAdminPosts(posts);
          alert('¡Artículo actualizado exitosamente!');
        }
      } else {
        // Crear nuevo
        const newPost = {
          id: 'post-' + Date.now(),
          titulo,
          cat,
          autor,
          territorio,
          img,
          resumen,
          contenido,
          isDraft,
          fecha: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }),
          comentarios: []
        };
        posts.unshift(newPost);
        saveAdminPosts(posts);
        alert('¡Nuevo artículo publicado exitosamente en la plataforma!');
      }

      cancelEditPost();
      renderArticlesList();
      updateKPIsAndBadges();
    });
  }

  // Formulario Biblioteca
  const docForm = document.getElementById('adminDocForm');
  if (docForm) {
    docForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titulo = document.getElementById('docTitle').value.trim();
      const tema = document.getElementById('docTopic').value;
      const autor = document.getElementById('docAuthor').value.trim();
      const anio = document.getElementById('docYear').value.trim() || '2026';
      const resumen = document.getElementById('docSummary').value.trim();

      const newDoc = {
        id: 'doc-' + Date.now(),
        titulo,
        tema,
        autor,
        anio,
        paginas: 'Doc. Técnico',
        resumen: resumen || 'Documento técnico publicado por la Red por la Superación del Modelo Forestal.'
      };

      let docs = getAdminDocs();
      docs.unshift(newDoc);
      saveAdminDocs(docs);

      docForm.reset();
      updateKPIsAndBadges();
      alert('¡Documento agregado a la Biblioteca Documental exitosamente!');
    });
  }

  // Exportar / Importar Respaldo
  const exportBtn = document.getElementById('btnExportData');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const backup = {
        meta: {
          app: 'Red por la Superación del Modelo Forestal',
          version: '2026.1',
          exportedAt: new Date().toISOString(),
          adminContact: 'superacionmodeloforestal@gmail.com'
        },
        posts: getAdminPosts(),
        pendingComments: getPendingComments(),
        pendingConflicts: getPendingConflicts(),
        userConflicts: getUserConflicts(),
        docs: getAdminDocs()
      };

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resumof_backup_${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  const importInput = document.getElementById('importFileInput');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const data = JSON.parse(evt.target.result);
          if (data.posts) saveAdminPosts(data.posts);
          if (data.pendingComments) savePendingComments(data.pendingComments);
          if (data.pendingConflicts) savePendingConflicts(data.pendingConflicts);
          if (data.userConflicts) saveUserConflicts(data.userConflicts);
          if (data.docs) saveAdminDocs(data.docs);

          alert('¡Copia de respaldo importada con éxito!');
          window.location.reload();
        } catch(err) {
          alert('Error al leer el archivo JSON de respaldo.');
        }
      };
      reader.readAsText(file);
    });
  }
}
