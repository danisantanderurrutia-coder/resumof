/* ==========================================================================
   RED POR LA SUPERACIÓN DEL MODELO FORESTAL
   ASISTENTE JURÍDICO AMBIENTAL (CHAT CONVERSACIONAL ORDENADO)
   Leyes de Chile: Ley 20.283, DFL 458, Código de Aguas Ley 21.435, D.S. 276, Ley 21.595
   ========================================================================== */

(function () {
  'use strict';

  // Base de Conocimiento Jurídico-Ambiental (Chile)
  const TOPICS = {
    tala: {
      title: 'Tala no autorizada de Bosque Nativo',
      organismo: 'CONAF (Fono 130) & Juzgado de Policía Local',
      leyes: 'Ley N° 20.283 (Art. 5, 17 y 21) · Dictamen CGR N° 6.524/2020',
      pasos: [
        'Fotografía y graba tocones, maquinaria o camiones con madera nativa.',
        'Obtén coordenadas GPS (con Google Maps en tu teléfono).',
        'Llama al Fono 130 de CONAF o ingresa denuncia digital en conaf.cl/oirs.',
        'CONAF debe acudir con auxilio de la fuerza pública, cursar acta y enviar al Juzgado de Policía Local.',
        'Sanciones: Multas del doble al triple del valor comercial talado + reforestación obligatoria.'
      ],
      contacto: 'Fono CONAF: 130 | Web: conaf.cl'
    },
    cortafuegos: {
      title: 'Plantaciones pegadas a casas / Falta de cortafuegos',
      organismo: 'Dirección de Obras Municipales (DOM) & Juzgado de Policía Local',
      leyes: 'DFL 458 (Ley General de Urbanismo y Construcciones) · Ordenanzas Municipales',
      pasos: [
        'Mide y fotografía la distancia entre las copas de los pinos/eucaliptos y los cercos o viviendas.',
        'Presenta reclamo por escrito ante la DOM municipal exigiendo notificar al dueño forestal.',
        'Si persiste el incumplimiento, denuncia en el Juzgado de Policía Local por infracción a la ordenanza.',
        'Frente a peligro inminente en verano, se puede interponer Recurso de Protección por riesgo a la vida (Art. 19 N° 1 Constitución).'
      ],
      contacto: 'Emergencias SENAPRED: 1407 | Juzgado de Policía Local comunal'
    },
    agua: {
      title: 'Secado de esteros, pozos de APR o desvío de cauce',
      organismo: 'DGA (Dirección General de Aguas) & SMA',
      leyes: 'Código de Aguas (Ley N° 21.435 que prioriza el consumo humano) · Art. 17 Ley 20.283',
      pasos: [
        'Individualiza el estero, vertiente o pozo afectado (nombre local y coordenadas).',
        'Ingresa denuncia de fiscalización en dga.mop.gob.cl por extracción ilegal o alteración de cauce.',
        'La Ley 20.283 prohíbe cortar nativo a menos de 500m de manantiales y en quebradas.',
        'Comité de APR puede exigir al MOP decreto de escasez hídrica para garantizar camiones aljibe y pozos de emergencia.'
      ],
      contacto: 'DGA Denuncias: dga.mop.gob.cl | Fono MOP: 600 450 4000'
    },
    quemas: {
      title: 'Quemas no autorizadas o riesgo de incendio',
      organismo: 'CONAF (130), Carabineros (133), Bomberos (132)',
      leyes: 'D.S. N° 276/1980 (Reglamento de uso del fuego) · Código Penal Art. 476 y 477',
      pasos: [
        'Si hay humo o quema activa: llama a Carabineros (133) y CONAF (130) para verificar si cuenta con aviso formal.',
        'Si no tiene comprobante de aviso emitido por CONAF, Carabineros debe detener las faenas y derivar a Fiscalía.',
        'Si el fuego se descontrola: evacúa hacia zona segura y llama a Bomberos (132).',
        'Causar incendio forestal es delito penado con presidio de hasta 20 años.'
      ],
      contacto: 'CONAF: 130 | Bomberos: 132 | Carabineros: 133'
    },
    celulosa: {
      title: 'Plantas de Celulosa, Olores y RILes',
      organismo: 'Superintendencia del Medio Ambiente (SMA) & 3er Tribunal Ambiental',
      leyes: 'Ley N° 19.300 sobre Bases Generales del Medio Ambiente · Ley N° 20.417',
      pasos: [
        'Anota fecha, hora exacta, dirección del viento y síntomas (olor a huevo podrido/gases reducidos).',
        'Ingresa denuncia ciudadana en el portal SNIFA: snifa.sma.gob.cl con tu ClaveÚnica.',
        'Pide a la SMA medidas urgentes de inspección en las descargas y chimeneas de la planta.',
        'Si la SMA no actúa en plazo legal, se puede apelar ante el Tercer Tribunal Ambiental de Valdivia.'
      ],
      contacto: 'SMA SNIFA: snifa.sma.gob.cl | 3er Tribunal Ambiental: 3tribunalambiental.cl'
    },
    delitos: {
      title: 'Delitos Ambientales Graves (Ley 21.595)',
      organismo: 'Ministerio Público (Fiscalía de Chile) & PDI BIDEMA (134)',
      leyes: 'Ley N° 21.595 de Delitos Económicos y Ambientales (2023)',
      pasos: [
        'Aplica ante daño grave a humedales, cursos de agua o vertido intencional de sustancias tóxicas.',
        'Presenta denuncia en la Fiscalía Local o querella criminal con abogado patrocinante.',
        'Pide expresamente peritaje de la Brigada de Delitos Medioambientales de la PDI (BIDEMA).',
        'La ley contempla penas de cárcel efectiva para gerentes y multas directas a las corporaciones.'
      ],
      contacto: 'Fiscalía: fiscaliadechile.cl | PDI BIDEMA: 134 | ONG FIMA: fima.cl'
    }
  };

  function getComplaintTemplate(tipo, lugar) {
    const today = new Date().toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
    return `MINUTA FORMAL DE DENUNCIA AMBIENTAL Y FORESTAL
Red por la Superación del Modelo Forestal · Centro-Sur de Chile

FECHA: ${today}
A: SEÑOR(A) DIRECTOR(A) REGIONAL DE CONAF / SUPERINTENDENCIA DEL MEDIO AMBIENTE

I. ANTECEDENTES DEL DENUNCIANTE
Nombre / Organización: [Tu nombre u "Organización Vecinal / Reserva de Identidad"]
Comuna y Región: ${lugar || '[Comuna, Región]'}
Correo de contacto: [Tu correo]

II. LUGAR Y HECHOS DENUNCIADOS
Ubicación / Sector: ${lugar || '[Indicar sector, quebrada o coordenadas GPS]'}
Materia denunciada: ${tipo || 'Corta no autorizada de bosque nativo'}
Descripción: En el sector señalado se constatan faenas que infringen la legislación vigente, provocando daño severo a la cobertura vegetal nativa y/o cuenca hídrica comunitaria.

III. FUNDAMENTO JURÍDICO
- Ley N° 20.283 sobre Recuperación del Bosque Nativo (Art. 5, 17 y 21).
- Dictamen N° 6.524 de la Contraloría General de la República (prohibición de sustitución de bosque nativo).
- Código de Aguas Ley N° 21.435 (prioridad de uso para consumo humano).

IV. PETICIÓN
Solicito inspección en terreno urgente por inspectores facultados, paralización cautelar de faenas y remisión de los antecedentes al tribunal respectivo.`;
  }

  function createChatWidgetDOM() {
    const root = document.createElement('div');
    root.id = 'juridico-bot-root';
    root.innerHTML = `
      <!-- Botón Flotante Launcher -->
      <button id="chatLauncherBtn" class="chat-launcher-btn" aria-label="Abrir Asistente Jurídico Ambiental">
        <span class="chat-launcher-icon">⚖️</span>
        <div class="chat-launcher-text">
          <span class="chat-launcher-title">Asistente Jurídico</span>
          <span class="chat-launcher-sub">Denuncias & Leyes</span>
        </div>
        <span class="chat-launcher-dot"></span>
      </button>

      <!-- Ventana de Chat Flotante -->
      <div id="chatModalWindow" class="chat-modal-window" role="dialog" aria-hidden="true" aria-labelledby="chatTitle">
        <!-- Cabecera -->
        <div class="chat-window-header">
          <div class="chat-header-user">
            <div class="chat-avatar">🌱</div>
            <div class="chat-header-info">
              <h4 id="chatTitle">Asistente Jurídico Forestal</h4>
              <span class="chat-header-status">Leyes de Chile · En línea</span>
            </div>
          </div>
          <button id="chatCloseBtn" class="chat-close-btn" aria-label="Cerrar chat">✕</button>
        </div>

        <!-- Hilo de Mensajes -->
        <div id="chatMessagesThread" class="chat-messages-thread">
          <!-- Mensaje Inicial de Bienvenida -->
          <div class="chat-msg bot">
            <div class="chat-bubble">
              ¡Hola! Soy el <strong>Asistente Jurídico de la Red</strong>.
              <br><br>
              Te oriento sobre las <strong>leyes chilenas</strong> (Ley 20.283 de Bosque Nativo, Código de Aguas, DFL 458) y los pasos para denunciar abusos forestales ante <strong>CONAF, DGA, SMA o Fiscalía</strong>.
              <br><br>
              <strong>¿Qué situación necesitas revisar?</strong>
              <div class="chat-chips-grid">
                <button class="chat-chip-btn" data-topic="tala">🌲 Tala ilegal de bosque nativo</button>
                <button class="chat-chip-btn" data-topic="cortafuegos">🔥 Pinos pegados a casas / Cortafuegos</button>
                <button class="chat-chip-btn" data-topic="agua">💧 Secado de estero o pozo de APR</button>
                <button class="chat-chip-btn" data-topic="quemas">💨 Quemas no autorizadas y humo</button>
                <button class="chat-chip-btn" data-topic="celulosa">🏭 Celulosa, olores y Riles</button>
                <button class="chat-chip-btn" data-topic="delitos">⚖️ Delitos Ambientales (Ley 21.595)</button>
                <button class="chat-chip-btn" data-topic="minuta">📝 Redactar Minuta de Denuncia</button>
              </div>
            </div>
            <span class="chat-time">Ahora</span>
          </div>
        </div>

        <!-- Input Bar -->
        <div class="chat-input-bar">
          <input type="text" id="chatInputText" placeholder="Escribe tu consulta o hecho..." aria-label="Consulta legal ambiental">
          <button id="chatSendBtn" class="chat-send-btn" aria-label="Enviar consulta">➤</button>
        </div>
      </div>
    `;

    document.body.appendChild(root);
  }

  function initChatLogic() {
    const launcher = document.getElementById('chatLauncherBtn');
    const modal = document.getElementById('chatModalWindow');
    const closeBtn = document.getElementById('chatCloseBtn');
    const thread = document.getElementById('chatMessagesThread');
    const input = document.getElementById('chatInputText');
    const sendBtn = document.getElementById('chatSendBtn');

    function toggleChat() {
      const isHidden = modal.getAttribute('aria-hidden') === 'true';
      modal.setAttribute('aria-hidden', !isHidden);
      modal.classList.toggle('open', isHidden);
      if (isHidden && input) {
        setTimeout(() => input.focus(), 300);
      }
    }

    if (launcher) launcher.addEventListener('click', toggleChat);
    if (closeBtn) closeBtn.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('open');
    });

    function appendUserMessage(text) {
      const msg = document.createElement('div');
      msg.className = 'chat-msg user';
      msg.innerHTML = `
        <div class="chat-bubble">${escapeHtml(text)}</div>
        <span class="chat-time">Tú</span>
      `;
      thread.appendChild(msg);
      thread.scrollTop = thread.scrollHeight;
    }

    function appendBotMessage(html) {
      const msg = document.createElement('div');
      msg.className = 'chat-msg bot';
      msg.innerHTML = `
        <div class="chat-bubble">${html}</div>
        <span class="chat-time">Asistente</span>
      `;
      thread.appendChild(msg);
      thread.scrollTop = thread.scrollHeight;

      // Asignar eventos a botones generados dentro de la burbuja
      msg.querySelectorAll('.chat-chip-btn').forEach(btn => {
        btn.addEventListener('click', () => handleTopicClick(btn.dataset.topic));
      });
      msg.querySelectorAll('.btn-copy-draft').forEach(btn => {
        btn.addEventListener('click', function () {
          const textarea = this.closest('.chat-draft-preview')?.querySelector('textarea');
          if (textarea) {
            navigator.clipboard.writeText(textarea.value).then(() => {
              const orig = this.innerText;
              this.innerText = '✅ ¡Copiado!';
              setTimeout(() => { this.innerText = orig; }, 2000);
            });
          }
        });
      });
    }

    function escapeHtml(str) {
      return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag));
    }

    function handleTopicClick(topicKey) {
      if (topicKey === 'minuta') {
        appendUserMessage('Quiero generar una Minuta de Denuncia formal');
        setTimeout(() => {
          const draft = getComplaintTemplate('Corta no autorizada de bosque nativo', '');
          const html = `
            <strong>📝 Minuta Formal Ciudadana:</strong>
            <p style="margin:6px 0 8px;font-size:0.8rem;color:#A9BDB2;">Puedes copiar este texto, completar tus datos y enviarlo a <strong>CONAF (conaf.cl)</strong> o a la <strong>SMA (snifa.sma.gob.cl)</strong>:</p>
            <div class="chat-draft-preview">
              <textarea rows="7" class="chat-draft-textarea">${draft}</textarea>
              <button class="chat-action-btn btn-copy-draft">📋 Copiar Minuta al Portapapeles</button>
            </div>
          `;
          appendBotMessage(html);
        }, 300);
        return;
      }

      const data = TOPICS[topicKey];
      if (!data) return;

      appendUserMessage(data.title);
      setTimeout(() => {
        const pasosHtml = data.pasos.map((p, i) => `<li><strong>${i + 1}.</strong> ${p}</li>`).join('');
        const html = `
          <strong>${data.title}</strong>
          <div class="chat-structured-card">
            <div class="card-item-row">
              <span class="card-item-tag">🏛️ ORGANISMO COMPETENTE:</span>
              ${data.organismo}
            </div>
            <div class="card-item-row">
              <span class="card-item-tag">📜 LEYES APLICABLES:</span>
              ${data.leyes}
            </div>
            <div class="card-item-row">
              <span class="card-item-tag">📋 PROCEDIMIENTO PASO A PASO:</span>
              <ul style="padding-left:16px;margin:4px 0;line-height:1.4;">${pasosHtml}</ul>
            </div>
            <div class="card-item-row" style="margin-bottom:0;">
              <span class="card-item-tag">📞 CANAL DIRECTO:</span>
              ${data.contacto}
            </div>
          </div>
          <button class="chat-action-btn" onclick="window.generateTopicDraft('${topicKey}')">
            📝 Generar Minuta de Denuncia para este caso
          </button>
        `;
        appendBotMessage(html);
      }, 350);
    }

    window.generateTopicDraft = function (topicKey) {
      const data = TOPICS[topicKey] || { title: 'Infracción Ambiental Forestal' };
      const draft = getComplaintTemplate(data.title, '');
      const html = `
        <strong>📝 Minuta de Denuncia: ${data.title}</strong>
        <div class="chat-draft-preview">
          <textarea rows="7" class="chat-draft-textarea">${draft}</textarea>
          <button class="chat-action-btn btn-copy-draft">📋 Copiar Minuta al Portapapeles</button>
        </div>
      `;
      appendBotMessage(html);
    };

    function processUserInput() {
      const q = input.value.trim();
      if (!q) return;

      appendUserMessage(q);
      input.value = '';

      const lower = q.toLowerCase();
      let matchedKey = null;

      if (lower.includes('tala') || lower.includes('corta') || lower.includes('nativo') || lower.includes('motosierra')) matchedKey = 'tala';
      else if (lower.includes('cortafuego') || lower.includes('casa') || lower.includes('distancia') || lower.includes('vecin')) matchedKey = 'cortafuegos';
      else if (lower.includes('agua') || lower.includes('pozo') || lower.includes('estero') || lower.includes('vertiente') || lower.includes('apr') || lower.includes('rio')) matchedKey = 'agua';
      else if (lower.includes('quema') || lower.includes('humo') || lower.includes('fuego') || lower.includes('incendio')) matchedKey = 'quemas';
      else if (lower.includes('celulosa') || lower.includes('olor') || lower.includes('ril') || lower.includes('arauco') || lower.includes('cmpc')) matchedKey = 'celulosa';
      else if (lower.includes('delito') || lower.includes('ley 21595') || lower.includes('fiscalia') || lower.includes('carcel')) matchedKey = 'delitos';
      else if (lower.includes('minuta') || lower.includes('plantilla') || lower.includes('carta') || lower.includes('modelo')) matchedKey = 'minuta';

      setTimeout(() => {
        if (matchedKey) {
          handleTopicClick(matchedKey);
        } else {
          appendBotMessage(`
            No reconozco exactamente el término, pero puedo orientarte en los temas más frecuentes:
            <div class="chat-chips-grid">
              <button class="chat-chip-btn" data-topic="tala">🌲 Tala de bosque nativo</button>
              <button class="chat-chip-btn" data-topic="cortafuegos">🔥 Pinos pegados a casas</button>
              <button class="chat-chip-btn" data-topic="agua">💧 Secado de esteros o pozos</button>
              <button class="chat-chip-btn" data-topic="quemas">💨 Quemas e incendios</button>
              <button class="chat-chip-btn" data-topic="minuta">📝 Redactar Minuta de Denuncia</button>
            </div>
          `);
        }
      }, 400);
    }

    if (sendBtn) sendBtn.addEventListener('click', processUserInput);
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          processUserInput();
        }
      });
    }

    // Eventos iniciales de chips en el mensaje de bienvenida
    thread.querySelectorAll('.chat-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => handleTopicClick(btn.dataset.topic));
    });

    // Exponer API global
    window.openJuridicoBot = function (topicKey) {
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('open');
      if (topicKey) {
        handleTopicClick(topicKey);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createChatWidgetDOM();
      initChatLogic();
    });
  } else {
    createChatWidgetDOM();
    initChatLogic();
  }
})();
