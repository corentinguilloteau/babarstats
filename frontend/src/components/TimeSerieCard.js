import React from "react";
import "../css/Card.css";
import Plot from "react-plotly.js";

class TimeSerieCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			layout: {},
		};
	}

	render() {
		return (
			<div
				name={this.props.name}
				className={"d-flex" + this.props.bootstrapSubdiv}>
				<div className="card">
					<div className="card-header">
						<h5 className="car-title mt-2">{this.props.name}</h5>
					</div>

					{!this.props.loaded && (
						<div className="card-body py-4">
							<div className="spinner-container">
								<div
									className="spinner-border text-primary"
									role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						</div>
					)}
					{this.props.loaded && (
						<div className="card-body py-2">
							<Plot
								style={{
									height: "100%",
									minHeight: "40vw",
									width: "100%",
								}}
								data={this.props.data}
								layout={this.props.layout}
								config={{ responsive: true }}
							/>{" "}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default TimeSerieCard;
