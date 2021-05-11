import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Library from './components/Library/Library';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/library'>
          <Library />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
