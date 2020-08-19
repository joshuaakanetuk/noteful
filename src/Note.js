/* eslint-disable eqeqeq */
import React from "react";
import { NavLink } from "react-router-dom";
import "./Note.css";
import NotesContext from "./NotesContext";
import PropTypes from 'prop-types';
import config from './config'

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
      id: "",
      note_name: '',
      date_modified: new Date()
    },
    match: {
      params: {}
    }
  }
  handleDelete = (id, callback) => {
    fetch(config.API_ENDPOINT + `/api/notes/${id}`, {
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
        return;
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
      note = this.context.notes.find(note => note.id == this.props.match.params.noteId)
    }

    const date__modified =  new Date();

    return (
      <>
        <div className="note">
          <NavLink to={`/note/${note.id}`}>
            <span className="note__title">{note.note_name}</span>
          </NavLink>
          <span className="note__date_modified">
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
        {(this.props.match && this.props.match.path == "/note/:noteId") ? <div>{note.content}</div> : ""}
      </>
    );
  }
}

Note.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number,
    note_name: PropTypes.string.isRequired,
    date_modified: function(props, propName, componentName) {
      if (typeof props.date_modified != 'object' && typeof props.date_modified != 'string') {
          return new Error('This isn\'t a date');
      }
    },
  })
}

export default Note;
