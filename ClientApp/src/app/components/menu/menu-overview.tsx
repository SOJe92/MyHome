import React, { Component } from 'react';
import { Button, Container, ListGroup, } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import AppMenuActions from '../../state/app/menu/actions';
import EntitiesMenuActions from '../../state/entities/menu/actions';
import Form from '../../elements/form';

class MenuOverview extends Component<any, any> {
    

    constructor(props: any) {
        super(props);
    }

    componentWillMount = async () => {
        await this.props.fetchMenus();
        this.forceUpdate();
    };

    loaded = () => {

    };

    addMenu = () => {
        this.props.addMenu();
    };

    viewMenu = () => {

    };

    editMenu = () => {

    };

    deleteMenu = () => {

    };

    cancel = () => {
        this.props.hideMenu();
    }

    render() {
        var listGroupItems : any[] = [];
        for (var i = 0; i < this.props.menus.length; i++){
            listGroupItems.push(<ListGroup.Item onSelect={this.viewMenu.bind(this)} action key={`MenuItem` + i}>{this.props.menus[i].name}<Button onClick={this.editMenu.bind(this)} size='sm'>Edit Menu</Button><Button onClick={this.deleteMenu.bind(this)}>Delete Menu</Button></ListGroup.Item>)
        }
        const formData = [
            {
                text: "Meal"
            },
            {
                text: "Meal"
            },
        ]
        return (
            <Container>
                
                <NavLink to={`${this.props.match.url}/add`}>
                    <Button variant="primary" onClick={this.props.addMenu}>
                        Add Menu
                    </Button>
                </NavLink>
                <Switch>
                    <Route exact path={`${this.props.match.path}/add`} />
                    <Route exact path={`${this.props.match.path}/edit`} />
                    <Route exact path={`${this.props.match.path}`} render={(a) =>
                        <ListGroup>
                            {listGroupItems.map((d: any, e: any, f: any) => {
                                return d;
                            })}
                        </ListGroup>
                    } />
                </Switch>
                {/* <Form 
                    set = {this.props.set}
                    primaryButton = "Add"
                    secondaryButton = "Cancel"
                    primaryAction = {this.props.createMenu}
                    cancel = {this.cancel}
                    formData = {formData}
                >

                </Form> */}
            </Container>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        menus: state.app.entity.menu.items,
    };
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({...AppMenuActions, ...EntitiesMenuActions}, dispatch)
)(MenuOverview);