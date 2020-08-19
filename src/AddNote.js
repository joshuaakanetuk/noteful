import React, { Component } from "react";
import NotesContext from "./NotesContext";
import config from './config'

class AddNote extends Component {
  static contextType = NotesContext;
  constructor(props) {
    super(props);
    this.state = {
      err: false,
      note_name: {
        value: "",
        touched: false
      },
      folder: {
        value: "",
        touched: false
      },
      content: {
        value: "",
        touched: false
      }
    };
  }
  updateName(name) {
    this.setState({ note_name: { value: name, touched: true } });
  }
  updateFolder(folderId) {
    this.setState({ folder: { value: folderId, touched: true } });
  }
  updateContent(content) {
    this.setState({ content: { value: content, touched: true } });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { note_name, folder, content } = this.state;
    const note = {note_name: note_name.value, folderId: folder.value, content: content.value, date_modified: new Date()};

    
    fetch(config.API_ENDPOINT + `/api/notes/`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.context.addNote(data);
        this.context.showAddFolderForm();

      })
      .catch(error => {
        this.setState({
          err: true
        })
        console.error(error);
      });
    
  }

  validateName() {
    const name = this.state.note_name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } 
  }
  validateFolder() {
    const folder = this.state.folder.value.trim();
    if (folder.length === 0) {
      return "Select a folder";
    } 
  }

  render() {
    return (
      <form className="registration" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Note</h2>
        <div className="registration__hint">* required field</div>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            className="registration__control"
            name="name"
            id="name"
            onChange={e => this.updateName(e.target.value)}
          />
          {this.state.err ? <div>An error has occurred. Please refresh the app.</div> : ""}
        </div>
        <div className="form-group">
          <label htmlFor="name">Folder *</label>
          <select
            className="registration__control"
            name="folder"
            id="folder"
            onChange={e => this.updateFolder(e.target.value)}
          >
              <option>Choose a folder...</option>
              {this.context.folders.map( (folder, i) => {
                  return <option key={i} value={folder.id}>{folder.folder_name}</option>
              })}
              </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Content </label>
          <textarea
            type="text"
            className="registration__control"
            name="name"
            id="name"
            onChange={e => this.updateContent(e.target.value)}
          />
        </div>


        <div className="registration__button__group">
          <button type="reset" className="registration__button" onClick={() => this.context.showAddFolderForm('')}>
            Cancel
          </button>
          <button
            type="submit"
            className="registration__button"
            disabled={
              this.validateName() ||
              this.validateFolder() ||
              this.state.err
            }
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}
export default AddNote;