import React, { useState, useEffect } from 'react';
import './Names.css';
import {EditName, Delete, Bell} from "../images/respondent.tsx"


const Names = ({ names, handleSelectedName, selectedName }) => {



    // todo - add a useEffect to set the selectedNameID when selectedName changes
    return (
        <div className='nameContainer'>
            {names && names.length > 0 ? (
                names.map((name, index) => (
                    <p
                        key={name.trim().toLowerCase() + index} // Better unique key
                        onClick={() => handleSelectedName(name)} // Pass the name as argument
                        className={
                            selectedName.trim().toLowerCase() === name.trim().toLowerCase()
                            ? 'selected'
                            : ''
                        }
                    >
                        <div className='nameIcon'>
                            {name}
                            <div className='iconContainer'>
                                <span className='edit'><EditName /></span>
                                <span className='delete'><Delete /></span>
                                <span className='bell'><Bell /></span>
                            </div>
                        </div>
                    </p>
                ))
            ) : (
                <p>No names</p>
            )}     
        </div>
    );
};

export default Names;

    // // Example of useEffect for handling changes to selectedName
    // useEffect(() => {
    //     if (selectedName) {
    //         // Assuming you want to set some ID based on the selected name
    //         const selectedNameID = names.find(name => name.trim().toTitleCase() === selectedName.trim().toTitleCase());
    //         // Replace this with your logic to handle the selectedNameID
    //         console.log('Selected Name ID:', selectedNameID);
    //     }
    // }, [selectedName, names]); // Dependencies: runs when selectedName or names change

