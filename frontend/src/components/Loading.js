import '../css/App.css';
import React from "react";

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
          <div className="loadingContainer">
            <h2>
                <i className={"fas fa-fw fa-sync-alt fa-spin"}></i>
                <span className="align-middle"> {this.props.text}</span>
            </h2>
          </div>
      );
    }
  }

export default Loading;
