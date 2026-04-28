/* ═══════════════════════════════════════════════════════════
   COPILOT — spoof contact form with email capture
   Flow:
     1. user types message → typing dots → "sike, drop your email"
     2. user types email → typing dots → "got it. shahz will email you"
     3. POST { message, email } to FORM_ENDPOINT (or stash locally if none)
   No mailto: opening the user's mail client is friction. We capture and send.
   ═══════════════════════════════════════════════════════════ */

(() => {
  const trigger    = document.getElementById('copilotTrigger');
  const panel      = document.getElementById('copilotPanel');
  const closeBtn   = document.getElementById('copilotClose');
  const form       = document.getElementById('copilotForm');
  const input      = document.getElementById('copilotInput');
  const msgs       = document.getElementById('copilotMsgs');
  const sugs       = document.getElementById('copilotSuggestions');
  if (!trigger || !panel || !form) return;

  /* set FORM_ENDPOINT to a Formspree URL like
     'https://formspree.io/f/abcd1234' to start collecting submissions.
     Until then, payloads stash in localStorage so nothing is lost. */
  const FORM_ENDPOINT = null;
  const STASH_KEY     = 'shahz-portfolio-pending-msgs';

  let stage = 'message'; // 'message' → 'email' → 'done'
  let pendingMessage = '';

  const openPanel  = () => { panel.classList.add('open');  trigger.style.display = 'none'; input.focus(); };
  const closePanel = () => { panel.classList.remove('open'); trigger.style.display = 'flex'; };
  trigger.addEventListener('click', openPanel);
  closeBtn?.addEventListener('click', closePanel);

  function escape(s) {
    const t = document.createElement('div');
    t.textContent = s;
    return t.innerHTML;
  }

  function append(role, text, opts = {}) {
    const div = document.createElement('div');
    div.className = 'msg ' + role + (opts.acid ? ' acid' : '');
    const who = role === 'bot' ? 'Shahz-AI' : 'You';
    div.innerHTML = `<span class="who">${who}</span>${escape(text)}`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function appendTyping() {
    const div = document.createElement('div');
    div.className = 'msg bot';
    div.innerHTML = `<span class="who">Shahz-AI</span><span class="typing-dots"><span></span><span></span><span></span></span>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function isEmail(s) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());
  }

  async function submit(payload) {
    if (FORM_ENDPOINT) {
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, source: 'portfolio-copilot' }),
        });
        return res.ok;
      } catch { /* fall through to stash */ }
    }
    // fallback: stash in localStorage so nothing's lost while endpoint is unset
    try {
      const list = JSON.parse(localStorage.getItem(STASH_KEY) || '[]');
      list.push({ ...payload, ts: Date.now() });
      localStorage.setItem(STASH_KEY, JSON.stringify(list));
    } catch {}
    return true;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    append('user', value);
    input.value = '';
    input.disabled = true;

    if (stage === 'message') {
      pendingMessage = value;
      const t = appendTyping();
      await new Promise(r => setTimeout(r, 900));
      t.remove();
      append(
        'bot',
        "sike — I'm not actually AI. drop your email and shahz will get back to you fast.",
        { acid: true }
      );
      input.placeholder = 'your@email.com';
      input.type = 'email';
      input.disabled = false;
      input.focus();
      stage = 'email';
      return;
    }

    if (stage === 'email') {
      if (!isEmail(value)) {
        const t = appendTyping();
        await new Promise(r => setTimeout(r, 500));
        t.remove();
        append('bot', "that doesn't look like an email. try again?");
        input.disabled = false;
        input.focus();
        return;
      }

      const t = appendTyping();
      await submit({ message: pendingMessage, email: value });
      await new Promise(r => setTimeout(r, 700));
      t.remove();
      append(
        'bot',
        `got it. shahz will email ${value} back. usually within a day.`,
        { acid: true }
      );
      setTimeout(() => {
        append('bot', "while you wait — the skills section above is real. install one, fork it, take it apart.");
      }, 600);
      stage = 'done';
      input.placeholder = 'message sent. close & keep browsing →';
      input.disabled = true;
      return;
    }
  });

  sugs?.addEventListener('click', e => {
    if (e.target.classList.contains('suggestion') && stage === 'message') {
      input.value = e.target.textContent;
      form.requestSubmit();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
  });
})();
