import React, { Component } from 'react';
import { Button, Container, Image, Row, Col, Modal } from 'react-bootstrap';
import CSS from 'csstype';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import bg from '../../../images/Fist.jpg';
import { actions } from '../../state/app/account/actions';
import AccountRegister from './account-register';
import AccountLogin from './account-login';
import { debug } from 'console';


class AccountOverview extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    modalBackdrop: CSS.Properties = {
        backgroundImage: bg,
      };

    register = () => {
        this.props.hideOverview();
    };

    login = () => {
        this.props.hideOverview();
    };

    componentDidMount = async () => {
        if(this.props.match.isExact) {
            this.props.showOverview();
        }
    };

    loaded = () => {

    };

    render() {
        return (
        <Container fluid style={this.modalBackdrop}>
            <Row>
                <Col style={this.modalBackdrop}>
                    {/* <Image src={bg} rounded fluid/> */}
                    <Switch>
                        <Route exact path={`${this.props.match.path}/register`} component={AccountRegister} />
                        <Route exact path={`${this.props.match.path}/login`} component={AccountLogin} />
                    </Switch>
                    <Modal show={this.props.show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    onHide={this.props.hideOverview} >
                        <Modal.Header closeButton>
                            <Modal.Title>Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Click Register to create a new account or Log In if you already have one!
                        </Modal.Body>
                        <Modal.Footer>
                            <NavLink to={`${this.props.match.url}/register`}>
                                <Button variant="secondary" onClick={this.props.hideOverview}>
                                    Register
                                </Button>
                            </NavLink>
                            <NavLink to={`${this.props.match.url}/login`}>
                                <Button variant="primary" onClick={this.props.hideOverview}>
                                    Login
                                </Button>
                            </NavLink>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container>
        )
    }
};

const mapStateToProps = (state: any) => {
    return {
        show: state.app.app.account.show,
        user: state.app.app.user.current,
    };
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actions, dispatch)
)(AccountOverview);