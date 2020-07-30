import React from 'react'
import Note from './Note'

class NotesList extends React.Component{
    render() {
        //.match.params.folderId
        let notes = ((this.props.route && this.props.route.match.params.folderId) ? this.props.notes.filter((note, i) => note.folderId === this.props.route.match.params.folderId) : this.props.notes);

        // if notes isn't an array it's a object
        if(!(Array.isArray(notes))) {
            console.log(notes)
            notes = [notes]
        }

        return(
            <ul>
                {notes.map((note, i) => {
                    return(
                        <Note route={((notes.length === 1) ? this.props.route : "")} note={note} key={i}/>
                    )
                })}
            </ul>   
        )
    }
}

export default NotesList;