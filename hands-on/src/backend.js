const BACKEND_URL = "http://localhost:3000";
const SLOW_MODE = false;      // slow node on/off
const SLOW_DELAY_MS = 3000;  // delay in ms

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchJson(path) {
  const url = `${BACKEND_URL}${path}`;
  if (SLOW_MODE) {
    await delay(SLOW_DELAY_MS);
  }  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response from server not OK: ${response.status}`);
  }
  return await response.json();
}

export async function sendJson(method, path, payload = {}) {
  const url = `${BACKEND_URL}${path}`;

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Response from server not OK: ${response.status}`);
  }

  return await response.json();
}