const { parentPort, workerData } = require('worker_threads');

var formattedPurchases = workerData.purchases.map(p => {
    var newP = {}

    customer = workerData.customers[parseInt(p.customer)];
    product = workerData.products[parseInt(p.product)];

    newP.customer = {value: customer.nickname, id: customer.pk, href: "/clients/" }
    newP.product = {value: product.name, id: product.pk, href: "/products/" }

    var timestamp = new Date(Date.parse(p.timestamp));
    
    var mm = timestamp.getMonth() + 1; // getMonth() is zero-based
    var dd = timestamp.getDate();
    var hh = timestamp.getHours();
    var MM = timestamp.getMinutes();

    var date = "Le " + (dd>9 ? '' : '0') + dd + "/" + (mm>9 ? '' : '0') + mm + "/" + timestamp.getFullYear() + " à " + (hh>9 ? '' : '0') + hh + "h" + (MM>9 ? '' : '0') + MM;

    newP.date = date;

    return newP;
});

parentPort.postMessage(JSON.stringify(formattedPurchases.reverse()));