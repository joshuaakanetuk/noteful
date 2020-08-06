import React from "react";
import { NavLink } from "react-router-dom";
import "./Note.css";
import NotesContext from "./NotesContext";
import PropTypes from 'prop-types';


const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class Note extends React.Component {
  static contextType = NotesContext;
  static defaultProps = {
    note: {
      id: '',
      name: '',
      modified: new Date()
    },
    match: {
      params: {}
    }
  }
  handleDelete = (id, callback) => {
    fetch(`http://localhost:9090/notes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
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
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        if(this.props.match.path === "/note/:noteId" ) this.props.history.push('/')
        callback(id);

      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    let note = "";
    note = this.props.note || [];
    

    if (this.props.match && this.props.match.path === "/note/:noteId" && this.context.notes.length > 0) {
      note = this.context.notes.find(note => note.id === this.props.match.params.noteId)
    }

    const date__modified = new Date(note.modified);

    return (
      <>
        <div className="note">
          <NavLink to={`/note/${note.id}`}>
            <span className="note__title">{note.name}</span>
          </NavLink>
          <span className="note__modified">
            Date modified on {date__modified.getDate()}{" "}
            {month[date__modified.getMonth()]} {date__modified.getFullYear()}
          </span>
          <input
            onClick={() => {
              this.handleDelete(note.id, this.context.deleteNote);
            }}
            type="button"
            value="Delete"
          />
        </div>
        {(this.props.match && this.props.match.path === "/note/:noteId") ? <div>{note.content}</div> : ""}
      </>
    );
  }
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    modified: function(props, propName, componentName) {
      if (typeof props.modified != 'object' && typeof props.modified != 'string') {
          return new Error('This isn\'t a date');
      }
    },
  })
}

export default Note;
