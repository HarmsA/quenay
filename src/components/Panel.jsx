import React from 'react';
import './Panel.css';


const Panel = ({ children }) => (
  <div className='panel'>
    {children}
  </div>
);


export default Panel;