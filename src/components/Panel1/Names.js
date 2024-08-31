import React, { useState, useEffect } from 'react';

const Names = ({ names, handleSelectedName, selectedName }) => {



    // todo - add a useEffect to set the selectedNameID when selectedName changes
    return (
        <div>
            {names ? names.map((name, index) => (
                selectedName ? (
                    selectedName.trim().toLowerCase() === name.trim().toLowerCase() ? (
                        <p key={index} onClick={handleSelectedName} style={{     fontWeight: 'bold' }}>{name}</p>
                    ) : (
                        <p key={index} onClick={handleSelectedName}>{name}</p>
                    )) : (
                        <p key={index} onClick={handleSelectedName}>{name}</p>
                    )
                )) : <p>No names</p>}
                      
        </div>
    );
};

export default Names;
