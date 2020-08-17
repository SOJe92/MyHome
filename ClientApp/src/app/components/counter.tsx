import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from '../state/entities/user/actions'
//import { dispatch } from '../interfaces/routing/dispatch'

class Counter extends Component<any, any> {
    state = {
        count: 0
    };

    constructor(props: any) {
        super(props);
    }

    componentDidMount = async () => {
        this.props.fetchCurrentUser(1);
    };

    loaded = () => {
      this.setState({ loading: false });
    };

    increment = async () => {
        await this.props.fetchCurrentUser(1);
        this.setState({
            count: (this.state.count + 1)
        }); 
    };

    decrement = () => {
        this.setState({
            count: (this.state.count - 1)
        });
    };

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {};
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actions, dispatch)
)(Counter);