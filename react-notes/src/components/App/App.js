import React, { Component } from 'react';

import Header from '../Header/Header.js';
import NoteContainer from '../NoteContainer/NoteContainer.js';

import './App.scss';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      notebooks: [ 
        {
          id: 0,
          title: 'Разное',
          notes: [
            {
              id: 0,
              title: 'Lorem',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero molestiae, laboriosam explicabo totam duci'
            },
            {
              id: 1,
              title: 'Lorem 2',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero molestiae, laboriosam explicabo totam duci'
            },
            {
              id: 2,
              title: 'Lorem 3',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero molestiae, laboriosam explicabo totam duci'
            }
          ]
        },
        {
          id: 1,
          title: 'Покупки',
          notes: []
        },
        {
          id: 2,
          title: 'Ежедневник',
          notes: [
            {
              id: 0,
              title: 'Lorem',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero molestiae, laboriosam explicabo totam duci'
            },
            {
              id: 1,
              title: 'Lorem',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero molestiae, laboriosam explicabo totam duci'
            }
          ]
        },
        {
          id: 3,
          title: 'Дневник'
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div>
         <NoteContainer notebooks={this.state.notebooks}/>
        </div>
      </div>
    )
  }
}

export default App;
