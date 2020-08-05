import React from 'react'

const NotesContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {},
  showAddFolderForm: () => {},
})

export default NotesContext