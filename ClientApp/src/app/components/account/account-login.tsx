import React, { Component } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import CSS from 'csstype';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../state/app/account/actions';


class AccountLogin extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount = async () => {
        
    };

    loaded = () => {

    };

    login = (event: any) => {
        const form = event.currentTarget;
        this.props.login(this.props.formData);
        event.preventDefault();
    };

    set = (data: any) => {
        const formData = {
            ...this.props.formData,
            [data.name]: data.value
        }
        this.props.set(formData);
    };

    render() {
        return (
            <Form onSubmit={this.login}>
                <Form.Group controlId="formLogin">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="emailAddress" type="email" placeholder="Enter email" onChange={(event: any) => {this.set.call(this, event.target)}}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" onChange={(event: any) => {this.set.call(this, event.target)}}/>
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {};
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actions, dispatch)
)(AccountLogin);