const http = require('http');
const fs = require('fs');

const API_KEY = process.env.OLLAMA_API_KEY || 'not-set';
const ATLAS_MODEL = process.env.ATLAS_MODEL || 'kimi-k2.5:cloud';
const SUB_MODEL = process.env.SUB_AGENT_MODEL || 'nemotron-3-super:cloud';

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.url === '/health') {
    res.end(JSON.stringify({
      ok: true,
      status: 'live',
      agent: 'atlas',
      model: ATLAS_MODEL,
      subAgentModel: SUB_MODEL,
      ollamaCloud: API_KEY !== 'not-set',
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/status') {
    res.end(JSON.stringify({
      status: 'ok',
      agent: 'atlas',
      role: 'orchestrator',
      primaryModel: ATLAS_MODEL,
      subAgentModels: [SUB_MODEL, 'claude-3-5-sonnet:cloud'],
      ready: true,
      cloudAuth: API_KEY !== 'not-set'
    }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(18789, '0.0.0.0', () => {
  console.log('Atlas running:');
  console.log('  Model:', ATLAS_MODEL);
  console.log('  Sub-agents:', SUB_MODEL);
  console.log('  Cloud:', API_KEY !== 'not-set' ? 'configured' : 'not configured');
});
