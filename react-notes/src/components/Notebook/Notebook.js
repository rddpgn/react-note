import React, { Component } from 'react';
import Note from '../Note/Note.js';
import './Notebook.scss';

export class Notebook extends Component {
    constructor() {
        super();
        this.state = {
            opened: false,
            writingTitle: true,
            defaultTitle: 'Notebook',
            gotName: false,
        }
        this.inputRef = React.createRef();
    }
    getArrayOfNotes(notes) {
        if (!notes) return null;
        return notes.map((note) => {
            return <Note note = {note} 
                         key = {note.id}
                         noteSetTitle = {this.props.noteSetTitle}
                         notebookId = {this.props.notebook.id}
                         deleteNote = {this.props.deleteNote}
                         setCurrentNote = {this.props.setCurrentNote}
                    />;
        });
    }
    isDisplayed() {
        return this.state.opened? 'block':'none';
    }
    notesDisplayToggle() {
        if (!this.state.writingTitle) { 
            this.setState({ opened: !this.state.opened});
        }
    }
    titleSubmit(value) {
        this.setState({ writingTitle: false });
        let title = value || this.state.defaultTitle
        this.props.noteBookSetTitle(this.props.notebook.id, title);

        if (!this.state.gotName) {
            this.setState({ gotName: true, opened: true });
        }
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
        this.setState({writingTitle: true}, this.focusInput);
        e.stopPropagation();
    }
    addNote() {
        this.props.addNote(this.props.notebook.id);
    }
    componentDidMount() {
        this.focusInput();
        this.setState({ defaultTitle: `Notebook ${this.props.notebook.id}`})
    }
    focusInput() {
        this.inputRef.current.focus();
    }
    delete(e) {
        if (window.confirm('Are you sure you want to delete?')) {
            this.props.deleteNotebook(this.props.notebook.id);
        }
        e.stopPropagation();
    }
    render() {
        return (
            <div className='notebook' >
                <input ref={this.inputRef} 
                       style={{'display': this.state.writingTitle? 'block' : 'none' }} 
                       onKeyDown={(e) => this.handleSubmit(e)} 
                       onBlur={(e) => this.handleOnBlur(e)} 
                       type="text"
                />
                
                <div className='notebook-title' 
                     style={{'display': this.state.writingTitle? 'none' : 'flex' }} 
                     onClick={this.notesDisplayToggle.bind(this)}>

                    <h2>{this.props.notebook.title }</h2>
                    <button onClick = {(e) => this.renameTitle.call(this, e)}>Redact</button> 
                    <button onClick = {(e) => this.delete.call(this, e)}>Del </button>
                    <span>{this.state.opened?'▼':'▲'}</span>
                </div>
                <div style={{'height': this.state.opened? `${1.4 + 1.4*this.props.notebook.notes.length}rem`:'0'}} 
                     className='notes-wrapper'>
                    <button className='note note_add' onClick={this.addNote.bind(this)}>Add note</button>
                    <div style={{'height': this.state.opened? `${1.4*this.props.notebook.notes.length}rem`:'0'}}
                         className='notes-wrapper'>
                    { this.props.notebook.notes? this.props.notebook.notes.map((note) => {
                            return <Note note = {note} 
                                        key = {note.id}
                                        noteSetTitle = {this.props.noteSetTitle}
                                        notebookId = {this.props.notebook.id}
                                        deleteNote = {this.props.deleteNote}
                                        setCurrentNote = {this.props.setCurrentNote}
                                    />;
                        }) : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Notebook;
