import React from "react";
import InformationCard from "./InformationCard";
import TableCard from "./TableCard";
import "../css/App.css";
import HistoryPlotCard from "./HistoryPlotCard";

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
						apiURL={"/api/purchases/money/today"}
						name="Ventes du jour"
						icon="euro-sign"
						color="green"
						suffix=" €"
					/>
					<InformationCard
						apiURL={"/api/purchases/money/yesterday"}
						name="Ventes d'hier'"
						icon="euro-sign"
						color="green"
						suffix=" €"
					/>
					<InformationCard
						apiURL={"/api/purchases/money/week"}
						name="Ventes des 7 derniers jours"
						icon="euro-sign"
						color="green"
						suffix=" €"
					/>
					<InformationCard
						apiURL={"/api/purchases/count/today"}
						name="Nombre de consos aujourd'hui"
						icon="beer"
						color="yellow"
					/>
					<InformationCard
						apiURL={"/api/purchases/count/yesterday"}
						name="Nombre de consos hier"
						icon="beer"
						color="yellow"
					/>
					<InformationCard
						apiURL={"/api/purchases/count/week"}
						name="Nombre de consos ces 7 derniers jours"
						icon="beer"
						color="yellow"
					/>
				</div>
				<div className="row">
					<div className="col-12 col-sm-8 d-flex flex-column">
						<div className="col">
							<HistoryPlotCard
								name="Historique des ventes (en €)"
								apiURL={"/api/purchases_money"}
								bootstrapSubdiv={"col-12 d-flex"}
							/>
						</div>
						<div className="col">
							<HistoryPlotCard
								name="Historique des ventes (en nombre de consos)"
								apiURL={"/api/purchases"}
								bootstrapSubdiv={"col-12 d-flex"}
							/>
						</div>
					</div>

					<TableCard
						bootstrapSubdiv="col-12 col-sm-4 d-flex"
						name="Dernières consos"
						apiURL={"/api/purchases/history"}
						header={[
							{ name: "Surnom", apiKey: "customer", href: true },
							{ name: "Produit", apiKey: "product", href: true },
							{ name: "Date", apiKey: "date" },
						]}
					/>
				</div>
			</div>
		);
	}
}

export default Dashboard;
