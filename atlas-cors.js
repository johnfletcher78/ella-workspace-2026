const http = require('http');
const fs = require('fs');

const API_KEY = process.env.OLLAMA_API_KEY || 'not-set';
const ATLAS_MODEL = process.env.ATLAS_MODEL || 'kimi-k2.5:cloud';
const SUB_MODEL = process.env.SUB_AGENT_MODEL || 'nemotron-3-super:cloud';

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.url === '/health') {
    res.end(JSON.stringify({
      ok: true,
      status: 'live',
      agent: 'atlas',
      model: ATLAS_MODEL,
      subAgentModel: SUB_MODEL,
      ollamaCloud: !!API_KEY,
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/status') {
    res.end(JSON.stringify({
      status: 'ok',
      agent: 'atlas',
      role: 'orchestrator',
      primaryModel: ATLAS_MODEL,
      subAgentModels: [SUB_MODEL, 'claude-3-5-sonnet:cloud'],
      agents: [
        { name: 'designer', status: 'ready', emoji: '🎨' },
        { name: 'builder', status: 'ready', emoji: '🔨' },
        { name: 'marketing', status: 'ready', emoji: '📈' }
      ],
      ready: true,
      cloudAuth: API_KEY !== 'not-set'
    }));
  } else if (req.url === '/agents') {
    res.end(JSON.stringify({
      agents: [
        { id: 'designer', name: 'Designer', status: 'ready', capabilities: ['ui/ux', 'mockups', 'style-guides'] },
        { id: 'builder', name: 'Builder', status: 'ready', capabilities: ['code', 'deployment', 'technical'] },
        { id: 'marketing', name: 'Marketing', status: 'ready', capabilities: ['strategy', 'content', 'campaigns'] }
      ]
    }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found', endpoints: ['/health', '/status', '/agents'] }));
  }
});

server.listen(18789, '0.0.0.0', () => {
  console.log('Atlas CORS-enabled server running on port 18789');
});