import React from "react";
import "../css/Card.css";
import moment from "moment";
import TimeSerieCard from "./TimeSerieCard";
import { connect } from "react-redux";

class ConsoPlotCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			layout: {},
			loaded: false,
		};
	}

	getDate(date) {
		return moment(date).format("YYYY-MM-DD");
	}

	unpack(rows, key) {
		return rows.map(function (row) {
			return row[key];
		});
	}

	display(data, hist) {
		var trace = {
			type: "scatter",
			mode: "lines",
			name: "Cumul",
			x: this.unpack(data, "x"),
			y: this.unpack(data, "y"),
			line: { color: "#EF78B1" },
		};

		var hist_trace = {
			x: this.unpack(hist, "x"),
			y: this.unpack(hist, "y"),
			name: "Consommation journalières",
			yaxis: "y2",
			type: "bar",
		};

		var layout = {
			bargap: 0.1,
			bargroupgap: 0.2,
			showlegend: false,
			barmode: "overlay",
			xaxis: {
				autorange: true,
				range: [
					this.getDate(
						moment(data[data.length - 1].x)
							.subtract(1, "months")
							.format("YYYY-MM-DD")
					),
					this.getDate(data[data.length - 1].x),
				],
				rangeselector: {
					buttons: [
						{
							count: 1,
							label: "1 mois",
							step: "month",
							stepmode: "backward",
						},
						{
							count: 6,
							label: "6 mois",
							step: "month",
							stepmode: "backward",
						},
						{ step: "all", label: "Tout" },
					],
				},
				rangeslider: {
					range: [this.getDate(data[0].x), this.getDate(data[data.length - 1].x)],
				},
				type: "date",
			},
			yaxis: {
				title: "Consos cumulées",
				autorange: true,
				type: "linear",
				overlaying: "y2",
			},
			yaxis2: {
				title: "Consos journalières",
				titlefont: { color: "rgb(255, 127, 14)" },
				tickfont: { color: "rgb(255, 127, 14)" },
				side: "right",
			},
		};

		this.setState({
			layout: layout,
			data: [trace, hist_trace],
			loaded: true,
		});
	}

	processData(rawData) {
		var data = [];
		var hist = [];

		var total = 0;
		var sub_total = 0;

		var current_date = moment(rawData[0].timestamp);

		for (var item of rawData) {
			total++;

			data.push({
				x: moment(item.timestamp).format("YYYY-MM-DD HH:mm:ss"),
				y: total,
			});

			var date = moment(item.timestamp);
			date.subtract(6, "hours");

			if (date.dayOfYear() !== current_date.dayOfYear() || date.year() !== current_date.year()) {
				hist.push({
					x: current_date.format("YYYY-MM-DD") + " 00:00:00",
					y: sub_total,
				});
				current_date = date;
				sub_total = 0;
				sub_total++;
			} else {
				sub_total++;
			}
		}

		hist.push({
			x: current_date.format("YYYY-MM-DD") + " 00:00:00",
			y: sub_total,
		});

		this.display(data, hist);
	}

	fetchData() {
		this.setState({
			loaded: false,
		});
		fetch(this.props.apiURL, {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => {
				return res.json();
			})
			.then(
				(result) => {
					this.processData(result);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					console.log(error);
				}
			);
	}

	componentDidUpdate(prevProps) {
		if (this.props.updateEvent !== prevProps.updateEvent) {
			this.fetchData();
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<TimeSerieCard
				layout={this.state.layout}
				data={this.state.data}
				name={this.props.name}
				loaded={this.state.loaded}
			/>
		);
	}
}

const mapStateToProps = function (state) {
	return {
		updateEvent: state.updateEvent,
	};
};

export default connect(mapStateToProps)(ConsoPlotCard);
