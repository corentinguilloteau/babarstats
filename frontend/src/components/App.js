import '../css/App.css';
import Dashboard from './Dashboard';
import Users from './Users';
import React from "react";
import User from './User';
import Drinks from './Drinks';
import Drink from './Drink';
import Loading from './Loading';
import LoadError from './LoadError';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getRightPage()
    {   
        if(this.props.serverStatus === -1)
        {
            return(<Loading text={"Chargement"}></Loading>);
        }
        if(this.props.serverStatus === "0")
        {
            return(<Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/clients' component={Users} />
                <Route exact path='/products' component={Drinks} />
                <Route path='/clients/:id' component={User} />
                <Route path='/products/:id' component={Drink} />
              </Switch>);
        }
        else if(this.props.serverStatus === "1")
            return(<Loading text={"Mise à jour en cours. Veuillez patienter"}></Loading>);
        else
            return(<LoadError></LoadError>);
    }

    render() {
      return (
          <div className="content">
              {this.getRightPage()}
          </div>
      );
    }
  }

export default App;
