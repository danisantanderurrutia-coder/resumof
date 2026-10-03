/* ==========================================================================
   BLOG Y NOTICIAS - ARTÍCULOS, BORRADORES Y CAJA DE COMENTARIOS
   ========================================================================== */

const initialBlogPosts = [
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
    contenido: `
      <p>Frente al reingreso del proyecto de ampliación del sistema de descarga de residuos industriales líquidos al mar por parte de la industria celulosa, las más de 40 organizaciones agrupadas en la Red por la Superación del Modelo Forestal manifestamos nuestro categórico rechazo.</p>
      <p>Las comunidades pesqueras artesanales y lafkenche de la zona han documentado durante más de dos décadas la pérdida sostenida de bancos naturales de mariscos y la acidificación localizada de las aguas costeras. Exigimos una moratoria inmediata a nuevas inversiones contaminantes y la reconversión de los procesos productivos.</p>
      <p>Convocamos a una asamblea abierta en el puerto de Coronel este sábado 12 de septiembre para definir el plan de movilización birregional.</p>
    `,
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
    contenido: `
      <p>Un exhaustivo cruce de datos de la Subdere, municipios rurales y la Dirección General de Aguas (DGA) realizado por el equipo de investigación de la Red comprobó una correlación directa y alarmante: el 82% del gasto público en camiones aljibe se concentra en comunas donde las plantaciones de pino y eucalipto superan el 50% de la superficie comunal.</p>
      <p>Mientras las empresas forestales continúan exportando celulosa y madera aserrada con amplias utilidades, el Estado de Chile y los municipios deben gastar más de 38 mil millones de pesos anuales para llevar 50 litros diarios por persona a familias que antes contaban con vertientes vivas y esteros caudalosos.</p>
    `,
    comentarios: [
      {
        autor: 'Ing. Rodrigo Valenzuela',
        territorio: 'Hidrología Comunitaria',
        fecha: '16 de Agosto, 2026',
        texto: 'El dato de los 50 litros por persona es demoledor. Es el estándar de supervivencia de la OMS en zonas de guerra aplicado en pleno campo chileno.'
      }
    ]
  },
  {
    id: 'post-3',
    cat: 'Campañas',
    isDraft: false,
    titulo: 'Campaña "1.000 Metros de Vida": Cortafuegos obligatorios para los pueblos',
    fecha: '20 de Julio, 2026',
    autor: 'Comité de Prevención Territorial Santa Juana',
    territorio: 'Santa Juana / Purén / Tomé',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    resumen: 'Iniciativa ciudadana para exigir que las empresas forestales retiren plantaciones de alta inflamabilidad de los perímetros urbanos antes de la próxima temporada estival.',
    contenido: `
      <p>La tragedia de los megaincendios de 2017 y 2023 demostró que los cortafuegos tradicionales de 15 o 30 metros son completamente inútiles frente a tormentas de fuego con pavesas que vuelan a más de 800 metros de distancia impulsadas por vientos puelche.</p>
      <p>Nuestra propuesta de ley ciudadana '1.000 Metros de Vida' establece una zona de amortiguación de un kilómetro libre de pino y eucalipto alrededor de todas las áreas pobladas, escuelas rurales y centros de salud, reemplazándolos por agricultura campesina, huertos y bosque nativo higrófilo.</p>
    `,
    comentarios: [
      {
        autor: 'Gladys Morales',
        territorio: 'Junta de Vecinos San Ramón, Santa Juana',
        fecha: '21 de Julio, 2026',
        texto: 'En 2023 perdimos todo porque los pinos estaban a 10 metros del patio de mi casa. Los 1.000 metros son cuestión de vida o muerte.'
      },
      {
        autor: 'Bernardo San Martín',
        territorio: 'Purén',
        fecha: '23 de Julio, 2026',
        texto: 'Adherimos desde Purén. Tenemos que presentar este proyecto con urgencia en el Congreso.'
      }
    ]
  },
  {
    id: 'post-4',
    cat: 'Borradores',
    isDraft: true,
    titulo: '[BORRADOR EN REVISIÓN] Protocolo Vecinal: Cómo auditar fajas cortafuego antes del verano',
    fecha: 'Septiembre 2026 (Borrador de Trabajo)',
    autor: 'Comisión de Emergencia & Defensa Civil',
    territorio: 'Secano Interior y Cordillera de la Costa',
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    resumen: 'Guía técnica en elaboración para que juntas de vecinos rurales y comités de seguridad puedan medir y denunciar la falta de fajas preventivas en predios colindantes.',
    contenido: `
      <p><strong>DOCUMENTO DE TRABAJO COMUNITARIO - ENVIAR OBSERVACIONES</strong></p>
      <p>Este protocolo provee los pasos técnicos y jurídicos para que las comunidades rurales identifiquen predios en estado de abandono o con biomasa excesiva de pino insigne y eucalipto sin despeje perimetral reglamentario:</p>
      <ol style="margin-left:20px;margin-bottom:16px;">
        <li>Identificación de rol del predio mediante el portal del SII y mapas comunales abiertos.</li>
        <li>Medición de distancia mínima entre faja de copas y cierres perimetrales perimetrales de viviendas (mínimo exigible según ordenanzas municipales vigentes).</li>
        <li>Generación de ficha fotográfica georreferenciada con marca de tiempo.</li>
        <li>Ingreso coordinado de denuncias ante la Conaf, Juzgado de Policía Local y delegación presidencial provincial.</li>
      </ol>
      <p><em>Por favor deja en los comentarios tus sugerencias de redacción para la versión final que se imprimirá para los territorios.</em></p>
    `,
    comentarios: [
      {
        autor: 'Esteban Pino',
        territorio: 'Brigada Comunitaria Quillón',
        fecha: 'Hace 2 días',
        texto: 'Sugiero añadir una plantilla descargable para la carta de denuncia al juzgado de policía local para facilitar el trámite a las dirigentas.'
      }
    ]
  },
  {
    id: 'post-5',
    cat: 'Borradores',
    isDraft: true,
    titulo: '[BORRADOR TÉCNICO] Estudio de Humedad: Bosque Nativo vs Eucaliptal en Secano Costero',
    fecha: 'Septiembre 2026 (Borrador de Trabajo)',
    autor: 'Grupo de Ecología y Restauración Aplicada',
    territorio: 'Cordillera de la Costa (Maule y Biobío)',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    resumen: 'Mediciones preliminares de sensores de humedad en los primeros 40 cm de suelo demuestran que el sotobosque nativo retiene hasta un 340% más agua en pleno enero.',
    contenido: `
      <p><strong>BORRADOR PREVIO A PUBLICACIÓN CIENTÍFICA CIUDADANA</strong></p>
      <p>Durante la temporada estival 2025-2026 se instalaron 18 estaciones de monitoreo continuo de humedad volumétrica de suelo y temperatura a nivel de hojarasca en dos parcelas colindantes en la comuna de Empedrado: una de renoval nativo de hualo (<em>Nothofagus glauca</em>) y otra de plantación comercial de <em>Eucalyptus globulus</em> de 14 años.</p>
      <p>Resultados preliminares clave:</p>
      <ul style="margin-left:20px;margin-bottom:16px;">
        <li>El suelo bajo dosel nativo mantuvo un promedio de 22% de humedad volumétrica durante la ola de calor de enero, mientras que el eucaliptal descendió a 6.4%, ingresando en punto de marchitez permanente.</li>
        <li>La temperatura en la superficie del suelo bajo eucaliptal alcanzó los 44.8 °C con hojarasca altamente pirogénica, frente a los 26.2 °C bajo dosel nativo multiespecie.</li>
      </ul>
      <p>Este informe será presentado como sustento técnico para declarar zonas de exclusión forestal en cabeceras de cuenca.</p>
    `,
    comentarios: [
      {
        autor: 'Dra. Verónica Sanhueza',
        territorio: 'U. de Concepción',
        fecha: 'Ayer',
        texto: 'Excelente rigurosidad. Recomiendo agregar el gráfico de déficit de presión de vapor (VPD) para correlacionar con la probabilidad de ignición de pavesas.'
      }
    ]
  },
  {
    id: 'post-6',
    cat: 'Borradores',
    isDraft: true,
    titulo: '[BORRADOR DECLARACIÓN] Minuta Política: Posición ante el Proyecto de Ley de Fomento Forestal',
    fecha: 'Septiembre 2026 (Borrador de Trabajo)',
    autor: 'Equipo Jurídico & Político de la Red',
    territorio: 'Nivel Nacional / Congreso',
    img: 'https://images.unsplash.com/photo-1494825514961-674db1ac2700?auto=format&fit=crop&w=800&q=80',
    resumen: 'Minuta de indicaciones para parlamentarios: exigencia de derogación definitiva de cualquier subsidio directo o indirecto a monocultivos y reorientación de fondos a restauración ecológica comunitaria.',
    contenido: `
      <p><strong>PROPUESTA DE ARTICULADO Y MINUTA DE DEBATE LEGISLATIVO</strong></p>
      <p>Ante la tramitación del nuevo marco legal de fomento, la Red plantea tres ejes intransables:</p>
      <ol style="margin-left:20px;margin-bottom:16px;">
        <li><strong>Fin a los subsidios al raleo y poda para grandes patrimonios:</strong> El Estado no puede continuar financiando la mitigación del riesgo inherente a un modelo de negocio privado altamente rentable y destructivo.</li>
        <li><strong>Fondo Nacional de Restauración Hidrológica:</strong> Los recursos deben ser transferidos directamente a comités de agua potable rural y municipios para adquirir franjas de amortiguación y plantar bosque nativo.</li>
        <li><strong>Responsabilidad Civil Objetiva por Incendios:</strong> Las empresas tenedoras de predios forestales continuos deben responder económicamente por los daños a terceros cuando el fuego se origine o propague a través de sus monocultivos sin planes preventivos certificados.</li>
      </ol>
    `,
    comentarios: [
      {
        autor: 'Héctor Nahuelcura',
        territorio: 'Comunidades del Lanalhue',
        fecha: 'Hace 5 horas',
        texto: 'Fundamental recalcar el punto 3 de responsabilidad civil. Hasta ahora las forestales cobran seguros y el costo social lo pagan las familias quemadas.'
      }
    ]
  }
];

// Gestión de artículos en memoria y localStorage
function getBlogPosts() {
  const local = localStorage.getItem('rf_blog_posts');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let changed = false;
        parsed.forEach(p => {
          if (p.img && p.img.includes('1511497584788')) {
            p.img = 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80';
            changed = true;
          }
        });
        if (changed) saveBlogPosts(parsed);
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
  }
  return initialBlogPosts;
}

function saveBlogPosts(posts) {
  try {
    localStorage.setItem('rf_blog_posts', JSON.stringify(posts));
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const blogContainer = document.getElementById('blogPostsContainer');
  if (!blogContainer) return;

  let currentCategory = 'todos';
  let posts = getBlogPosts();

  function renderBlog(cat) {
    posts = getBlogPosts();
    let filtered = posts;

    if (cat === 'Borradores') {
      filtered = posts.filter(p => p.isDraft);
    } else if (cat !== 'todos') {
      filtered = posts.filter(p => p.cat === cat);
    }

    blogContainer.innerHTML = filtered.map(post => {
      const commentCount = post.comentarios ? post.comentarios.length : 0;
      return `
        <article class="post-card ${post.isDraft ? 'draft-post' : ''}">
          <div class="post-image-wrapper">
            <img src="${post.img}" alt="${post.titulo}" loading="lazy">
            <span class="post-category-tag">${post.cat}</span>
          </div>
          <div class="post-body">
            ${post.isDraft ? '<span class="post-draft-badge">📝 BORRADOR EN REVISIÓN</span>' : ''}
            <span class="post-date">📅 ${post.fecha} · 💬 ${commentCount} comentarios</span>
            <h3 style="font-size:1.22rem;line-height:1.25;margin:6px 0 10px;">${post.titulo}</h3>
            <p style="font-size:0.92rem;color:#565C58;margin-bottom:14px;">${post.resumen}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto;border-top:1px solid #EFECE4;padding-top:12px;">
              <span style="font-size:0.78rem;font-family:'IBM Plex Mono',monospace;color:#2F5946;">📍 ${post.territorio}</span>
              <button class="btn btn-outline-dark" style="padding:6px 12px;font-size:0.82rem;" onclick="openArticleModal('${post.id}')">
                Leer & Comentar →
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Filtrado de pestañas
  document.querySelectorAll('.blog-pill').forEach(pill => {
    pill.addEventListener('click', function() {
      document.querySelectorAll('.blog-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.cat;
      renderBlog(currentCategory);
    });
  });

  renderBlog('todos');

  // MODAL DETALLADO DE LECTURA Y CAJA DE COMENTARIOS
  window.openArticleModal = function(postId) {
    posts = getBlogPosts();
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    let modal = document.getElementById('articleReaderModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.id = 'articleReaderModal';
      modal.innerHTML = `
        <div class="modal-card" style="max-width:760px;max-height:90vh;overflow-y:auto;">
          <button class="modal-close-btn" id="closeArticleModalBtn" aria-label="Cerrar modal">×</button>
          <div id="articleModalInnerContent"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#closeArticleModalBtn').addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    const modalContent = document.getElementById('articleModalInnerContent');
    const commentCount = post.comentarios ? post.comentarios.length : 0;

    const commentsListHtml = (post.comentarios || []).map(c => `
      <div class="comment-card">
        <div class="comment-top">
          <div>
            <span class="comment-author">${c.autor}</span>
            <span class="comment-territory">📍 ${c.territorio}</span>
          </div>
          <span class="comment-time">${c.fecha}</span>
        </div>
        <p class="comment-text">${c.texto}</p>
      </div>
    `).join('');

    modalContent.innerHTML = `
      <div style="margin-bottom:14px;">
        <span class="mono-badge ${post.isDraft ? 'badge-amber' : ''}">${post.cat}</span>
        ${post.isDraft ? '<span class="post-draft-badge" style="margin-left:8px;">BORRADOR DE DISCUSIÓN</span>' : ''}
      </div>
      <h2 style="font-size:1.75rem;line-height:1.2;color:var(--bosque-profundo);margin-bottom:10px;">${post.titulo}</h2>
      <div style="font-family:'IBM Plex Mono',monospace;font-size:0.82rem;color:var(--gris-ceniza);margin-bottom:20px;border-bottom:1px solid #EFECE4;padding-bottom:12px;">
        ✍️ Por: <strong>${post.autor}</strong> · 📍 ${post.territorio} · 📅 ${post.fecha}
      </div>
      <div style="font-size:1rem;line-height:1.65;color:#2A2F2C;margin-bottom:30px;">
        ${post.contenido}
      </div>

      <!-- SECCIÓN INTERACTIVA DE COMENTARIOS -->
      <section class="comments-section" id="commentsSection">
        <div class="comments-header">
          <h4 style="font-size:1.25rem;color:var(--bosque-profundo);margin:0;">Comentarios & Testimonios</h4>
          <span class="comments-count-pill" id="currentCommentsCount">💬 ${commentCount} opiniones</span>
        </div>

        <div class="comments-list" id="modalCommentsList">
          ${commentsListHtml.length > 0 ? commentsListHtml : '<p style="font-size:0.9rem;color:#8D948F;font-style:italic;">Aún no hay comentarios en este artículo. ¡Sé el primero en compartir tu testimonio o aporte!</p>'}
        </div>

        <!-- FORMULARIO DE COMENTARIO -->
        <div class="add-comment-box">
          <h5>Dejar un comentario o aporte territorial</h5>
          <form id="articleCommentForm" data-post-id="${post.id}">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
              <div class="form-group" style="margin-bottom:0;">
                <label style="font-size:0.8rem;color:#565C58;display:block;margin-bottom:4px;">Tu Nombre o Colectivo</label>
                <input type="text" id="commAuthor" required placeholder="Ej. Camila Morales" style="width:100%;padding:8px 12px;border:1px solid #DDD;border-radius:4px;">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label style="font-size:0.8rem;color:#565C58;display:block;margin-bottom:4px;">Comuna o Territorio</label>
                <input type="text" id="commTerritory" required placeholder="Ej. Santa Juana, Biobío" style="width:100%;padding:8px 12px;border:1px solid #DDD;border-radius:4px;">
              </div>
            </div>
            <div class="form-group" style="margin-bottom:14px;">
              <label style="font-size:0.8rem;color:#565C58;display:block;margin-bottom:4px;">Comentario / Observación al borrador</label>
              <textarea id="commText" required placeholder="Escribe aquí tu aporte, propuesta de cambio o testimonio del territorio..." style="width:100%;min-height:80px;padding:8px 12px;border:1px solid #DDD;border-radius:4px;font-family:inherit;"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="padding:8px 18px;font-size:0.88rem;">
              Publicar Comentario
            </button>
          </form>
        </div>
      </section>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Manejar envío del formulario de comentarios (SISTEMA DE MODERACIÓN PREVIA)
    const form = document.getElementById('articleCommentForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('commAuthor').value.trim();
      const territory = document.getElementById('commTerritory').value.trim();
      const text = document.getElementById('commText').value.trim();

      if (!author || !territory || !text) return;

      const pendingComment = {
        id: 'comm-' + Date.now(),
        postId: post.id,
        postTitle: post.titulo,
        autor: author,
        territorio: territory,
        fecha: new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }),
        texto: text,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };

      // Guardar en cola de moderación de comentarios pendientes
      let pendingList = [];
      try {
        pendingList = JSON.parse(localStorage.getItem('rf_pending_comments') || '[]');
      } catch (err) {
        pendingList = [];
      }
      pendingList.unshift(pendingComment);
      localStorage.setItem('rf_pending_comments', JSON.stringify(pendingList));

      // Limpiar formulario y mostrar aviso de moderación pendiente
      form.reset();

      // Mostrar banner de confirmación de moderación
      let noticeBox = document.getElementById('commentPendingNotice');
      if (!noticeBox) {
        noticeBox = document.createElement('div');
        noticeBox.id = 'commentPendingNotice';
        form.parentNode.insertBefore(noticeBox, form.nextSibling);
      }
      noticeBox.innerHTML = `
        <div style="background:#FFF9EB;border:1px solid #EBD5A0;color:#785A14;padding:14px 18px;border-radius:6px;margin-top:16px;font-size:0.88rem;line-height:1.5;animation:fadeIn 0.3s ease;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span style="font-size:1.2rem;">⏳</span>
            <strong style="color:#5C4309;">Comentario en espera de autorización</strong>
          </div>
          <p style="margin:0;">
            Gracias <strong>${author}</strong> (${territory}). Tu aporte ha ingresado a la cola de moderación para evitar spam y comentarios ofensivos. Será publicado en este artículo una vez autorizado por el equipo administrador (<a href="mailto:superacionmodeloforestal@gmail.com" style="color:#5C4309;font-weight:600;text-decoration:underline;">superacionmodeloforestal@gmail.com</a>).
          </p>
        </div>
      `;

      alert('¡Comentario enviado! Por seguridad comunitaria, está en espera de autorización del administrador antes de publicarse.');
    });
  };
});
