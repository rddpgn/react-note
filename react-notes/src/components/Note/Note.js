import React, { Component } from 'react';
import './Note.scss';

export class Note extends Component {
    constructor() {
        super();
        this.state = {
            writingTitle: true,
            defaultTitle: 'Note',
        }
        this.inputRef = React.createRef();
    }
    componentDidMount() {
        this.setState({ defaultTitle: `Note ${this.props.note.id}`});
        this.focusInput();
    }
    titleSubmit(value) {
        this.setState({ writingTitle: false });
        let title = value || this.state.defaultTitle
        this.props.noteSetTitle(this.props.note.id, this.props.notebookId, title);
    }
    handleSubmit(e) {
        if(e.key === 'Enter') {
            this.titleSubmit(e.target.value);
        }
    }
    handleOnBlur(e) {
        if (this.state.writingTitle) {
            this.titleSubmit(e.target.value);
        }
    }
    renameTitle(e) {
        this.setState({ writingTitle: true }, this.focusInput);
        e.stopPropagation();
    }
    focusInput() {
        this.inputRef.current.focus();
    }
    delete(e) {
        this.props.deleteNote(this.props.note.id, this.props.notebookId);
        e.stopPropagation();
    }
    render() {
        return (
            <div>
                <input ref = {this.inputRef}
                       style = {{'display':this.state.writingTitle? 'block' : 'none'}}
                       onKeyDown = {(e) => this.handleSubmit(e)}
                       onBlur = {(e) => this.handleOnBlur(e)}
                />
                <div className='note-title'
                     style = {{'display':this.state.writingTitle? 'none' : 'flex'}}>
                    <h3> {this.props.note.title} </h3>
                    <button onClick = {(e) => this.renameTitle.call(this, e)}>redact</button>
                    <button onClick = {(e) => this.delete.call(this, e)}>Delete</button>
                </div>
                
            </div>
        )
    }
}

export default Note;
