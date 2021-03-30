import React from "react";
import TimeSerieCard from './TimeSerieCard';
import InformationCard from './InformationCard';
import '../css/App.css';

class Power extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            powerData: [],
            devicePower: []
        };
    }

    updateDevicesPower()
    {
        fetch("/api/devices/", {headers : 
            { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
            .then((res) => {return res.json()})
            .then(
              (result) => {

                result.forEach(sensor =>
                {
                    var _id = sensor._id;
                    fetch("/api/power/" + _id, {headers : 
                        { 
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                         }
                      })
                        .then((res) => {return res.json()})
                        .then(
                          (result) => {
                            console.log(result)
                            this.setState(prevState => {
                                let devicePower = Object.assign([], prevState.devicePower);
                                if(result.length > 0)
                                  devicePower[_id] = {id: _id, name: sensor.name, power: result[0].power}
                                return {devicePower}
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
                })
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
        this.updateDevicesPower();
      }

    render() {
        console.log(this.state.powerData)
      return (
        <div className="container-fluid">
            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                    <h3>{'Power'}</h3>
                </div>
            </div>
            <div className="row">
                <TimeSerieCard name="Puissance totale consommée" seriename="Power" valuekey={"power"} params={{serieName: "Puissance", yName: "Puissance (en W)"}} baseURL={"/api/"}/>
            </div>
            <div className="row">
                {
                    Object.values(this.state.devicePower).map((data) => 
                        <InformationCard key={data.id} name={data.name} value={data.power + "W"} icon="bolt" color="yellow" url={"/devices/" + data.id} />
                    )
                }  
            </div>      
        </div>
      );
    }
  }

export default Power;