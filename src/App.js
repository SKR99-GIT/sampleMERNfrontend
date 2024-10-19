import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';/* hook ekak */
import './App.css';

/* functoinal component */
function App() {

const navigate = useNavigate();


  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Sample React Project</h1>
        <button className='usersButton' onClick={() => navigate('/users')}>Add Users</button>

      </header>
    </div>
  );
}

/* mek wenath components wlt use krnnd puluwn wennd export krl tiyeno */
/* default dann me file ekt access wenkot automa me function ekt redirect wennd */
export default App;
