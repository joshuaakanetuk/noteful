import React, { Component } from "react";
import NotesContext from "./NotesContext";
import { v4 as uuidv4 } from 'uuid';
import config from "./config";

class AddFolder extends Component {
  static contextType = NotesContext;
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      folder_name: {
        value: "",
        touched: false
      }
    };
  }
  updateName(name) {
    this.setState({ folder_name: { value: name, touched: true } });
  }
  handleSubmit(event) {
    event.preventDefault();
    const newFolder = {id: uuidv4(), folder_name: this.state.folder_name.value};

    
    fetch(config.API_ENDPOINT + `/api/folders/`, {
      method: "POST",
      body: JSON.stringify(newFolder),
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
        this.context.addFolder(data);
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
    const name = this.state.folder_name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } 
  }

  render() {
    return (
      <form className="registration" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Folder</h2>
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
        <div className="registration__button__group">
          <button type="reset" onClick={() =>  this.context.showAddFolderForm()} className="registration__button">
            Cancel
          </button>
          <button
            type="submit"
            className="registration__button"
            disabled={
              this.validateName() 
            }
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}
export default AddFolder;