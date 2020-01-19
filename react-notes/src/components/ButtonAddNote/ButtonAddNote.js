import React, { Component } from 'react';
import './ButtonAddNote.scss';

export class ButtonAddNote extends Component {
    sendNote() {
        this.props.addNote(this.props.notebookId);
    }
    render() {
        //console.log(this.props.addNote);
        return (
            <button onClick={this.sendNote.bind(this)}>add note</button>
        )
    }
}

export default ButtonAddNote;
