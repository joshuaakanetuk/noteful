import React from 'react'

class NoteError extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }
    static getDerivedStateFromError(error) {
      console.log(error)
        return { hasError: true };
      }
      render() {
        if (this.state.hasError) {      
          return (
            <h2>Couldn't Create Form. Refresh To Try Again.</h2>
          );
        }
        return this.props.children;
      }  
}

export default NoteError;