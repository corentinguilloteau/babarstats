import React from "react";
import "../css/Card.css";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { connect } from "react-redux";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

class TableCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			rowData: [],
		};
	}

	getData() {
		this.setState({
			loaded: false,
		});
		fetch(this.props.apiURL, {
			method: "GET",
			crossDomain: true,
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				return res.json();
			})
			.then(
				(result) => {
					this.setState({
						loaded: true,
						rowData: result,
					});
				},
				(error) => {
					this.setState({
						loaded: false,
						rowData: [],
					});
					console.log(error);
				}
			);
	}

	componentDidMount() {
		this.getData();
	}

	componentDidUpdate(prevProps) {
		if (this.props.updateEvent !== prevProps.updateEvent) {
			this.getData();
		}
	}

	buttonCellRenderer(params) {
		return (
			'<a class="btn btn-primary" href="' +
			this.props.baseURL +
			params.value +
			'" role="button">' +
			this.props.buttonText +
			"</a>"
		);
	}

	linkCellRender(params) {
		return '<a href="' + params.value.href + params.value.id + '/">' + params.value.value + "</a>";
	}

	autosizeColumnsIfNeeded(params) {
		let availableWidth = params.api.gridPanel.eBodyViewport.clientWidth;
		let columns = params.api["gridPanel"]["columnController"].getAllDisplayedColumns();
		let usedWidth = params.api["gridPanel"]["columnController"].getWidthOfColsInList(columns);

		if (usedWidth < availableWidth) {
			params.api.sizeColumnsToFit();
		}
	}

	onGridReady(params) {
		this.autosizeColumnsIfNeeded(params);
		window.onresize = () => {
			this.autosizeColumnsIfNeeded(params);
		};

		if (this.props.defaultSort) {
			params.columnApi.applyColumnState({
				state: [
					{
						colId: this.props.defaultSort.col,
						sort: this.props.defaultSort.sort,
					},
				],
				defaultState: { sort: null },
			});
		}
	}

	getColumn(h) {
		if (h.href) {
			return (
				<AgGridColumn
					headerName={h.name}
					field={h.apiKey}
					sortable={this.props.sort || false}
					filter={this.props.filter || false}
					floatingFilter={this.props.floatingFilter || false}
					cellRenderer={this.linkCellRender.bind(this)}></AgGridColumn>
			);
		} else {
			return (
				<AgGridColumn
					headerName={h.name}
					field={h.apiKey}
					sortable={this.props.sort || false}
					filter={this.props.filter || false}
					floatingFilter={this.props.floatingFilter || false}></AgGridColumn>
			);
		}
	}

	render() {
		return (
			<div className={"d-flex" + this.props.bootstrapSubdiv}>
				<div className="card">
					<div className="card-header">
						<h5 className="car-title mt-2"> {this.props.name} </h5>
					</div>
					{!this.state.loaded && (
						<div className="card-body py-4">
							<div className="spinner-container">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						</div>
					)}
					{this.state.loaded && (
						<div className="card-body py-2 d-flex" style={{ "min-height": "180vh" }}>
							<div className="col ag-theme-material">
								<AgGridReact
									rowData={this.state.rowData}
									onGridReady={this.onGridReady.bind(this)}
									pagination={true}
									paginationAutoPageSize={this.props.pageSize ? false : true}
									paginationPageSize={this.props.pageSize}
									suppressCellSelection={true}
									style={{
										"min-width": "100%",
										height: "100%",
									}}
									fullWidthCellRenderer={"fullWidthCellRenderer"}>
									{this.props.header.map((h) => this.getColumn(h))}
									{this.props.buttonText && (
										<AgGridColumn
											headerName=""
											field={this.props.idField}
											cellRenderer={this.buttonCellRenderer.bind(this)}></AgGridColumn>
									)}
								</AgGridReact>
							</div>
						</div>
					)}
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

export default connect(mapStateToProps)(TableCard);
