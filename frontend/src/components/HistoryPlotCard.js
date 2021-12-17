import React from "react";
import "../css/Card.css";
import moment from "moment";
import TimeSerieCard from "./TimeSerieCard";
import { connect } from "react-redux";

class HistoryPlotCard extends React.Component {
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
			name: "Moyenne glissante sur 15 jours",
			x: this.unpack(data, "x"),
			y: this.unpack(data, "y"),
			line: { shape: "spline", color: "rgb(219, 64, 82)" },
		};

		var hist_trace = {
			x: this.unpack(hist, "x"),
			y: this.unpack(hist, "y"),
			name: "Consommation journalières",
			yaxis: "y2",
			type: "bar",
			line: { color: "rgb(31, 119, 180)" },
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
				range: [
					0,
					Math.max.apply(
						Math,
						hist.map(function (o) {
							return o.y;
						})
					),
				],
				overlaying: "y2",
				title: "Moyenne glissante sur 15 jours",
			},
			yaxis2: {
				range: [
					0,
					Math.max.apply(
						Math,
						hist.map(function (o) {
							return o.y;
						})
					),
				],
				title: "Consos journalières",

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

		var sub_total = 0;

		var current_date = moment(rawData[0].timestamp);

		for (var i = 0; i < rawData.length; i++) {
			var item = rawData[i];

			var date = moment(item.timestamp);
			date.subtract(6, "hours");

			if (date.dayOfYear() !== current_date.dayOfYear() || date.year() !== current_date.year()) {
				hist.push({
					x: current_date.format("YYYY-MM-DD") + " 00:00:00",
					y: sub_total,
				});
				current_date = date;
				sub_total = 0;
				sub_total += parseFloat(item.value);
			} else {
				sub_total += parseFloat(item.value);
			}
		}

		hist.push({
			x: current_date.format("YYYY-MM-DD") + " 00:00:00",
			y: sub_total,
		});

		if (hist.length >= 2) {
			var avg = 0;
			var now = moment(new Date());

			if (moment(hist[hist.length - 1].x).isAfter(moment(hist[0].x).add(15, " days"))) {
				console.log(1);
				var next_to_add = 0;
				var next_to_delete = 0;
				var begin_date = moment(hist[0].x);
				var curent_date = moment(hist[0].x).add(7, "days");
				var end_date = moment(hist[0].x);

				if (hist.length >= 15) {
					for (var i = 0; i < 14; i++) {
						if (moment(hist[next_to_add].x).isSame(end_date, "day")) {
							avg += hist[next_to_add].y;
							next_to_add++;
						}

						end_date.add(1, "days");
					}
				}

				while (!now.isSame(end_date, "day")) {
					if (moment(hist[next_to_add].x).isSame(end_date, "day")) {
						avg += hist[next_to_add].y;
						next_to_add++;
					}

					end_date.add(1, "days");

					data.push({
						x: curent_date.format("YYYY-MM-DD HH:mm:ss"),
						y: avg / 15,
					});

					curent_date.add(1, "days");

					if (moment(hist[next_to_delete].x).isSame(begin_date, "day")) {
						avg -= hist[next_to_delete].y;
						next_to_delete++;
					}

					begin_date.add(1, "days");
				}
			}
		}

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

export default connect(mapStateToProps)(HistoryPlotCard);
