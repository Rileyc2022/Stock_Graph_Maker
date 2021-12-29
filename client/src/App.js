import React, {useState} from 'react';
import './App.css';
import './index.css';
import Navbar from './components/Navbar'
import Instructions from './components/Instructions'
import Editor from './components/Editor'
import Search from './components/Search'
function App() {
  const [graphData, setGraphData] = useState({})
  return (
    <div className="App bg-ticker-gray text-white">
      <Navbar/>
      <div className="flex flex-col h-content justify-around align-center">
      <Instructions/>
      <Search setGraphData={setGraphData}/>
      <Editor graphData={graphData}/>
      </div>
    </div>
  );
}

export default App;
