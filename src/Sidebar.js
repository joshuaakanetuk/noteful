import React from 'react'
import {  NavLink } from 'react-router-dom'
import './Sidebar.css'
import NotesContext from './NotesContext';

class Sidebar extends React.Component {
    static contextType = NotesContext;
    render() {
        let selectedFolder = {};
        let selectedFolderName = {};
        let folders;

        console.log(this.props)
        //onClick={this.props.history.push('/')
        if(this.props.match.path === "/note/:noteId") {
            selectedFolder = this.context.notes.find(note => note.id === this.props.match.params.noteId)
            selectedFolderName = this.context.folders.find(folder => folder.id ===  selectedFolder.folderId)
        }
        else {
            folders = this.context.folders.map((folder, i) => {
                return (
                    <NavLink to={`/folder/${folder.id}`} key={i}><li >{folder.name}</li></NavLink>
                )
            });
        }

        return (
            
            <div>
                {
                    (folders && folders.length > 0) ? folders : (<><input type="button" onClick={() => this.props.history.goBack()} value="Go Back" /><div>{selectedFolder ? selectedFolderName.name : ''}</div></>)
                }
            </div>
        )
    }
}

export default Sidebar;