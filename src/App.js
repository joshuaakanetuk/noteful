import React from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import Sidebar from './Sidebar'
import NotesList from './NotesList';
import Note from './Note'
import NoteError from './NoteError'
import AppError from './AppError'
import AddFolder from './AddFolder'
import AddNote from './AddNote'
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
    notes: [],
    showForm: false,
    formType: ""
  };
  componentDidMount() {
    Promise.all([get('http://localhost:9090/folders'), get('http://localhost:9090/notes')])
      .then(value => {
        this.setState({
          folders: value[0],
          notes: value[1]
        })
      })
  }
  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }
  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note]
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
  showAddFolderForm = (type) => {

    if(type === 'undefined')
    {
      this.setState({
        showForm: !this.state.showForm
      })

    }
    this.setState({
      formType: type,
      showForm: !this.state.showForm
    })
    

  }
  render() {
    const contextValue = {
      folders: this.state.folders || [],
      notes: this.state.notes || [],
      deleteNote: this.deleteNote,
      showAddFolderForm: this.showAddFolderForm,
      addFolder: this.addFolder,
      addNote: this.addNote
    }
    return (
      <NotesContext.Provider value={contextValue}>
        <NoteError>
        {this.state.showForm ? <div className="overlay">{this.state.formType === 'folder' ? <AddFolder/> : <AddNote/>}</div> : ""}
        </NoteError>
        <div className="App">
          <header className="App-header">
            <Link to='/'>Noteful</Link>
          </header>
          <AppError>
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
                  component={Note}
                />
            </main>
          </div>
          </AppError>
        </div>
        
      </NotesContext.Provider>
    );
  }
}

export default App;
