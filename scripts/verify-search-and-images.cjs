const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9229',
  '--disable-gpu',
  '--no-sandbox',
  'file:///C:/Users/delgi/Documents/entregavel-fisio-pocket/index.html'
]);

setTimeout(async () => {
  try {
    const listRes = await fetch('http://127.0.0.1:9229/json/list');
    const tabs = await listRes.json();
    const pageTab = tabs.find(t => t.url.includes('index.html'));
    console.log('Target Page Tab:', pageTab?.url);

    if (pageTab?.webSocketDebuggerUrl) {
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

      const sendCommand = (method, params = {}) => {
        return new Promise((resolve) => {
          const id = Math.floor(Math.random() * 1000000);
          const handler = (evt) => {
            const data = JSON.parse(evt.data);
            if (data.id === id) {
              ws.removeEventListener('message', handler);
              resolve(data.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id, method, params }));
        });
      };

      ws.onopen = async () => {
        await sendCommand('Runtime.enable');
        await sendCommand('Log.enable');

        const setReactInput = async (val) => {
          await sendCommand('Runtime.evaluate', {
            expression: `(() => {
              const input = document.querySelector("input[placeholder*='Buscar']");
              const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
              nativeSetter.call(input, ${JSON.stringify(val)});
              input.dispatchEvent(new Event('input', { bubbles: true }));
            })()`
          });
          await new Promise(r => setTimeout(r, 400));
        };

        // Test 1: "ventilacao" (accent-less search)
        await setReactInput("ventilacao");
        const resVent = await sendCommand('Runtime.evaluate', {
          expression: '(() => { const cards = Array.from(document.querySelectorAll("div.grid > div")); return { count: cards.length, titles: cards.map(c => c.querySelector("h3")?.innerText) }; })()',
          returnByValue: true
        });
        console.log('Search "ventilacao" results:', resVent.result?.value);

        // Test 2: "lca"
        await setReactInput("lca");
        const resLca = await sendCommand('Runtime.evaluate', {
          expression: '(() => { const cards = Array.from(document.querySelectorAll("div.grid > div")); return { count: cards.length, titles: cards.map(c => c.querySelector("h3")?.innerText) }; })()',
          returnByValue: true
        });
        console.log('Search "lca" results:', resLca.result?.value);

        // Test 3: Number "#31"
        await setReactInput("#31");
        const resNum = await sendCommand('Runtime.evaluate', {
          expression: '(() => { const cards = Array.from(document.querySelectorAll("div.grid > div")); return { count: cards.length, titles: cards.map(c => c.querySelector("h3")?.innerText) }; })()',
          returnByValue: true
        });
        console.log('Search "#31" results:', resNum.result?.value);

        // Test 4: "lote 01"
        await setReactInput("lote 01");
        const resLot = await sendCommand('Runtime.evaluate', {
          expression: '(() => { const cards = Array.from(document.querySelectorAll("div.grid > div")); return { count: cards.length, titles: cards.map(c => c.querySelector("h3")?.innerText) }; })()',
          returnByValue: true
        });
        console.log('Search "lote 01" results:', resLot.result?.value);

        // Test 5: Clinical synonym "avc" (should find AVE)
        await setReactInput("avc");
        const resAvc = await sendCommand('Runtime.evaluate', {
          expression: '(() => { const cards = Array.from(document.querySelectorAll("div.grid > div")); return { count: cards.length, titles: cards.map(c => c.querySelector("h3")?.innerText) }; })()',
          returnByValue: true
        });
        console.log('Search "avc" (synonym) results:', resAvc.result?.value);

        ws.close();
        chrome.kill();
        process.exit(0);
      };
    }
  } catch (e) {
    console.error(e);
    chrome.kill();
    process.exit(1);
  }
}, 2000);
