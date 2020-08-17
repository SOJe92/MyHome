import React, { Component } from 'react';
import { Form, Modal, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';

export default class ModalForm extends Component<any, any> {
    state = {
        formData: [],
        show: false,
    }
    constructor(props: any) {
        super(props);
    }

    componentDidMount = async () => {
    };

    loaded = () => {

    };

    cancel = () => {
        this.state.show = false;
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
            <Modal
                show={this.props.show ?? this.state.show}
                size={this.props.size ?? "lg"}
                centered={this.props.centered ?? true}
                onHide={this.cancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title ?? null}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {this.state.formData.map((input: any) => <Form.Group>
                            <Form.Label>{input.text}</Form.Label>
                            <Form.Control name={input.name} placeholder={input.placeholder} onChange={(event: any) => {this.props.set.call(this, event.target)}}/>

                        </Form.Group>)}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button variant="primary" onClick={this.props.primaryAction}>
                                {this.props.primaryButton}
                            </Button>
                            <Button variant="secondary" onClick={this.cancel}>
                                {this.props.secondaryButton}
                            </Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Modal.Footer>
            </Modal>
        );
    }
}