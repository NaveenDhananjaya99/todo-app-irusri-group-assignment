import { BrowserRouter as Router } from 'react-router-dom';
import LoginView from "./pages/auth/login/loginView";
import RoutesList from "./routes/routes";
import { ToastContainer } from 'react-toastify';



function App() {
  return (
    <Router>
    <RoutesList />
    <ToastContainer />
  </Router>
  );
}

export default App;
