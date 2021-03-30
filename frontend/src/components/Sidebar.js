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
            activeItemId: props.activeItemId
        };
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
        </nav>
      );
    }
  }

export default withRouter(Sidebar);