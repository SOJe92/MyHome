import React, { Component } from 'react';
import { Form, Modal, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';

export default class ModalForm extends Component<any, any> {
    state = {
        formData: [],
    }
    constructor(props: any) {
        super(props);
    }

    componentDidMount = async () => {
    };

    loaded = () => {

    };

    cancel = () => {
        if(this.props.cancel) {
            this.props.cancel();
        }
    };

    render() {
        this.state.formData = this.props.formData.forEach((element:any) => {
            return (<Form.Group>
                    <Form.Label>{element.text}</Form.Label>
                    <Form.Control name={element.name} placeholder={element.placeholder} onChange={(event: any) => {this.props.set.call(this, event.target)}}/>
                </Form.Group>)
        }) ?? [];
        return (
            <Form>
                {this.state.formData.map((input: any) => <Form.Group>
                    <Form.Label>{input.text}</Form.Label>
                    <Form.Control name={input.name} placeholder={input.placeholder} onChange={(event: any) => {this.props.set.call(this, event.target)}}/>

                </Form.Group>)}
            </Form>
        );
    }
}