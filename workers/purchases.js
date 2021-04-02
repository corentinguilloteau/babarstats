const { parentPort, workerData } = require("worker_threads");

var purchases = workerData.purchases.filter(
	(p) => parseInt(p.timestamp.slice(0, 4)) > 2003
);

parentPort.postMessage(JSON.stringify(purchases));
