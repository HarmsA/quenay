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
  const [activePanel, setActivePanel] = useState(0);
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [deviceType, setDeviceType] = useState('mobile');

  useEffect(() => {
    const updateDeviceType = () => {
      const ua = navigator.userAgent;
      const width = window.innerWidth;

      if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry/i.test(ua) || width < 768) {
        setDeviceType("mobile");
      } else if (/Tablet|iPad|Nexus 7|Nexus 10|KFAPWI/i.test(ua) || (width >= 768 && width < 1024)) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);

    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
        
  //       setIsMobile(window.innerWidth < 852);
  //       console.log(isMobile)
  //       if (!isMobile) setActivePanel(0)
  //     };

  //     window.addEventListener('resize', handleResize);

  //     // Cleanup the event listener on component unmount
  //     return () => {
  //         window.removeEventListener('resize', handleResize);
  //     };
  // }, [isMobile]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (activePanel < 2) setActivePanel(activePanel + 1);
    },
    onSwipedRight: () => {
      if (activePanel > 0) setActivePanel(activePanel - 1);
    },
    trackMouse: true, // Allows swiping with a mouse on desktop
    preventDefaultTouchmoveEvent: false, // Ensure that swipe does not prevent scrolling
  });

  const getTransformStyle = () => {
    return deviceType === 'mobile' ? { transform: `translateX(-${activePanel * 100}vw)` } : {};
  };

  const handleSelectedName = (name) => { 
    setSelectedName(prevSelectedName =>
      prevSelectedName.trim().toLowerCase() === name.trim().toLowerCase() ? '' : name
    );
    // todo - add a useEffect to get the selected name's questions from db and local storage and change the active panel to 1
  };

  useEffect(() => {
        const storedNames = JSON.parse(localStorage.getItem('names'));
        if (storedNames) {
            setNames(storedNames);
        }
    }, []);
  
  return (
    <div className="App container">
      {deviceType === "mobile" ? (
          <p>Mobile view</p>
      ) : deviceType === "tablet" ? (
          <p>Tablet view</p>
      ) : (
          <p>Desktop view</p>
      )}
      <Header />
      <div {...handlers} style={styles.swipeable}>
      {/* <AddNames names={names} setNames={setNames} /> */}
      <div className="panels" style={getTransformStyle()}>
          
          <Panel >
            <div className="panel">
              <AddNames names={names} setNames={setNames} />
              <Names names={names} handleSelectedName={handleSelectedName} selectedName={selectedName} />
            </div>
        </Panel>

          <Panel>
            <div className="panel">
            <AddQuestion />
            </div>
        </Panel>
          <Panel>
            <div className="panel">
              <HistoricQuestions />
            </div>
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
    overflow: 'hidden', // Prevents horizontal scroll
  },
  panels: {
    display: 'flex',
    width: '300vw',
    transition: 'transform 0.3s ease',
    height: '100%',
  },
  panel: {
    width: '100vw',
    height: '100%',
    overflow: 'auto',
  },
 '@media (min-width: 768px)': {
    panels: {
      transform: 'none',
      width: '100%',
    },
    panel: {
      width: '32.9vw', // Each panel takes up a third of the screen width
    },
  },
};



export default App;
