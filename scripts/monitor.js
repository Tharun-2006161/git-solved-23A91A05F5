/**
 * Unified System Monitoring Script
 * Supports both Production and Development environments
 * Version: 2.0
 */

const ENV = process.env.APP_ENV || "development";

const monitorConfig = {
  interval: ENV === "production" ? 60000 : 5000, // 1 min for prod, 5 sec for dev
  alertThreshold: ENV === "production" ? 80 : 90,
  metricsEndpoint:
    ENV === "production"
      ? "http://localhost:8080/metrics"
      : "http://localhost:3000/metrics",
  debugMode: ENV === "development",
  verboseLogging: ENV === "development",
};

console.log("=================================");
console.log(
  `DevOps Simulator - Monitor v2.0 (${ENV.toUpperCase()} MODE)`
);
console.log("=================================");

function checkSystemHealth() {
  const timestamp = new Date().toISOString();
  const { debugMode, verboseLogging, alertThreshold, interval } = monitorConfig;

  if (debugMode) {
    console.log(`\n[${timestamp}] === DETAILED HEALTH CHECK ===`);
  } else {
    console.log(`[${timestamp}] Checking system health...`);
  }

  // Simulate CPU, memory, and disk usage
  const cpuUsage = Math.random() * 100;
  const memUsage = Math.random() * 100;
  const diskUsage = Math.random() * 100;

  console.log(`✓ CPU usage: ${cpuUsage.toFixed(2)}%`);
  console.log(`✓ Memory usage: ${memUsage.toFixed(2)}%`);
  console.log(`✓ Disk space: ${diskUsage.toFixed(2)}% used`);

  if (debugMode) {
    console.log("✓ Hot reload: Active");
    console.log("✓ Debug port: 9229");
    console.log("✓ Source maps: Enabled");
  }

  const maxUsage = Math.max(cpuUsage, memUsage, diskUsage);

  if (maxUsage > alertThreshold) {
    console.log("⚠️  System Status: WARNING - High resource usage");
  } else {
    console.log("✅ System Status: HEALTHY");
  }

  if (verboseLogging) {
    console.log(`Next check in ${interval}ms`);
  }
}

// Start monitoring
console.log(`Monitoring every ${monitorConfig.interval}ms`);
if (monitorConfig.debugMode) {
  console.log("Debug features enabled");
}

// Run first check immediately
checkSystemHealth();
setInterval(checkSystemHealth, monitorConfig.interval);

// Optional: Memory usage logging (for dev only)
if (monitorConfig.debugMode) {
  setInterval(() => {
    const memUsage = process.memoryUsage();
    console.log("\n--- Memory Usage ---");
    console.log(`RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }, 30000);
}
