import React from "react";
import { NavLink } from "react-router-dom";
import "./Note.css";
import NotesContext from "./NotesContext";

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
        this.props.route.history.push('/')
         callback(id);
         
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const date__modified = new Date(this.props.note.modified);
    return (
      <>
        <div className="note">
          <NavLink to={`/note/${this.props.note.id}`}>
            <span className="note__title">{this.props.note.name}</span>
          </NavLink>
          <span className="note__modified">
            Date modified on {date__modified.getDate()}{" "}
            {month[date__modified.getMonth()]} {date__modified.getFullYear()}
          </span>
          <input
            onClick={() => {                
              this.handleDelete(this.props.note.id, this.context.deleteNote);
            }}
            type="button"
            value="Delete"
          />
        </div>
        {(this.props.route.match && this.props.route.match.path === "/note/:noteId") ? <div>{this.props.note.content}</div> : ""}
      </>
    );
  }
}

export default Note;
