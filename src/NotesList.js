import React from 'react'
import Note from './Note'
import NotesContext from './NotesContext';

class NotesList extends React.Component {
    static contextType = NotesContext;
    render() {
        let notes = '';

        console.log(this.props)

        if(this.props.match && this.props.match.path === "/note/:noteId") {
            notes = this.context.notes.find(note => note.id === this.props.match.params.noteId)
        }
        else {
            console.log("d")
            notes = ((this.props && this.props.match.params.folderId) ? this.context.notes.filter((note, i) => note.folderId === this.props.match.params.folderId) : this.context.notes);
            console.log(notes)
        }

        // if notes isn't an array it's a object
        if(!(Array.isArray(notes))) {
                notes = [notes]
        }

        return(
            <ul>
                {notes.map((note, i) => {
                    return (
                        <Note route={this.props} note={note} key={i} />
                    )
                })}
            </ul>
        )
    }
}

export default NotesList;