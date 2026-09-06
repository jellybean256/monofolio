import fs from 'fs';

async function run() {
  const listRes = await fetch('http://127.0.0.1:9222/json');
  const targets = await listRes.json();
  const page = targets.find((t) => t.type === 'page' && t.url.includes('/builder'));

  if (!page) {
    console.error('Page target not found');
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
    return res.result.value;
  };

  const takeScreenshot = async (filepath) => {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${filepath}`);
  };

  // 1. Switch to Tablet Viewport
  const tabletRes = await evalInPage(`() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('Tablet'));
    if (btn) {
      btn.click();
      return 'clicked tablet';
    }
    return 'tablet not found';
  }`);
  console.log('Tablet:', tabletRes);
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('/home/ayasyinsanaulia/.gemini/antigravity/brain/5235ad5a-04c6-4c9f-9b1c-478a75329852/studio_step4_tablet_preview.png');

  // 2. Open Publish Modal
  const pubRes = await evalInPage(`() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('Publish'));
    if (btn) {
      btn.click();
      return 'clicked publish';
    }
    return 'publish not found';
  }`);
  console.log('Publish:', pubRes);
  await new Promise((r) => setTimeout(r, 600));
  await takeScreenshot('/home/ayasyinsanaulia/.gemini/antigravity/brain/5235ad5a-04c6-4c9f-9b1c-478a75329852/studio_step5_publish_modal.png');

  ws.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
