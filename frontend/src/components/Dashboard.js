import React from "react";
import InformationCard from './InformationCard';
import TimeSerieCard from './TimeSerieCard';
import '../css/App.css';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
        <div className="container-fluid">
            <div className="row mb-2 mb-xl-3">
                <div className="col-auto d-none d-sm-block">
                    <h3>Dashboard</h3>
                </div>
            </div>
            <div className="row">
                {/*§<InformationCard name="Temperature chambre" value="18°C" icon="thermometer-three-quarters" color="green" type="sensor" id="1"/>
                <InformationCard name="Lumière salon" value="Allumée" icon="lightbulb" color="yellow" type="sensor" id="2"/>*/}
            </div>          
        </div>
      );
    }
  }

export default Dashboard;