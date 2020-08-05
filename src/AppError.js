import React from 'react'

class AppError extends React.Component{
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
            <h2>App crashed, probably due to the backend server being down.</h2>
          );
        }
        return this.props.children;
      }  
}

export default AppError;