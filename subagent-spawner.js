const fs = require(fs);
const { execSync } = require(child_process);

class SubAgentSpawner {
  constructor() {
    this.agents = new Map();
  }

  spawn(agentType, task) {
    const agentId = agentType + - + Date.now();
    const containerName = atlas- + agentId;
    const agentWorkspace = /tmp/agents/ + agentId;
    fs.mkdirSync(agentWorkspace, { recursive: true });
    fs.writeFileSync(agentWorkspace + /task.json, JSON.stringify(task));
    const cmd = docker run -d --name  + containerName +  --network host -v  + agentWorkspace + :/app/task  + agentType + -agent:latest;
    const containerId = execSync(cmd).toString().trim();
    this.agents.set(agentId, { type: agentType, containerId, containerName, status: running, task: task.name, started: new Date().toISOString() });
    return { success: true, agentId, containerId };
  }

  getStatus() {
    const status = [];
    this.agents.forEach((agent, id) => { status.push({ id, ...agent }); });
    return status;
  }
}

module.exports = SubAgentSpawner;
