import React, { useContext } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Console from "./components/Console/Console";
import { appContext } from './context';

function App() {
  const { noteIndex } = useContext(appContext)

  return (
    <div className="App">
      {
        noteIndex !== "" ? <Console /> : null
      }
      <Sidebar />
    </div>
  );
}

export default App;
