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
                    <h3>{'Produits'}</h3>
                </div>
            </div>
            <div className="row">
                <TableCard name="Produits" apiURL='http://localhost:5000/api/products' baseURL='/products/' buttonText="Détails" idField="id" header={
                    [
                        { name: "Nom", apiKey: "name" },
                        { name: "Nombre vendu", apiKey: "count" },
                        { name: "Prix", apiKey: "price" }
                    ]
                }
                defaultSort={{ col: "count", sort: "desc" }} floatingFilter={true} filter={true} sort={true}/>
            </div> 
        </div>
      );
    }
  }

export default Users;