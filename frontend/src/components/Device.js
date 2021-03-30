import React from "react";
import TableCard from './TableCard';
import '../css/App.css';

class Device extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoaded: false,
          sensors: [],
          device: { name: "" }
        };
    }

    getSensors() {
      fetch("/api/devices/" + this.props.match.params.id + '/sensors', {headers : 
        { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
        .then((res) => {return res.json()})
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              sensors: result
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

    getDevice()
    {
        fetch("/api/devices/" + this.props.match.params.id, {headers : 
            { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
            .then((res) => {return res.json()})
            .then(
              (result) => {
                  console.log(result)
                this.setState({
                  isLoaded: true,
                  device: result
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

    componentDidMount() {
        this.getSensors();
        this.getDevice();
    }

    render() {
      return (
        <div className="container-fluid">
            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                    <h3>{this.state.device.name}</h3>
                </div>
            </div>
            <div className="row">
                <TableCard name="Listes des capteurs" items={this.state.sensors} head={{}} baseUrl={'/devices/' + this.props.match.params.id + '/sensors/'}/>
            </div> 
        </div>
      );
    }
  }

export default Device;