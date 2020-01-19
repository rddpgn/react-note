import React, { Component } from 'react';
import Note from '../Note/Note.js';
import './Notebook.scss';

export class Notebook extends Component {
    constructor() {
        super();
        this.state = {
            opened: false
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
        this.setState({ opened: !this.state.opened});
    }
    render() {
        return (
            <div className='notebook' onClick={this.notesDisplayToggle.bind(this)}>
                <h2>{this.props.notebook.title } { this.props.notebook.id}</h2> 
                <div style={{'display': this.isDisplayed() }}>{this.getArrayOfNotes(this.props.notebook.notes)}</div>
            </div>
        )
    }
}

export default Notebook;
