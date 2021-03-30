import React from "react";
import TimeSerieCard from './TimeSerieCard';
import ControlCard from './ControlCard';
import InformationCard from './InformationCard';
import '../css/App.css';

class Room extends React.Component {
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
                    <h3>{'Room #' + this.props.match.params.id}</h3>
                </div>
            </div>
            <div className="row">
                <InformationCard name="Temperature" value="18°C" icon="thermometer-three-quarters" color="green" type="simpactuat" />
                <InformationCard name="Humidité" value="52%" icon="tint" color="blue"/>
                <InformationCard name="Gaz" value="Non détecté" icon="exclamation-triangle" color="red"/>
            </div>
            <div className="row">
                <ControlCard />
                <TimeSerieCard name="Mesures" />
            </div>      
        </div>
      );
    }
  }

export default Room;