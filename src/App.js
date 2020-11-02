import './App.css';
import NavBar from './components/navBar';
import LandingPage from './components/landingPage';
import Main from './components/main'

function App() {
  return (
    <div className="App">
        <NavBar />
        <div className="nav-land-container">
            <LandingPage />
        </div>
        <div className="main-card-container">
            <Main />
        </div>
    </div>
  );
}

export default App;
