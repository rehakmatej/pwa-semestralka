import React, { Component } from 'react';
import './App.css';
import 'react-chat-elements/dist/main.css';
import { Container, Row, Col } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from 'reactstrap';


class App extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="App">
        <Navbar dark style={{ backgroundColor: '#1a248f' }} expand="md">
          <NavbarBrand style={{ color: 'white' }} href="/">PWA Semestrálka</NavbarBrand>
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
            {
              !isAuthenticated() && (
                  <Button
                    style={{ color: 'white', backgroundColor: '#1a248f' }}
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>                 
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    style={{ color: 'white', backgroundColor: '#1a248f' }}
                    bsStyle="primary"
                    className="btn-Margin"
                    onClick={this.goTo.bind(this, 'profile')}
                  >
                    Profil
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    style={{ color: 'white', backgroundColor: '#1a248f' }}
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'discuss')}
                  >
                    Diskuse
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    style={{ color: 'white', backgroundColor: '#1a248f' }}
                    id="qsLogoutBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Odhlásit
                  </Button>
                )
            }
            </Nav>
          </Collapse>
        </Navbar>

        
      </div>
    );
  }
}

export default App;
