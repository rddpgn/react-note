import React, { Component } from 'react';

import Header from '../Header/Header.js';
import NoteContainer from '../NoteContainer/NoteContainer.js';

import './App.scss';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      notebooks: []
    }
  }
  addNotebook() {
    let ntnbooks = this.state.notebooks;
    let id = ntnbooks.length? ntnbooks[ntnbooks.length - 1].id + 1:0;
    let notebook = {
      id,
      title: '',
      notes: [],
    }
    this.setState((state, props) => {
      state.notebooks.push(notebook);
    })
    this.forceUpdate();
  }
  addNote(notebookId) {
    let notebook = this.state.notebooks[notebookId];
    let noteId = notebook.notes.length? notebook.notes[notebook.notes.length - 1].id + 1:0;
    let note = {
      id: noteId,
      title: 'New note',
      body: ' ',
    }
    this.setState((state) => {
      state.notebooks[notebookId].notes.push(note);
    })
    this.forceUpdate();
  }
  noteBookSetTitle(id, title) {
    if (typeof(id) === 'undefined') { console.error('Id of notebook must be transferred'); return }
    if (typeof(id) != 'number') { console.error('Id of notebook must be Number'); return }
    if (!title) {console.error('Title must be transferred'); return }

    this.setState((state, props) => {
      state.notebooks.map((notebook) => {
        if (notebook.id === id) {
          notebook.title = title;
        }
        return notebook;
      })
    })
    this.forceUpdate();
  }
  render() {
    return (
      <div>
        <Header />
        <div>
         <NoteContainer notebooks={this.state.notebooks} 
                        addNotebook={this.addNotebook.bind(this)}
                        addNote={this.addNote.bind(this)} 
                        noteBookSetTitle={this.noteBookSetTitle.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default App;
