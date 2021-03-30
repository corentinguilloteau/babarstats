import React from "react";
import '../css/Card.css';
import Chart from "react-apexcharts";

class TimeSerieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            options: {
                chart: {
                    type: 'area',
                    stacked: false
                  },
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shadeIntensity: 1,
                      inverseColors: false,
                      opacityFrom: 0.5,
                      opacityTo: 0,
                      stops: [0, 90, 100]
                    }
                  },
                  yaxis: {
                    title: {
                      text: this.props.params.yName
                    },
                    type: 'numeric'
                  },
                  xaxis: {
                    title: {
                      text: this.props.params.xName
                    },
                    type: 'datetime'
                  },
                  dataLabels:{
                    enabled: false
                  },
                  markers: {
                    size: 0
                  }
            },
            data: [] 
        };
    }

    componentDidMount()
    {
      fetch(this.props.baseURL + this.props.valuekey, {headers : 
        { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
        .then((res) => {return res.json()})
        .then(
          (result) => {
            this.setState({
              data: result.map(Object.values)
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
            console.log(error);
          }
        )
    }

    render() {
      return (
            <div name={this.props.name}  className="col d-flex">
                <div className="card">
                    <div className="card-header">
                        <h5 className="car-title mt-2">{this.props.name}</h5>
                    </div>
                    <div className="card-body py-2">
                        <div className="chart w-100">
                        <Chart
                            className="plot" options={this.state.options}
                            series={[{
                              name: this.props.params.serieName,
                              data: this.state.data
                            }]}
                            type="area"
                            height="100%"
                        />
                        </div>
                    </div>
                </div>
            </div>
      );
    }
  }

export default TimeSerieCard;