import React from "react";
import "../css/Card.css";
import { Link } from "react-router-dom";

import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

class TableCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			rowData: [],
		};
	}

	componentDidMount() {
		fetch(this.props.apiURL, {
			method: "GET",
			crossDomain: true,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		})
			.then((res) => {
				console.log(res);
				return res.json();
			})
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						rowData: result,
					});
				},
				(error) => {
					this.setState({
						isLoaded: true,
						rowData: [],
					});
					console.log(error);
				}
			);
	}

	buttonCellRenderer(params) {
		return (
			'<a class="btn btn-primary" href="' + this.props.baseURL + params.value + '" role="button">' +
			this.props.buttonText +
			'</a>'
		);
	}

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
        window.onresize = () => {
            this.gridApi.sizeColumnsToFit();
        }
    }

	render() {
		console.log(this.state.rowData);
		return (
			<div className="col d-flex">
				<div className="card">
					<div className="card-header">
						<h5 className="car-title mt-2"> {this.props.name} </h5>
					</div>
					<div className="card-body py-2">
						<div
							className="ag-theme-material">
							<AgGridReact
								rowData={this.state.rowData}
                                onGridReady={this.onGridReady}
								pagination={true}
								paginationPageSize={30}
                                domLayout={'autoHeight'}
                                style={{ width: '100%', height: '100%;' }}
                                fullWidthCellRenderer={'fullWidthCellRenderer'}>
								{this.props.header.map((h) => (
									<AgGridColumn
										headerName={h.name}
										field={h.apiKey}
										sortable={true}
										filter={true}></AgGridColumn>
								))}
								{this.props.buttonText && (
									<AgGridColumn
										headerName=""
										field={this.props.idField}
										cellRenderer={this.buttonCellRenderer.bind(
											this
										)}></AgGridColumn>
								)}
							</AgGridReact>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TableCard;
