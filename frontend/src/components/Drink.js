import React from "react";
import "../css/App.css";
import InformationCard from "./InformationCard";
import TableCard from './TableCard';
import ConsoPlotCard from './ConsoPlotCard'

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			surname: "",
		};
	}

	getName() {
		fetch(
			"http://localhost:5000/api/clients/" +
				this.props.match.params.id +
				"/profil",
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			}
		)
			.then((res) => {
				return res.json();
			})
			.then(
				(result) => {
					this.setState({
						surname: result.nickname,
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
                    console.log(error)
                }
			);
	}

	componentDidMount() {
		this.getName();
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row mb-2 mb-xl-3">
					<div className="col-auto d-none d-sm-block">
						<h3>{this.state.surname}</h3>
					</div>
				</div>
				<div className="row">
					<InformationCard
						apiURL={
							"http://localhost:5000/api/clients/" +
							this.props.match.params.id +
							"/spent"
						}
						suffix=" €"
						name="Prix"
						icon="euro-sign"
                        color="green"
					/>
					<InformationCard
						apiURL={
							"http://localhost:5000/api/clients/" +
							this.props.match.params.id +
							"/rank/promo"
						}
						name="Nombre vendu"
						icon="cash-register"
                        color="yellow"
					/>
				</div>
                <div className="row">
                    <ConsoPlotCard name="Historique des ventes" apiURL={
							"http://localhost:5000/api/clients/" +
							this.props.match.params.id +
							"/purchases"
						}/>
                </div>
                <div className="row">
                    <TableCard bootstrapSubdiv="col-12 col-sm-6" name="Historique des ventes" apiURL={ 'http://localhost:5000/api/clients/' +
							this.props.match.params.id + '/history'} pageSize={10} header={
                        [
                            { name: "Surnom", apiKey: "nickname" },
                            { name: "Date", apiKey: "datetime" }
                        ]
                    }/>
                    <TableCard bootstrapSubdiv="col-12 col-sm-6" name="Top consommateur" apiURL={ 'http://localhost:5000/api/clients/' +
							this.props.match.params.id + '/top_products'} pageSize={10} header={
                        [
                            { name: "Surnom", apiKey: "nickname" },
                            { name: "Quantité", apiKey: "quantity" }
                        ]
                    }/>
                </div>
			</div>
		);
	}
}

export default User;
