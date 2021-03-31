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
				spent: (
					(customerTotalPayments - parseInt(customer.balance * 100)) /
					100
				).toFixed(2),
				year: customer.year,
				status: customer.status.name,
			});
		}

        result.sort(function(a, b){return b.spent - a.spent})

        return result;
	}
}

module.exports = Global;
