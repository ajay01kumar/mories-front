import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import LayoutSideBar from './components/LayoutSideBar';
import Dashboard from './Dashboard';
import io from "socket.io-client"

const socket = io.connect("http://localhost:5001");

function App() {
  return (
    <div className="App">
      {/* <ColorChanger /> */}
      <Routes>

        <Route path="/" element={<Login />}></Route>
        <Route path="App" element={<LayoutSideBar socket={socket} />}>
          <Route path='Dashboard' element={<Dashboard />} />

        </Route>
      </Routes>

    </div>
  );
}

export default App;
