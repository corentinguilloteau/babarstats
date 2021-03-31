import React from "react";
import TimeSerieCard from "./TimeSerieCard";
import ControlCard from "./ControlCard";
import "../css/App.css";
import InformationCard from "./InformationCard";

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			surname: "",
		};
	}

	getName() {
		fetch(
			"http://localhost:5000/api/users/" +
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
					console.log(result);
					this.setState({
						surname: result.surname,
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {}
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
							"http://localhost:5000/api/users/" +
							this.props.match.params.id +
							"/spent"
						}
						suffix=" €"
						name="Montant dépensé"
						icon="euro-sign"
                        color="green"
					/>
					<InformationCard
						apiURL={
							"http://localhost:5000/api/users/" +
							this.props.match.params.id +
							"/rank/promo"
						}
						prefix="#"
						name="Classement promo"
						icon="medal"
                        color="yellow"
					/>
					<InformationCard
						apiURL={
							"http://localhost:5000/api/users/" +
							this.props.match.params.id +
							"/rank/total"
						}
						prefix="#"
						name="Classement général"
						icon="trophy"
                        color="yellow"
					/>
				</div>
			</div>
		);
	}
}

export default User;
