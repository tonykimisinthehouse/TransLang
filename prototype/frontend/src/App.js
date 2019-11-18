import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Question from './components/instructions/Question';
import DrawArea from './components/CodeEditor/DrawArea';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/code">Code</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/code">
            <DrawArea />
          </Route>
          <Route path="/">
            <Question />
          </Route>

        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
