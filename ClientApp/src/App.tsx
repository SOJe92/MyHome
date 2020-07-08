import React, { Component } from 'react';
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Main from './app/components/main';
import About from './app/components/about';
import AccountOverview from './app/components/account/account-overview';
import Menu from './app/components/menu/menu';
import { actions } from './app/state/app/account/actions';

export class App extends Component<any, any> {
    render() {
        return (
            <Container fluid>
                <Container fluid>
                    <Row id="mainToolbar">
                        <Col>
                            <Navbar bg="dark" variant="dark">
                                <Navbar.Brand href="/">The Hub</Navbar.Brand>
                                <Nav className="mr-auto">
                                    <NavLink to="/">Home</NavLink>
                                    <NavLink to="/about">About</NavLink>
                                    <NavLink to="/account">Account</NavLink>
                                    <NavLink to="/menu">Menu</NavLink>
                                </Nav>
                                <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-info">Search</Button>
                                </Form>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
                <Switch>
                    <Route exact path='/' component={Main} />
                    <Route exact path='/about' component={About} />
                    <Route path='/account' component={AccountOverview} />
                    <Route path='/menu' component={Menu} />
                </Switch>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actions, dispatch)
)(App);