import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import './Sidebar.css'

class Sidebar extends React.Component {
    render() {
        console.log(this.props)
        // const folderName = this.props.route.match.params.noteId;
        const folders = this.props.folders.map((folder, i) => {
            return (
                <NavLink to={`/folder/${folder.id}`} key={i}><li >{folder.name}</li></NavLink>
            )
        });
        return (
            <ul>
                {folders}
            </ul>
        )
    }
}

export default Sidebar;