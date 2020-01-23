import React, { Component } from 'react';
import Notebook from '../Notebook/Notebook.js';
import Note from '../Note/Note.js';
import './App.scss';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      notebooks: [],
      notes: [],
      currentNote: -1,
    }
  }
  getNotebooksComponents() {
    return this.state.notebooks.map((notebook) => {
      let notes = this.state.notes.filter((note) => {
        return note.notebookId === notebook.id;
      }).map((note) => {
        return <Note note={note}
                     key={note.id}
                     setTitle={this.setTitle('note')}
                     removeSelf={this.remove('note')}
                     setCurrentNote={this.setCurrentNote.bind(this)}
                     currentNote={this.state.currentNote}
        />
      })
      return <Notebook notebook={notebook}
                       key={notebook.id}
                       notes={notes}
                       setTitle={this.setTitle('notebook')}
                       addNote={this.addNote.bind(this)}
                       removeSelf={this.remove('notebook')}
      />
    })
  }
  componentDidMount() {
    //this.notebookAdd();
  }

  addNotebook() {
    let notebook = {
      id: this.state.notebooks.length? this.state.notebooks[this.state.notebooks.length-1].id + 1 : 0,
      title: '',
    }
    
    this.setState((state) => {
      return state.notebooks.push(notebook);
    })
  }
  addNote(notebookId) {
    let note = {
      id: this.state.notes.length? this.state.notes[this.state.notes.length-1].id + 1 : 0,
      notebookId,
      title: '',
      body: '',
    }

    this.setState((state) => {
      return state.notes.push(note);
    })
  }

  setTitle(type) {
    if (type.toLowerCase() === 'notebook') {
      let tmp = function(id, title) { 
        this.setState((state) => {
          state.notebooks.map((notebook) => {
            if (notebook.id === id) {
              notebook.title = title;
            }
            return notebook;
          })
        })
      }
      return tmp.bind(this);
    } else if (type.toLowerCase() === 'note') {
      let tmp = function(id, title) { 
        this.setState((state) => {
          state.notes.map((note) => {
            if (note.id === id) {
              note.title = title;
            }
            return note;
          })
        })
      }
      return tmp.bind(this);
    }
  }
  remove(type) {
    if (type.toLowerCase() === 'notebook') {
      let tmp = function(id) {
        this.setState({
          notebooks: this.state.notebooks.filter((notebook) => {
            return notebook.id !== id;
          })
        })
      }
      return tmp.bind(this);
    } else if (type.toLowerCase() === 'note') {
      let tmp = function(id) {
        this.setState({
          notes: this.state.notes.filter((note) => {
            return note.id !== id;
          }),
          currentNote: -1,
        })
      }
      return tmp.bind(this);
    }
  }
  setCurrentNote(id) {
    this.setState({
      currentNote: id,
    });
  }
  getTextAreaValue() {
    if (this.state.currentNote !== -1) {
      let note = this.state.notes.filter((note) => {
        return note.id === this.state.currentNote;
      })[0];

      if (note) return note.body;
    }
    return '';
  }
  setTextAreaValue(e) {
    if (this.state.currentNote !== -1) {
      this.setState({
        notes: this.state.notes.map((note) => {
          if (note.id === this.state.currentNote) {
            note.body = e.target.value;
          }
          return note;
        })
      })
    }
    return '';
  }
  getNoteTitle(id) {
    let note = this.state.notes.filter((note) => {
      return note.id === id;
    })[0];

    return note? note.title : 'No note';
  }
  render() {
    return (
        <div className='app'>
          <div className='notebook-wrapper'>
            <button onClick = {this.addNotebook.bind(this)}
                    className = 'notebook-wrapper__add-notebook'>
                Add Notebook
              </button>
            {this.getNotebooksComponents()}
          </div>
          <div>
            <h1>{this.getNoteTitle(this.state.currentNote)}</h1>
            <textarea value={this.getTextAreaValue.bind(this)()}
                      onChange={(e) => this.setTextAreaValue.bind(this)(e)}
            >
            </textarea>
          </div>
        </div>
    )
  }
}

export default App;