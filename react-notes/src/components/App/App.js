import React, { Component } from 'react';

import Header from '../Header/Header.js';
import NoteContainer from '../NoteContainer/NoteContainer.js';
import TextContainer from '../TextContainer/TextContainer.js';

import './App.scss';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      notebooks: [],
      currentNote: -1,
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
    if (typeof(id) !== 'number') { console.error('Id of notebook must be Number'); return }
    if (!title) {console.error('Title must be transferred'); return }

    this.setState((state) => {
      state.notebooks.map((notebook) => {
        if (notebook.id === id) {
          notebook.title = title;
        }
        return notebook;
      })
    })
    this.forceUpdate();
  }
  noteSetTitle(noteId, notebookId, title) {
    if (typeof(noteId) === 'undefined') { console.error('Id of note must be transferred'); return }
    if (typeof(notebookId) === 'undefined') { console.error('Id of notebook must be transferred'); return }
    if (typeof(noteId) !== 'number') { console.error('Id of note must be Number'); return }
    if (typeof(notebookId) !== 'number') { console.error('Id of notebook must be Number'); return }
    if (!title) {console.error('Title must be transferred'); return }

    this.setState((state) => {
      let notebook = state.notebooks.filter((notebook) => {
        return notebook.id === notebookId;
      })[0];

      notebook.notes.map((note) => {
        if (note.id === noteId) {
          note.title = title;
        }
        return note;
      })
    })

    this.forceUpdate();
  }
  deleteNote(noteId, notebookId) {
    if (typeof(noteId) === 'undefined') { console.error('Id of note must be transferred'); return }
    if (typeof(notebookId) === 'undefined') { console.error('Id of notebook must be transferred'); return }
    if (typeof(noteId) !== 'number') { console.error('Id of note must be Number'); return }
    if (typeof(notebookId) !== 'number') { console.error('Id of notebook must be Number'); return }

    this.setState((state) => {
      let notebook = state.notebooks.filter((notebook) => {
        return notebook.id === notebookId;
      })[0];

      notebook.notes = notebook.notes.filter((note) => {
        return note.id !== noteId;
      })
    })

    this.forceUpdate();
  }
  deleteNotebook(id) {
    if (typeof(id) === 'undefined') { console.error('Id of notebook must be transferred'); return }
    if (typeof(id) !== 'number') { console.error('Id of notebook must be Number'); return }

    this.setState({
      notebooks: this.state.notebooks.filter((notebook) => { return notebook.id !== id;})
    })

    this.forceUpdate();
  }
  setCurrentNote(noteId, notebookId) {
    if (typeof(noteId) === 'undefined') { console.error('Id of note must be transferred'); return }
    if (typeof(notebookId) === 'undefined') { console.error('Id of notebook must be transferred'); return }
    if (typeof(noteId) !== 'number') { console.error('Id of note must be Number'); return }
    if (typeof(notebookId) !== 'number') { console.error('Id of notebook must be Number'); return }

    this.setState({
      currentNote: { noteId, notebookId }
    })
    this.forceUpdate();
  }
  getCurrentNoteBody() {
    if (this.state.currentNote !== -1) {
      let notebook = this.state.notebooks[this.state.currentNote.notebookId]
      if (notebook !== undefined) {
        let note = notebook.notes[this.state.currentNote.noteId];
        if (note != undefined) {
          return note.body;
        }
      }      
    }
    return null;
  }
  updateTextarea(e) {
    this.state.notebooks[this.state.currentNote.notebookId].notes[this.state.currentNote.noteId].body = e.target.value;
    this.forceUpdate();
  }
  render() {
    return (
      <>
        <Header />
        <div className='app'>
         <NoteContainer notebooks = {this.state.notebooks} 
                        addNotebook = {this.addNotebook.bind(this)}
                        addNote = {this.addNote.bind(this)} 
                        noteBookSetTitle = {this.noteBookSetTitle.bind(this)}
                        noteSetTitle = {this.noteSetTitle.bind(this)}
                        deleteNote = {this.deleteNote.bind(this)}
                        deleteNotebook = {this.deleteNotebook.bind(this)}
                        setCurrentNote = {this.setCurrentNote.bind(this)}
         />
         
         { this.state.currentNote !== -1? 
          <textarea value={this.getCurrentNoteBody()} onChange={this.updateTextarea.bind(this)}></textarea>
          : null
         }
         
        </div>
      </>
    )
  }
}

export default App;


/*
{ this.state.currentNote !== -1? 
          <TextContainer note = {this.state.notebooks[this.state.currentNote.notebookId].notes[this.state.currentNote.noteId]}
                         setNoteBody = { this.setNoteBody.bind(this) }
          /> :
          null
         }
         */