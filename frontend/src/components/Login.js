import "../css/App.css";
import React from "react";


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div class="main d-flex justify-content-center w-100">
				<main class="content d-flex p-0">
					<div class="container d-flex flex-column">
						<div class="row h-100">
							<div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
								<div class="d-table-cell align-middle">
									<div class="card">
										<div class="card-body">
											<div class="m-sm-4">
												<form action="/login" method="post">
													<div class="form-group">
														<label>Nom d'utilisateur</label>
														<input
															class="form-control form-control-lg"
															type="text"
															name="username"
															placeholder="Nom d'utilisateur"
														/>
													</div>
													<div class="form-group">
														<label>Mot de passe</label>
														<input
															class="form-control form-control-lg"
															type="password"
															name="password"
															placeholder="Mot de passe"
														/>
													</div>
													<div class="text-center mt-3">
														<button
															class="btn btn-lg btn-primary">
															Se connecter
														</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		);
	}
}

export default Login;
