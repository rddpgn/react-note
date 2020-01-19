import React, { Component } from 'react';
import Notebook from '../Notebook/Notebook.js';
import './NoteContainer.scss';

export class NoteContainer extends Component {
    render() {
        return <div className="note-container">
            {
                this.props.notebooks.map((notebook) => {
                    return <Notebook notebook={notebook} key={notebook.id}/> 
                })
            }
        </div>  
    }
}

export default NoteContainer;
