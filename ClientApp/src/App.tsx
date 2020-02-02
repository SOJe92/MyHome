import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Counter from './app/components/counter';

export default class App extends React.Component {
    render() {
        return (
            <Route path='/counter' component={Counter} />
        );
    }
}