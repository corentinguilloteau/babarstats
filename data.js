const axios = require("axios");
const global = require("./global");

module.exports = {
	loadData: function (app) {
		//Erreur de chargement des données
		app.set("ready", 1);
		console.log("Updating data...");

		return axios
			.get("https://babar.rezel.net/api/payment/?format=json")
			.then(function (response) {
				app.set("payments", response.data);

				return axios
					.get("https://babar.rezel.net/api/customer/?format=json")
					.then(function (response) {
						app.set("customers", response.data);

						return axios
							.get(
								"https://babar.rezel.net/api/status/?format=json"
							)
							.then(function (response) {
								app.set("status", response.data);

								return axios
									.get(
										"https://babar.rezel.net/api/product/?format=json"
									)
									.then(function (response) {
										app.set("products", response.data);

										return axios
											.get(
												"https://babar.rezel.net/api/purchase/?format=json"
											)
											.then(function (response) {
												app.set(
													"purchases",
													response.data
												);
												app.set("ready", 0);
												var date = new Date();
												app.set(
													"latest_update",
													global.formatDate(date)
												);
												console.log("Data is ready !");
											})
											.catch(function (error) {
												//Erreur de chargement des données
												app.set("ready", 2);
												console.log(error);
											});
									})
									.catch(function (error) {
										//Erreur de chargement des données
										app.set("ready", 2);
										console.log(error);
									});
							})
							.catch(function (error) {
								//Erreur de chargement des données
								app.set("ready", 2);
								console.log(error);
							});
					})
					.catch(function (error) {
						//Erreur de chargement des données
						app.set("ready", 2);
						console.log(error);
					});
			})
			.catch(function (error) {
				//Erreur de chargement des données
				app.set("ready", 2);
				console.log(error);
			});
	},
};
