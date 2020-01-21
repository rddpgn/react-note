import React, { Component } from 'react';
import Notebook from '../Notebook/Notebook.js';
import './NoteContainer.scss';

export class NoteContainer extends Component {
    addNotebook() {
        this.props.addNotebook();
    }
    render() {
        return <div className="note-container">
                <button onClick={this.addNotebook.bind(this)}>Add notebook</button>
                {
                    this.props.notebooks.map((notebook) => {
                        return <Notebook notebook={notebook} 
                                         key={notebook.id} 
                                         noteBookSetTitle={this.props.noteBookSetTitle}
                                         addNote={this.props.addNote}
                                         noteSetTitle = {this.props.noteSetTitle}
                                         deleteNote = {this.props.deleteNote}
                                         deleteNotebook = {this.props.deleteNotebook}
                                /> 
                    })
                }
        </div>  
    }
}

export default NoteContainer;
