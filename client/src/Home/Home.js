import React, { Component } from 'react';

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                Jste přihlášen.
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                Nejte přihlášen
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
