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
    return res.result ? res.result.value : null;
  };

  const takeScreenshot = async (filepath) => {
    const res = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filepath, Buffer.from(res.data, 'base64'));
    console.log(`Saved screenshot: ${filepath}`);
  };

  // Set viewport to 1440x900
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  // Step 1: Switch to Projects Tab and capture
  console.log('--- Step 1: Switch Tabs ---');
  await evalInPage(`() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(el => el.textContent && el.textContent.includes('Projects'));
    if (b) b.click();
  }`);
  await new Promise((r) => setTimeout(r, 400));
  await takeScreenshot('/home/ayasyinsanaulia/.gemini/antigravity/brain/5235ad5a-04c6-4c9f-9b1c-478a75329852/fix_step1_tab_projects.png');

  // Step 2: Switch to Writing Tab and check Article URL label (Issue 4)
  console.log('--- Step 2: Check Writing Tab ---');
  await evalInPage(`() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(el => el.textContent && el.textContent.includes('Writing'));
    if (b) b.click();
  }`);
  await new Promise((r) => setTimeout(r, 400));
  const writingLabel = await evalInPage(`() => {
    const labels = Array.from(document.querySelectorAll('label'));
    const l = labels.find(el => el.textContent && el.textContent.includes('Article URL'));
    return l ? l.textContent.trim() : 'not found';
  }`);
  console.log('Writing Label:', writingLabel);
  await takeScreenshot('/home/ayasyinsanaulia/.gemini/antigravity/brain/5235ad5a-04c6-4c9f-9b1c-478a75329852/fix_step2_writing_tab.png');

  // Step 3: Switch to Tablet Mode and check overflow (Issue 2 & 3)
  console.log('--- Step 3: Switch to Tablet Mode ---');
  await evalInPage(`() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(el => el.textContent && el.textContent.trim() === 'Tablet');
    if (b) b.click();
  }`);
  await new Promise((r) => setTimeout(r, 500));

  // Check panel-work computed style (must NOT be overflow-y: auto)
  const panelWorkStyle = await evalInPage(`() => {
    const panel = document.getElementById('panel-work');
    if (!panel) return 'no panel';
    const computed = window.getComputedStyle(panel);
    return {
      overflowY: computed.overflowY,
      maxHeight: computed.maxHeight,
      scrollHeight: panel.scrollHeight,
      clientHeight: panel.clientHeight
    };
  }`);
  console.log('Tablet panel-work style:', panelWorkStyle);
  await takeScreenshot('/home/ayasyinsanaulia/.gemini/antigravity/brain/5235ad5a-04c6-4c9f-9b1c-478a75329852/fix_step3_tablet_top.png');

  // Scroll preview pane down to verify full scrollability
  console.log('--- Step 4: Scroll Tablet Preview to Bottom ---');
  await evalInPage(`() => {
    const vp = document.getElementById('studio-preview-viewport');
    if (vp) {
      vp.scrollTop = 450;
    }
  }`);
  await new Promise((r) => setTimeout(r, 400));
  await takeScreenshot('/home/ayasyinsanaulia/.gemini/antigravity/brain/5235ad5a-04c6-4c9f-9b1c-478a75329852/fix_step4_tablet_scrolled.png');

  // Step 5: Switch to Mobile Mode
  console.log('--- Step 5: Switch to Mobile Mode ---');
  await evalInPage(`() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(el => el.textContent && el.textContent.trim() === 'Mobile');
    if (b) b.click();
  }`);
  await new Promise((r) => setTimeout(r, 500));

  const mobilePanelStyle = await evalInPage(`() => {
    const panel = document.getElementById('panel-work');
    if (!panel) return 'no panel';
    const computed = window.getComputedStyle(panel);
    return {
      overflowY: computed.overflowY,
      maxHeight: computed.maxHeight,
      scrollHeight: panel.scrollHeight,
      clientHeight: panel.clientHeight
    };
  }`);
  console.log('Mobile panel-work style:', mobilePanelStyle);
  await takeScreenshot('/home/ayasyinsanaulia/.gemini/antigravity/brain/5235ad5a-04c6-4c9f-9b1c-478a75329852/fix_step5_mobile_view.png');

  ws.close();
  console.log('--- Completed All Tests ---');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
