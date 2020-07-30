import React from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import Sidebar from './Sidebar'
import NotesList from './NotesList';

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  };
  handleFolderSelect = (e) => {
    console.log(e)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to='/'>Noteful</Link>
        </header>
        <div className="fold">
          <section>
            <Route exact path='/'
              render={() => {
                return <Sidebar folders={this.props.store.folders} />
              }} />
            <Route path='/folder/:folderId'
              render={() => {
                return <Sidebar folders={this.props.store.folders} />
              }} />
              <Route path='/note/:noteId'
              render={(routeProps) => {
                return <Sidebar folders={this.props.store.folders} folderName={(this.props.store.notes.find(note => note.id === routeProps.match.params.noteId))} />
              }} />
          </section>
          <main>
            <Route exact path='/'
              render={() => {
                return <NotesList notes={this.props.store.notes} />
              }} />
            <Route path='/folder/:folderId'
              render={(routeProps) => {
                return <NotesList route={routeProps} notes={this.props.store.notes} />
              }} />
              <Route path='/note/:noteId'
              render={(routeProps) => {
                return <NotesList route={routeProps} notes={this.props.store.notes.find(note => note.id === routeProps.match.params.noteId)} />
              }} />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
