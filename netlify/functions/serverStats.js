// Proxies Crafty Controller's server stats so the API token stays server-side.
// Only the fields the page shows are passed through.
exports.handler = async function () {
  const { CRAFTY_URL, CRAFTY_SERVER_ID, CRAFTY_TOKEN } = process.env;

  if (!CRAFTY_URL || !CRAFTY_SERVER_ID || !CRAFTY_TOKEN) {
    return reply(500, { error: "Set CRAFTY_URL, CRAFTY_SERVER_ID and CRAFTY_TOKEN" });
  }

  const apiUrl = `${CRAFTY_URL.replace(/\/+$/, "")}/api/v2/servers/${encodeURIComponent(CRAFTY_SERVER_ID)}/stats`;

  try {
    const response = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${CRAFTY_TOKEN}` }
    });
    if (!response.ok) {
      console.error(`Crafty returned ${response.status}: ${await response.text()}`);
      return reply(502, { error: "Could not reach the server panel" });
    }
    const json = await response.json();
    const data = json.data || {};
    return reply(200, {
      status: json.status,
      data: { running: Boolean(data.running), version: data.version || null }
    });
  } catch (error) {
    console.error(error);
    return reply(502, { error: "Could not reach the server panel" });
  }
};

function reply(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
}
