import React, { Component } from 'react';
import Note from '../Note/Note.js';
import ButtonAddNote from '../ButtonAddNote/ButtonAddNote.js';
import './Notebook.scss';

export class Notebook extends Component {
    constructor() {
        super();
        this.state = {
            opened: false,
            writingTitle: true,
        }
    }
    getArrayOfNotes(notes) {
        if (!notes) return null;
        return notes.map((note) => {
            return <Note note={note} key={note.id}/>;
        });
    }
    isDisplayed() {
        return this.state.opened? 'block':'none';
    }
    notesDisplayToggle(e) {
        if (!this.state.writingTitle) { 
            this.setState({ opened: !this.state.opened});
        }
    }
    titleSubmit(e) {
        if(e.key === 'Enter') {
            this.setState({ writingTitle: false });
            this.props.noteBookSetTitle(this.props.notebook.id, e.target.value);
        }
    }
    render() {
        return (
            <div className='notebook' >
                <input style={{'display': this.state.writingTitle? 'block' : 'none' }} onKeyDown={(e) => this.titleSubmit(e)} type="text"/>
                
                <div className='notebook-title' style={{'display': this.state.writingTitle? 'none' : 'flex' }} onClick={this.notesDisplayToggle.bind(this)}>
                    <h2>{this.props.notebook.title }</h2>
                    <span>{this.state.opened?'▼':'▲'}</span>
                </div>
                <div style={{'display': this.isDisplayed() }}>
                    <ButtonAddNote addNote={this.props.addNote} notebookId={this.props.notebook.id}/>

                    {this.getArrayOfNotes(this.props.notebook.notes)}
                </div>
            </div>
        )
    }
}

export default Notebook;
