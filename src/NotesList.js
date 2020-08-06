import React from 'react'
import Note from './Note'
import NotesContext from './NotesContext';
import PropTypes from 'prop-types';


class NotesList extends React.Component {
    static contextType = NotesContext;
    render() {
        let notes = [];

        if(this.props.match && this.props.match.path === "/note/:noteId") {
            notes = this.context.notes.find(note => note.id === this.props.match.params.noteId)
        }
        else if(this.context.notes){
            
            notes = ((this.props && this.props.match.params.folderId) ? this.context.notes.filter((note, i) => note.folderId === this.props.match.params.folderId) : this.context.notes);
        }

        // if notes isn't an array it's a object
        if(!(Array.isArray(notes))) {
                notes = [notes]
        }

        if(notes[0] !== 'undefined' && notes.length >= 1) {
            return(
                <ul>
                    {notes.map((note, i) => {
                        return (
                            <Note route={this.props} note={note} key={i} />
                        )
                    })}
                    <li onClick={() => this.context.showAddFolderForm('note')}>Add note</li>
                </ul>
            )

        }
        else {
            return(
                <><li onClick={() => this.context.showAddFolderForm('note')}>Add note</li></>
            )
        }

        
    }
}

NotesList.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
}
export default NotesList;