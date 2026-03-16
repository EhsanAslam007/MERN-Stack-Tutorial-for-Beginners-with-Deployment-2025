import React from 'react'

const NoteCard = ({note}) => {
    return (
        <div>
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <p>{note._id}</p>
        </div>
    )
}

export default NoteCard
