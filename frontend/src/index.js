import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./components/App";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login"
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading  from "./components/Loading"

class PrivateRoute extends React.Component {

    constructor(props) {
		super(props);

		this.state = {
			auth: false,
            validated: false
		};
	}
  
    componentDidMount(){
        this.setState({ validated: false});
        fetch("/dummy", {
          method: "POST"
        })
        .then((res) => {
          this.setState({ auth: res.ok,validated: true });
          console.log(res.ok)
        })
        .catch((err) => {
            this.setState({ auth: false,validated: true });
        }) 
    }
    
    render ()
    {
        if(!this.state.validated)
            return <Loading></Loading>

        if(this.state.auth)
        {
            return (<Route {... this.props.rest} >
                {this.props.children}
            </Route>)
        }
        else
        {
            return (<Route {... this.props.rest} >
                <Redirect to="/login" />
            </Route>)
        }
        
    }
}
class Main extends React.Component {
	updateTimer = null;

	constructor(props) {
		super(props);

		this.state = {
			isSidebarCollapsed: false,
			serverStatus: -1,
		};

		this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
	}

	reducer(state = { updateEvent: true }, action) {
		switch (action.type) {
			case "UPDATE":
				console.log();
				return { updateEvent: !state.updateEvent };
			default:
				return {
					updateEvent: state.updateEvent,
				};
		}
	}

	store = createStore(this.reducer);

	handleSidebarToggle(e) {
		this.setState((state) => ({
			isSidebarCollapsed: !state.isSidebarCollapsed,
		}));
	}

	getStatus(updating = false) {
		return fetch("/api/status")
			.then((res) => {
				return res.text();
			})
			.then(
				(result) => {
					this.setState((prevState, props) => ({
						serverStatus: result,
					}));
					if (result === "0" && updating) {
						this.store.dispatch({ type: "UPDATE" });
					}

					if (result === "1") {
						this.updateTimer = setTimeout(
							() => this.getStatus(updating),
							5000
						);
					}
				},
				(error) => {
					console.log(error);
				}
			);
	}

	componentDidMount() {
		this.getStatus();
	}

	componentWillUnmount() {
		clearTimeout(this.updateTimer);
	}

	render() {
		const isSidebarCollapsed = this.state.isSidebarCollapsed;
		return (
			<BrowserRouter>
				<React.StrictMode>
					<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<PrivateRoute path="/">
							<Provider store={this.store}>
								<Sidebar
									collapsed={isSidebarCollapsed}
									items={[
										{
											id: 0,
											name: "Tableau de bord",
											icon: "home",
											link: "/",
										},
										{
											id: 1,
											name: "Clients",
											icon: "users",
											link: "/clients",
										},
										{
											id: 2,
											name: "Produits",
											icon: "beer",
											link: "/products",
										},
									]}
									activeItemId={0}
									serverStatus={this.state.serverStatus}
									updateCb={this.getStatus.bind(this)}
								/>
								<div className="main">
									<nav className="navbar">
										<div className="sidebar-toggle">
											<i
												className="fas fa-fw fa-bars hamburger"
												onClick={
													this.handleSidebarToggle
												}></i>
										</div>
									</nav>
									<App
										serverStatus={this.state.serverStatus}
									/>
								</div>
							</Provider>
						</PrivateRoute>
					</Switch>
				</React.StrictMode>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<Main title="Dashboard" />, document.getElementById("wrapper"));
