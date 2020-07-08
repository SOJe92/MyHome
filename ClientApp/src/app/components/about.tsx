import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class About extends Component<any, any> {

    render() {
        return <Container></Container>
    }
}

const mapStateToProps = (state: any) => {
    return {};
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({}, dispatch)
)(About);