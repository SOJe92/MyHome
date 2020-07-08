import React, { Component } from 'react';
import { Container, Row, Col, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actions } from '../state/app/menu/actions'

class Main extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount = async () => {
        
    };

    loaded = () => {

    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                </Row>
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
)(Main);