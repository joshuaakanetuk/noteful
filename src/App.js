import React from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import Sidebar from './Sidebar'
import NotesList from './NotesList';
import NotesContext from './NotesContext'

function get(url) {
  return fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Something went wrong, please try again later.');
      }
      return res;
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    });

}

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  };
  componentDidMount = () => {
    Promise.all([get('http://localhost:9090/folders'), get('http://localhost:9090/notes')])
      .then(value => {
        this.setState({
          folders: value[0],
          notes: value[1]
        })
      })
  }
  deleteNote = noteid => {
    const newNotes = this.state.notes.filter(nm =>
      nm.id !== noteid
    )
    this.setState({
      notes: newNotes
    })
  }
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }
    return (
      <NotesContext.Provider value={contextValue}>
        <div className="App">
          <header className="App-header">
            <Link to='/'>Noteful</Link>
          </header>
          <div className="fold">
            <section>
              <Route exact path='/'
                component={Sidebar} />
              <Route path='/folder/:folderId'
                component={Sidebar} />
              <Route path='/note/:noteId'
                component={Sidebar} />
            </section>
            <main>
              <Route exact path='/'
                component={NotesList}/>
              <Route path='/folder/:folderId'
                component={NotesList}/>
              <Route path='/note/:noteId'
                  component={NotesList}
                />
            </main>
          </div>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default App;
