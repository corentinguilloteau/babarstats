import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./components/App";
import Sidebar from "./components/Sidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";

class Main extends React.Component {

    updateTimer = null;

	constructor(props) {
		super(props);

		this.state = {
			isSidebarCollapsed: false,
            serverStatus: -1
		};

		this.handleSidebarToggle = this.handleSidebarToggle.bind(this);
	}

	handleSidebarToggle(e) {
		this.setState((state) => ({
			isSidebarCollapsed: !state.isSidebarCollapsed,
		}));
	}

    getStatus() {
		fetch(
			"http://localhost:5000/api/status" )
			.then((res) => {
				return res.text();
			})
			.then(
				(result) => {
                    console.log("get status")
					this.setState({
						serverStatus: result,
					});
                    if(result === "1")
                    {
                        this.updateTimer = setTimeout(() => this.getStatus(), 5000)
                    }
				},
				(error) => {
                    console.log(error)
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
                        updateCb={this.getStatus}
					/>
					<div className="main">
						<nav className="navbar">
							<div className="sidebar-toggle">
								<i
									className="fas fa-fw fa-bars hamburger"
									onClick={this.handleSidebarToggle}></i>
							</div>
						</nav>
						<App serverStatus={this.state.serverStatus} />
					</div>
				</React.StrictMode>
			</BrowserRouter>
		);
	}
}

ReactDOM.render(<Main title="Dashboard" />, document.getElementById("wrapper"));
