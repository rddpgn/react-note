import React, { Component } from 'react'
import './ButtonAddNotebook.scss';

export class ButtonAddNotebook extends Component {
    render() {
        return (
            <button onClick={this.props.addNotebook}>Add notebook</button>
        )
    }
}

export default ButtonAddNotebook
