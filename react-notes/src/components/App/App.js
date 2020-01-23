import React, { Component } from 'react';
import Notebook from '../Notebook/Notebook.js';
import './App.scss';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      notebooks: [],
      notes: [],
    }
  }
  getNotebooksComponents() {
    return this.state.notebooks.map((notebook) => {
      let notes = this.state.notes.filter((note) => {
        return note.notebookId === notebook.id;
      })
      return <Notebook notebook={notebook}
                       notes={notes}
                       key={notebook.id}
                       setTitle={this.setTitle('notebook')}
                       addNote={this.addNote.bind(this)}
                       removeSelf={this.remove('notebook')}
                       removeNote={this.remove('note')}
                       setNoteTitle={this.setTitle('note')}
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
          })
        })
      }
      return tmp.bind(this);
    }
  }
  render() {
    return (
      <>
        <div className='notebook-wrapper'>
          <button onClick = {this.addNotebook.bind(this)}>Add Notebook</button>
          {this.getNotebooksComponents()}
        </div>
      </>
    )
  }
}

export default App;