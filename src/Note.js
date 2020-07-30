import React from 'react'
import { NavLink } from 'react-router-dom'
import './Note.css'

const month = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
// NEED DATETIME CONVERTER

// {
//     "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
//     "name": "Dogs",
//     "modified": "2019-01-03T00:00:00.000Z",
//     "folderId": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
//     "content": "Corporis accusamus placeat quas non voluptas. Harum fugit molestias qui. Velit ex animi reiciendis quasi. Suscipit totam delectus ut voluptas aut qui rerum. Non veniam eius molestiae rerum quam.\n \rUnde qui aperiam praesentium alias. Aut temporibus id quidem recusandae voluptatem ut eum. Consequatur asperiores et in quisquam corporis maxime dolorem soluta. Et officiis id est quia sunt qui iste reiciendis saepe. Ut aut doloribus minus non nisi vel corporis. Veritatis mollitia et molestias voluptas neque aspernatur reprehenderit.\n \rMaxime aut reprehenderit mollitia quia eos sit fugiat exercitationem. Minima dolore soluta. Quidem fuga ut sit voluptas nihil sunt aliquam dignissimos. Ex autem nemo quisquam voluptas consequuntur et necessitatibus minima velit. Consequatur quia quis tempora minima. Aut qui dolor et dignissimos ut repellat quas ad."
//   }

class Note extends React.Component{
    render() {
        const date__modified = new Date(this.props.note.modified);
        return(
        <><NavLink to={`/note/${this.props.note.id}`}>
            <div className="note">
                <span className="note__title">{this.props.note.name}</span>
                <span className="note__modified">Date modified on {date__modified.getDate()} {month[date__modified.getMonth()]} {date__modified.getFullYear()}</span>
            </div>
            </NavLink>
            {((this.props.route) ? <div>{this.props.note.content}</div> : "")}
            </>
        )
    }
}

export default Note;