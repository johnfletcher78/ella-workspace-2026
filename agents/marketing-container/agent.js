const fs = require("fs");
console.log("Marketing Agent starting");
const task = JSON.parse(fs.readFileSync("/app/task/task.json", "utf8"));
console.log("Marketing task:", task.name);
fs.writeFileSync("/app/task/result.json", JSON.stringify({status: "complete", agent: "marketing", timestamp: new Date().toISOString()}));
console.log("Done");
