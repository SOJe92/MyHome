import React, { Component } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import CSS from 'csstype';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../state/app/account/actions';


class AccountRegister extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount = async () => {
        
    };

    loaded = () => {

    };

    register = (event: any) => {
        const form = event.currentTarget;
        this.props.register(this.props.formData);
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
            <Form onSubmit={this.register}>
                <Form.Group controlId="formRegister">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" placeholder="Enter First Name" onChange={(event: any) => {this.set.call(this, event.target)}}/>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" placeholder="Enter Last Name" onChange={(event: any) => {this.set.call(this, event.target)}}/>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="emailAddress" type="email" placeholder="Enter email" onChange={(event: any) => {this.set.call(this, event.target)}}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
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
    return {
        formData: state.app.app.user.data,
    };
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actions, dispatch)
)(AccountRegister);