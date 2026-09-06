import fs from 'fs';

async function run() {
  const listRes = await fetch('http://127.0.0.1:9222/json');
  const targets = await listRes.json();
  const page = targets.find((t) => t.type === 'page' && t.url.includes('/builder'));

  if (!page) {
    console.error('Builder page target not found');
    process.exit(1);
  }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

  await new Promise((resolve) => (ws.onopen = resolve));

  const evalInPage = async (fnString) => {
    const res = await send('Runtime.evaluate', {
      expression: `(${fnString})()`,
      returnByValue: true,
      awaitPromise: true,
    });
    return res.result ? res.result.value : null;
  };

  const getProfileTop = async () => {
    return evalInPage(`() => {
      const p = document.getElementById("panel-profile");
      const w = document.getElementById("panel-work");
      return {
        profileTop: p ? p.getBoundingClientRect().top : null,
        workTop: w ? w.getBoundingClientRect().top : null,
        scrollTop: document.getElementById("studio-preview-viewport") ? document.getElementById("studio-preview-viewport").scrollTop : null
      };
    }`);
  };

  // Set desktop viewport
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await new Promise((r) => setTimeout(r, 500));

  console.log('1. INITIAL ALIGNMENT:');
  const initial = await getProfileTop();
  console.log(initial);

  console.log('2. EXPAND PROJECTS (+ 5 more projects):');
  const clickProjects = await evalInPage(`() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const b = btns.find(el => el.textContent && el.textContent.includes("5 more projects"));
    if (b) {
      b.click();
      return 'clicked 5 more projects';
    }
    return '5 more projects not found';
  }`);
  console.log('Click Projects:', clickProjects);
  await new Promise((r) => setTimeout(r, 400));
  const afterProjects = await getProfileTop();
  console.log('After Projects:', afterProjects);

  console.log('3. EXPAND EXPERIENCES (+ 3 earlier roles):');
  const clickRoles = await evalInPage(`() => {
    const btns = Array.from(document.querySelectorAll("button"));
    const b = btns.find(el => el.textContent && el.textContent.includes("earlier roles"));
    if (b) {
      b.click();
      return 'clicked earlier roles';
    }
    return 'earlier roles not found';
  }`);
  console.log('Click Roles:', clickRoles);
  await new Promise((r) => setTimeout(r, 400));
  const afterRoles = await getProfileTop();
  console.log('After Roles:', afterRoles);

  // Take screenshot
  const scr = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('/home/ayasyinsanaulia/.gemini/antigravity/brain/5235ad5a-04c6-4c9f-9b1c-478a75329852/fix_profile_anchor_expanded.png', Buffer.from(scr.data, 'base64'));
  console.log('Saved screenshot to fix_profile_anchor_expanded.png');

  // Verify
  const shiftProjects = afterProjects.profileTop - initial.profileTop;
  const shiftRoles = afterRoles.profileTop - initial.profileTop;
  console.log(`Profile Top Shift on Projects: ${shiftProjects}px`);
  console.log(`Profile Top Shift on Roles: ${shiftRoles}px`);

  ws.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
