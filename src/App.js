import './App.css';
import Background from './components/Background';
import UserCreationForm from './components/form/UserCreationForm';
import { useState, useEffect } from "react"

function App() {
  // used state to minimize api calls
  const [endpointData, setEndpointData] = useState(null)

  // synchronous call on component load by useEffect.
 
  useEffect(() => {
    fetch(`https://frontend-take-home.fetchrewards.com/form`)
    .then(res => res.json())
    .then(data => setEndpointData(data))
  }, [])

  return (
    <div className='App-header'>
      <Background></Background>
      <UserCreationForm endpointData={endpointData}></UserCreationForm>
    </div>
  );
}

export default App;
