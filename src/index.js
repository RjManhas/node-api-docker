const express = require("express");
const os = require("os");
const app = express();

const port = process.env.PORT || 8080;

// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "Here's your response from the node.js 🐳 container",
    pid: process.pid,
    hostname: os.hostname(),
    ip: getLocalIP(),
  });
});

app.post("/test", (req, res) => {
  res.send({
    message: "Here's your response from test URL in the node.js 🐳 container",
    body: req.body || {},
    pid: process.pid,
    hostname: os.hostname(),
    ip: getLocalIP(),
  });
});

app.listen(port, () => {
  console.log(`Hi there, I'm listening on http://localhost:${port}`);
});

// Helper to get local IP
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "unknown";
}
