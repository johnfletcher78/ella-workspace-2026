const fs = require("fs");
console.log("Designer Agent starting");
const task = JSON.parse(fs.readFileSync("/app/task/task.json", "utf8"));
console.log("Task:", task.name);
fs.writeFileSync("/app/task/result.json", JSON.stringify({
  status: "complete", 
  agent: "designer",
  timestamp: new Date().toISOString()
}));
console.log("Done");