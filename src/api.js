async function request(self, path, body) {
  const base = String(self.config.baseUrl || "http://127.0.0.1:8080").replace(/\/$/, "");
  const res = await fetch(`${base}${path}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data && data.error ? data.error : `Desk returned ${res.status}`;
    throw new Error(message);
  }
  return data;
}

async function getDesk(self) {
  return request(self, "/api/desk");
}

async function sendCommand(self, command) {
  return request(self, "/api/desk", { op: "command", command });
}

module.exports = { getDesk, sendCommand };
