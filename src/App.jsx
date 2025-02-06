import { BrowserRouter as Router } from 'react-router-dom'; 
import Routing from "./Router/Routing";
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router> 
      <ScrollToTop/>
      <Routing />
    </Router>
  );
};

export default App;
