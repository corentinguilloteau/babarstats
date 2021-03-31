import '../css/App.css';
import Users from './Users';
import React from "react";
import User from './User';
import Drinks from './Drinks';
//import Drink from './Drink';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
      return (
          <div className="content">
            <Switch>
              <Route exact path='/' component={Users} />
              <Route exact path='/clients' component={Users} />
              <Route exact path='/products' component={Drinks} />
              <Route path='/clients/:id' component={User} />
              
      {/*<Route exact path='/devices/:id' component={Drink} />*/}
            </Switch>
          </div>
      );
    }
  }

export default App;
