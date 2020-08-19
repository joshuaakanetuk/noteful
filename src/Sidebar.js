/* eslint-disable eqeqeq */
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

import NotesContext from './NotesContext';
import PropTypes from 'prop-types';


class Sidebar extends React.Component {
    static contextType = NotesContext;
    state = {
        showAddFolderForm: false
    }
    render() {
        let selectedFolder = {};
        let selectedFolderName = {};
        let folders = [];
        let sidebar = [];

        if (this.props.match.path === "/note/:noteId") {
            let notes = this.context.notes;
            selectedFolder = notes.find(note => note.id == this.props.match.params.noteId)
            selectedFolderName = this.context.folders.find(folder => folder.id === selectedFolder.folderId)
        }
        else if (this.context.folders && this.context.folders.length >= 1) {
            folders = this.context.folders.map((folder, i) => {
                return (
                    <li key={i} className="sidebar__"> <NavLink to={`/folder/${folder.id}`} >{folder.folder_name}</NavLink></li>
                )
            });
            sidebar = [folders, <li className="sidebar__" key={1} onClick={() => this.context.showAddFolderForm('folder')}>Add Folder</li>]
        }
        // else if (this.context.folders === 'undefined') {
        //     return (
        //         <>
                
        //         </>
        //     )

        // }

        const sidebarcontent =  (folders && folders.length > 0) ? sidebar : (<><li key={1} onClick={() => this.props.history.goBack()}>Go Back</li><h1>{selectedFolder ? selectedFolderName.name : ''}</h1></>)

        return (
            <ul>
                {(this.context.folders.length === 0 ) ? <li className="sidebar__" key={1} onClick={() => this.context.showAddFolderForm('folder')}>Add Folder</li> : sidebarcontent}
            </ul>
        )
    }
}

Sidebar.propTypes = {
    match: PropTypes.object,
    history: PropTypes.object
}

export default Sidebar;