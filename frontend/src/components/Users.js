import React from "react";
import TableCard from './TableCard';
import '../css/App.css';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          users: []
        };
    }

    render() {
      return (
        <div className="container-fluid">
            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                    <h3>{'Clients'}</h3>
                </div>
            </div>
            <div className="row">
                <TableCard bootstrapSubdiv="col" name="Clients" apiURL='http://localhost:5000/api/clients' baseURL='/clients/' buttonText="Voir plus" idField="id" header={
                    [
                        { name: "Surnom", apiKey: "surname" },
                        { name: "Montant dépensé", apiKey: "spent" },
                        { name: "Promotion", apiKey: "year" },
                        { name: "Status", apiKey: "status" }
                    ]
                } floatingFilter={true} filter={true} sort={true}/>
            </div> 
        </div>
      );
    }
  }

export default Users;