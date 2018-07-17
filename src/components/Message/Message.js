import React, { Component } from 'react';

class Message extends Component {
    render() {
        return (
            <div className="Message">
                <p>{ this.props.value }</p>
            </div>
        );
    }
}

export default Message;
