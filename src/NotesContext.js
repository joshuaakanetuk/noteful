import React from 'react'

const NotesContext = React.createContext({
  notes: [],
  folders: [],
  deleteNote: () => {}
})

export default NotesContext