
const axios = require('axios')

module.exports = {
    loadData: function(app)
    {
        //Erreur de chargement des données
        app.set("ready", 1);
        console.log("Updating data...")

        return axios.get("https://babar.rezel.net/api/payment/?format=json")
        .then(function(response)
        {
            app.set("payments", response.data);
            

            return axios.get("https://babar.rezel.net/api/customer/?format=json")
            .then(function(response)
            {
            app.set("customers", response.data);

            return axios.get("https://babar.rezel.net/api/purchase/?format=json")
            .then(function(response)
            {
                app.set("purchases", response.data);
                app.set("ready", 0);
                console.log("Data is ready !")
            })
            .catch(function(error)
            {
                //Erreur de chargement des données
                app.set("ready", 2);
                console.log(error);
            })
            })
            .catch(function(error)
            {
            //Erreur de chargement des données
            app.set("ready", 2);
            console.log(error);
            })
        })
        .catch(function(error)
        {
            //Erreur de chargement des données
            app.set("ready", 2);
            console.log(error);
        }) 
    }
};