import React, {Component,PropTypes} from 'react';

class <%= name %>extends Component {
    constructor(props, context) {
        super(props, context);
    }
    static displayName = "<%= name %>";
    static propTypes = {};

    buildComponent(props, state) {
        return (<div><%=name%></div>);
    }
    render() {
        return this.buildComponent(this.props, this.state)
    }
}