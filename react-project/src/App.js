import { useState } from 'react';
import './App.css';
import Body from './components/Body'
import { ClimateContext } from './context/ClimateContext';
import Login from './components/Login';

function App() {
  const [weather, setWeather] = useState(null);

  return (
    <ClimateContext.Provider className="App" value={{weather, setWeather}}>
      <Body/>
    </ClimateContext.Provider>
  );
}

export default App;
