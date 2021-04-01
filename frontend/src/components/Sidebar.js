import React from "react";
import '../css/Sidebar.css';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { withRouter } from "react-router";


class Sidebar extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      }

    constructor(props) {
        super(props);
        this.state = {
            activeItemId: props.activeItemId,
            latestUpdate: "00/00/00"
        };
    }

    getLatestUpdate() {
        fetch("http://localhost:5000/api/update", {headers : 
          { 
            'Content-Type': 'application/json',
            'Accept': 'application/plain-text'
           }
        }).then((res) => { return res.text(); })
        .then(
            
            (result) => {
              this.setState({
                latestUpdate: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            }
          )
      }

      update()
      {
        fetch("http://localhost:5000/api/update", { method: "POST" });
      }

      componentDidMount() {
          this.getLatestUpdate();
      }

    render() {
      return (
        <nav id="sidebar" className={'sidebar ' + (this.props.collapsed ? 'collapsed' : '')} >
                <div className="sidebar-top"></div>
                <ul className="sidebar-nav">
                    {
                        this.props.items.map((item) =>
                            <li key={item.id} className={"sidebar-item " + ((item.link === this.props.location.pathname) ? 'active' : '') }>
                                <Link to={item.link} className="sidebar-link">
                                    <i className={"fas fa-fw fa-" + item.icon}></i>
                                    <span className="align-middle">{item.name}</span>
                                </Link>
                            </li>
                        )
                    }
                </ul>
                <div className="sidebar-footer">
                        <div className="sidebar-footer-item">Dernière mise à jour le <br/> {this.props.serverStatus === "0" ? this.state.latestUpdate : "N/C"}</div>
                        <div className="sidebar-footer-item clickable" onClick={this.update}>
                            Mettre à jour
                        </div>
                        <br/>
                        <div className="sidebar-footer-item">v1.0 - Pour le Baritech</div>
                        <br/>
                </div>
        </nav>
      );
    }
  }

export default withRouter(Sidebar);