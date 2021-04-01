import React from "react";
import InformationCard from "./InformationCard";
import TableCard from "./TableCard";
import "../css/App.css";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row mb-2 mb-xl-3">
					<div className="col-auto d-none d-sm-block">
						<h3>Dashboard</h3>
					</div>
				</div>
				<div className="row">
					<InformationCard
						apiURL={
							"http://localhost:5000/api/purchases/count/today"
						}
						name="Nombre de consos aujourd'hui"
						icon="beer"
						color="yellow"
					/>
					<InformationCard
						apiURL={
							"http://localhost:5000/api/purchases/money/today"
						}
						name="Ventes du jour"
						icon="euro-sign"
						color="green"
					/>
				</div>
				<div className="row">
					{/*<PurchasesPlotCard name="Historique des achats" apiURL={
							"http://localhost:5000/api/purchases/all"
						}/>*/}
					<TableCard
						bootstrapSubdiv="col-sm-4 d-flex"
						name="Dernières consos"
						apiURL={
							"http://localhost:5000/api/clients/" +
							this.props.match.params.id +
							"/history"
						}
						pageSize={7}
						header={[
							{ name: "Surnom", apiKey: "nickname" },
							{ name: "Produit", apiKey: "product" },
							{ name: "Date", apiKey: "datetime" },
						]}
					/>
				</div>
			</div>
		);
	}
}

export default Dashboard;
