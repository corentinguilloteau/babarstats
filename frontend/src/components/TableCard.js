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
			loaded: false,
			rowData: [],
		};
	}

	componentDidMount() {
        this.setState({
            loaded: false
        });
		fetch(this.props.apiURL, {
			method: "GET",
			crossDomain: true,
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				console.log(res);
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

	buttonCellRenderer(params) {
		return (
			'<a class="btn btn-primary" href="' + this.props.baseURL + params.value + '" role="button">' +
			this.props.buttonText +
			'</a>'
		);
	}

    autosizeColumnsIfNeeded(params){
        console.log(params)
        let panel = params.api['gridPanel'];
        let availableWidth = params.api.gridPanel.eBodyViewport.clientWidth
        let columns = params.api['gridPanel']['columnController'].getAllDisplayedColumns();
        let usedWidth = params.api['gridPanel']['columnController'].getWidthOfColsInList(columns);

        if(usedWidth < availableWidth){
            params.api.sizeColumnsToFit();
        }
    }

    onGridReady(params) {
        this.autosizeColumnsIfNeeded(params);
        window.onresize = () => {
            this.autosizeColumnsIfNeeded(params);
        }
        
        if(this.props.defaultSort)
        {
            params.columnApi.applyColumnState({
                state: [
                  {
                    colId: this.props.defaultSort.col,
                    sort: this.props.defaultSort.sort
                  }
                ],
                defaultState: { sort: null }
              });
        }
    }

	render() {
		console.log(this.state.rowData);
		return (
			<div className={ "d-flex" + this.props.bootstrapSubdiv } >
				<div className="card">
					<div className="card-header">
						<h5 className="car-title mt-2"> {this.props.name} </h5>
					</div>
					<div className="card-body py-2">
                    {!this.state.loaded && (
							<div className="spinner-container"><div
								class="spinner-border text-primary"
								role="status">
								<span class="sr-only">Loading...</span>
							</div></div>
						)}
						{this.state.loaded && (<div
							className="ag-theme-material">
							<AgGridReact
								rowData={this.state.rowData}
                                onGridReady={this.onGridReady.bind(this)}
								pagination={true}
								paginationPageSize={this.props.pageSize || 30}
                                domLayout={'autoHeight'}
                                suppressCellSelection={true}
                                style={{ "min-width": '100%', height: '100%;' }}
                                fullWidthCellRenderer={'fullWidthCellRenderer'}>
								{this.props.header.map((h) => (
									<AgGridColumn
										headerName={h.name}
										field={h.apiKey}
										sortable={this.props.sort || false}
										filter={this.props.filter || false}
                                        floatingFilter={this.props.floatingFilter || false}></AgGridColumn>
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
						</div>)}
					</div>
				</div>
			</div>
		);
	}
}

export default TableCard;
