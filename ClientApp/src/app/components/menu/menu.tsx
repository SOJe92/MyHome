import React, { Component } from 'react';
import { Button, Container, ListGroup, Modal, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../../state/app/menu/actions';
import { timeStamp } from 'console';

class Menu extends Component<any, any> {
    state = {
        count: 0
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount = async () => {
        await this.props.fetchMenus();
    };

    loaded = () => {

    };

    addMenu = (menuItem: any) => {
        debugger;
    };

    render() {
        var listGroupItems = [];
        for (var i = 0; i < this.props.menus; i++){
            listGroupItems.push(<ListGroup.Item action key={`MenuItem` + i}><Button>Delete Menu</Button></ListGroup.Item>)
        }
        return (
            <Container>
                <Button onClick={this.addMenu}>
                    Add Menu
                </Button>
                <ListGroup>
                    {listGroupItems}
                </ListGroup>
                <Modal>
                    
                </Modal>
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => {
    debugger;
    return {
        menus: state.app.app.menu.items,
    };
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actions, dispatch)
)(Menu);