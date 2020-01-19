import React, { Component } from 'react';
import Notebook from '../Notebook/Notebook.js';
import ButtonAddNotebook from '../ButtonAddNotebook/ButtonAddNotebook.js';
import './NoteContainer.scss';

export class NoteContainer extends Component {
    render() {
        return <div className="note-container">
                <ButtonAddNotebook addNotebook={this.props.addNotebook}/>
                {
                    this.props.notebooks.map((notebook) => {
                        return <Notebook notebook={notebook} 
                                         key={notebook.id} 
                                         noteBookSetTitle={this.props.noteBookSetTitle}
                                         addNote={this.props.addNote}
                                         /> 
                    })
                }
        </div>  
    }
}

export default NoteContainer;
