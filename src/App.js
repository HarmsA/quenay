import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import AddNames from './components/Panel1/AddNames';
import { useSwipeable } from 'react-swipeable';
import Panel from './components/Panel';
import AddQuestion from './components/Panel2/AddQuestion';
import HistoricQuestions from './components/Panel3/HistoricQuestions';
import Names from './components/Panel1/Names';


function App() {
  const [activePanel, setActivePanel] = useState(0)
  const [names, setNames] = useState([])
  const [selectedName, setSelectedName] = useState('')
  // const isMobile = window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  

  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        console.log(isMobile)
        if (!isMobile) setActivePanel(0)
      };

      window.addEventListener('resize', handleResize);

      // Cleanup the event listener on component unmount
      return () => {
          window.removeEventListener('resize', handleResize);
      };
  }, [isMobile]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (activePanel < 2) setActivePanel(activePanel + 1);
    },
    onSwipedRight: () => {
      if (activePanel > 0) setActivePanel(activePanel - 1);
    },
    trackMouse: true, // Allows swiping with a mouse on desktop
  });

  const getTransformStyle = () => {
    return isMobile ? { transform: `translateX(-${activePanel * 100}vw)` } : {};

  };

  const handleSelectedName = (e) => { 
    setSelectedName(e.target.innerText)
    // todo - add a useEffect to get the selected name's questions from db and local storage and change the active panel to 1
  }

  
  return (
    <div className="App container">
      {isMobile ?  <p>Mobile view</p> : <p>Desktop view</p> }
      <Header />
      <div {...handlers} style={styles.swipeable}>
      {/* <AddNames names={names} setNames={setNames} /> */}
      <div className="panels" style={getTransformStyle()}>
          
        <Panel className='panel' >
          <AddNames names={names} setNames={setNames} />
          <Names names={names} handleSelectedName={handleSelectedName} selectedName={selectedName} />
        </Panel>

        <Panel className='panel'>
          <AddQuestion />
        </Panel>

        <Panel className='panel'>
          <HistoricQuestions />
        </Panel>
        
      </div>

      
    </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  swipeable: {
    flex: 1,
    overflow: 'hidden',
  },
  panels: {
    display: 'flex',
    width: '300vw',
    transition: 'transform 0.3s ease',
  },
  panel: {
    width: '100vw',
    height: '100%',
  },
 '@media (min-width: 768px)': {
    panels: {
      transform: 'none',
      width: '100%',
    },
    panel: {
      width: '33.33vw', // Each panel takes up a third of the screen width
    },
  },
};



export default App;
