class Global {
	static getRanks(payments, customers) {
		var result = [];

		for (var i = 0; i < customers.length; i++) {
			var customerTotalPayments = 0;
			var customer = customers[i];

			if (parseInt(customer.year) < 2021) continue;

			for (var j = 0; j < payments.length; j++) {
				if (payments[j].customer == customer.pk)
					customerTotalPayments += payments[j].amount * 100;
			}

			result.push({
				id: customer.pk,
				surname: customer.nickname,
				spent: parseFloat((
					(customerTotalPayments - parseInt(customer.balance * 100)) /
					100
				).toFixed(2)),
				year: customer.year,
				status: customer.status.name,
			});
		}

        result.sort(function(a, b){return b.spent - a.spent})

        return result;
	}

    static formatDate(date)
    {
        
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
        var hh = date.getHours();
        var MM = date.getMinutes();

        var date = '' + (dd>9 ? '' : '0') + dd + "/" + (mm>9 ? '' : '0') + mm + "/" + date.getFullYear() + " à " + (hh>9 ? '' : '0') + hh + "h" + (MM>9 ? '' : '0') + MM;

        return date;
    }
}

module.exports = Global;
