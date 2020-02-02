import * as React from 'react';
export default class Counter extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            count: 0
        };
        this.componentDidMount = () => {
        };
        this.componentWillMount = () => {
            this.setState({ loading: true });
            fetch('/').then(this.loaded);
        };
        this.loaded = () => {
            this.setState({ loading: false });
        };
        this.increment = () => {
            this.setState({
                count: (this.state.count + 1)
            });
        };
        this.decrement = () => {
            this.setState({
                count: (this.state.count - 1)
            });
        };
    }
    render() {
        return ({ this: .state.count } < /h1>
            < button);
        onClick = { this: .increment } > Increment < /button>
            < button;
        onClick = { this: .decrement } > Decrement < /button>
            < /div>;
        ;
    }
}
//# sourceMappingURL=counter.js.map