import React, { useState } from 'react';

const AddNames = ({names, setNames}) => {
    const [newName, setNewName] = useState('')

    const handleNameSubmit = (e) => {
        e.preventDefault()
        setNames([...names, newName])
        setNewName('')
    }

    // todo - add a useEffect to add the new name to db and local storage when names changes

    return (
        <div>
            <h2>Questioners Name</h2>
            <form onSubmit={handleNameSubmit}>
                <input
                    id="name"
                    placeholder="Add a Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
            </form>
    </div>
    );
};

export default AddNames;