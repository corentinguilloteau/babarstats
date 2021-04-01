import React from "react";
import InformationCard from "./InformationCard";
import TableCard from "./TableCard";
import "../css/App.css";
import ProductPlotCard from './ProductPlotCard'

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
							"http://localhost:5000/api/purchases/money/today"
						}
						name="Ventes du jour"
						icon="euro-sign"
						color="green"
                        suffix=" €"
					/>
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
							"http://localhost:5000/api/purchases/count/yesterday"
						}
						name="Nombre de consos hier"
						icon="beer"
						color="yellow"
					/>
				</div>
				<div className="row">
                    <ProductPlotCard name="Historique des ventes" apiURL={
							"http://localhost:5000/api/purchases"
						}
                        bootstrapSubdiv={"col-12 col-sm-8 d-flex"}/>
					<TableCard
						bootstrapSubdiv="col-12 col-sm-4 d-flex"
						name="Dernières consos"
						apiURL={
							"http://localhost:5000/api/purchases/history"
						}
						pageSize={14}
						header={[
							{ name: "Surnom", apiKey: "customer" },
							{ name: "Produit", apiKey: "product" },
							{ name: "Date", apiKey: "date" },
						]}
					/>
				</div>
			</div>
		);
	}
}

export default Dashboard;
