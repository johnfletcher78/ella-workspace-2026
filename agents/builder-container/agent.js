const fs = require("fs");
console.log("Builder Agent starting");
const task = JSON.parse(fs.readFileSync("/app/task/task.json", "utf8"));
console.log("Building:", task.name);
fs.writeFileSync("/app/task/result.json", JSON.stringify({status: "complete", agent: "builder", timestamp: new Date().toISOString()}));
console.log("Done");
