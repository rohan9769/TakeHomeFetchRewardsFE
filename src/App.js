import './App.css';
import Background from './components/Background';
import UserCreationForm from './components/form/UserCreationForm';

function App() {
  return (
    <div className='App-header'>
      <Background></Background>
      <UserCreationForm></UserCreationForm>
    </div>
  );
}

export default App;
