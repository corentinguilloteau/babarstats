import React from "react";
import '../css/Card.css';

class InformationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    getValue() {
        fetch(this.props.apiURL, {headers : 
          { 
            'Content-Type': 'application/json',
            'Accept': 'application/plain-text'
           }
        }).then(
            
            (result) => {
              this.setState({
                value: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            }
          )
      }

      componentDidMount() {
          this.getValue();
      }

    render() {
      return (
            <div name={this.props.name}  className="col-12 col-sm-6 col-xxl-3 d-flex">
                <div className="card">
                    <div className="card-body py-4">
                        <div className="media">                              
                            <div className="media-body">
                                <h3 className="mb-2">{this.props.prefix + this.state.value + this.props.suffix}</h3>
                            </div>
                            <div className="icon-block ml-3">
                                <div className={"round d-flex align-items-center justify-content-center " + (this.props.color)}>
                                    <i className={"fas fa-fw fa-" + (this.props.icon)}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      );
    }
  }

export default InformationCard;