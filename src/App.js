import React from "react";
import NavBar from "./components/NavBar";
import MusicPlayer from "./components/MusicPlayer";
import { useAuth0 } from "./react-auth0-spa";

// Import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import Profile from "../src/components/Profile";
import history from "./utils/history";
import Splash from "../src/components/Splash";

// Import the PrivateRoute component
import PrivateRoute from "./components/PrivateRoute";
import ExternalApi from "./components/ExternalApi";
import Upload from "./components/Upload";
import theme from "./components/Theme";
import { ThemeProvider } from "@material-ui/core/styles";

import "./styles/index.css";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* Don't forget to include the history module */}
        <Router history={history}>
          <header>
            <NavBar />
          </header>
          <Switch>
            <Route path="/" exact component={Splash} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/external-api" component={ExternalApi} />
            <PrivateRoute path="/upload" component={Upload} />
          </Switch>
          <footer>
            <MusicPlayer />
          </footer>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
