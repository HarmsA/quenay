import React, { useState, useEffect } from 'react';
import {projectFirestore, projectAuth} from '../../firebase/config'

const AddNames = ({names, setNames}) => {
    const [newName, setNewName] = useState('')

    useEffect(() => {
        const uniqueNames = [...new Set(names)];
        const storedNames = JSON.parse(localStorage.getItem('names'));
        if (storedNames) {
            setNames(storedNames);
        }
    }, [setNames]);

    useEffect(() => {
        const uniqueNames = [...new Set(names)]; // Ensure no duplicates
         if (uniqueNames.length > 0) {
            localStorage.setItem('names', JSON.stringify(uniqueNames));
        }
        }, [names]);
            
    const toUpper = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleNameSubmit = (e) => {
        e.preventDefault()

        const firstLetter = toUpper(newName)
        console.log(firstLetter)
        const remainingChars = newName.substring(1)

        const firstLetterCap = firstLetter.toUpperCase()
        const remainingCharsLower = remainingChars.toLowerCase()
        setNewName(firstLetterCap + remainingCharsLower) 

        const storedNames = JSON.parse(localStorage.getItem('names')) || [];

        if (storedNames.includes(newName)) {
            alert("This name already exists.");
            return;
        }

        
        setNames([...names, newName])
        setNewName('')
    }

    // todo - add a useEffect to add the new name to db when names changes
    // todo - Verify user is authenticated
    return (
        <div>
            <h2>Respondents Name</h2>
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