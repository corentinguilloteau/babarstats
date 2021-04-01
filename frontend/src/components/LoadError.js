import '../css/App.css';
import React from "react";

class LoadError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
          <div className="loadingContainer">
            <h2>
                <i className={"fas fa-fw fa-exclamation-triangle"}></i>
                <span className="align-middle"> Une erreur c'est produite lors de la dernière mise à jour !</span>
            </h2>
          </div>
      );
    }
  }

export default LoadError;
