import React from "react";
import '../css/Card.css';
import { Link } from 'react-router-dom';

class InformationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
            <div name={this.props.name}  className="col-12 col-sm-6 col-xxl-3 d-flex">
                <div className="card clickable">
                    <Link className="no-link" to={this.props.url}>
                        <div className="card-body py-4">
                            <div className="media">                              
                                <div className="media-body">
                                    <h3 className="mb-2">{this.props.value}</h3>
                                    <p className="mb-2">{this.props.name}</p>
                                </div>
                                <div className="icon-block ml-3">
                                    <div className={"round d-flex align-items-center justify-content-center " + (this.props.color)}>
                                        <i className={"fas fa-fw fa-" + (this.props.icon)}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
      );
    }
  }

export default InformationCard;