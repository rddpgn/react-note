import React, { Component } from 'react';
import './TextContainer.scss';

export class TextContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noteBody: '',
        }
    }
    setNoteBody() {
        let value = this.state.noteBody;
        this.props.setNoteBody(value);
    }
    handleChange(e) {
        this.setState({noteBody: e.target.value});
    }
    render() {
        return (
            <div>
                <h1><button onClick = {this.setNoteBody.bind(this) }>Ok</button></h1>
                <textarea onChange = {this.handleChange.bind(this)} value={this.state.noteBody}>
                </textarea>
            </div>
        )
    }
}

export default TextContainer
