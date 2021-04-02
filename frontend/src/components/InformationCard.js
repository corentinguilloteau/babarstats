import React from "react";
import "../css/Card.css";
import { connect } from "react-redux";

class InformationCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: "",
			loaded: false,
		};
	}

	getValue() {
		this.setState({
			loaded: false,
		});
		fetch(this.props.apiURL, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/plain-text",
			},
		})
			.then((res) => {
				return res.text();
			})
			.then(
				(result) => {
					this.setState({
						value: result,
						loaded: true,
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {}
			);
	}

	componentDidMount() {
		this.getValue();
	}

	componentDidUpdate(prevProps) {
		if (this.props.updateEvent !== prevProps.updateEvent) {
			this.getValue();
		}
	}

	render() {
		return (
			<div
				name={this.props.name}
				className="col-12 col-sm-6 col-xxl-3 d-flex">
				<div className="card">
					<div className="card-body py-4">
						{!this.state.loaded && (
							<div className="spinner-container">
								<div
									className="spinner-border text-primary"
									role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						)}
						{this.state.loaded && (
							<div className="media">
								<div className="media-body">
									<h3 className="mb-2">
										{(this.props.prefix || "") +
											this.state.value +
											(this.props.suffix || "")}
									</h3>
									<p className="mb-2">{this.props.name}</p>
								</div>
								<div className="icon-block ml-3">
									<div
										className={
											"round d-flex align-items-center justify-content-center " +
											this.props.color
										}>
										<i
											className={
												"fas fa-fw fa-" +
												this.props.icon
											}></i>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = function (state) {
	return {
		updateEvent: state.updateEvent,
	};
};

export default connect(mapStateToProps)(InformationCard);
