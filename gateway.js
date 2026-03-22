const http = require('http');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('/root/.openclaw/openclaw.json', 'utf8'));
const PORT = config.gateway.port || 18789;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.url === '/health') {
    res.end(JSON.stringify({
      ok: true,
      status: 'live',
      agent: 'atlas',
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/status') {
    res.end(JSON.stringify({
      status: 'ok',
      agent: 'atlas',
      workspace: config.agents.defaults.workspace,
      ready: true,
      tailscale_ip: '100.69.58.56'
    }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Atlas gateway running on port ${PORT}`);
});
