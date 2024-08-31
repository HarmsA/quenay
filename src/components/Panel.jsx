import React from 'react';
import './Panel.css';


const Panel = ({ children }) => (
  <div className='panelGroup'>
    {children}
  </div>
);


export default Panel;