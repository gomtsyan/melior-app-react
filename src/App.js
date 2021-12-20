import React from "react";
import "./App.css";
import NavBar from "./components/NavigationBar/NavigationBar";
import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Analytics from "./pages/Analytics/Analytics";
import FeedBack from "./pages/FeedbackAnalytics/FeedbackAnalytics";
import SearchResults from "./pages/SearchResults/SearchResults";
// import UxAnalytics from "./pages/UxAnalytics/UxAnalytics";

function App() {
  return (
    <HashRouter>
      <div className="app-wrapper">
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to="/analytics" />}
          />
          <Route path="/analytics" exact component={Analytics} />
          {/*<Route path='*' exact component={Analytics} render={() =>*/}
          {/*    (*/}
          {/*        <Redirect to="/analytics"/>*/}
          {/*    )*/}
          {/*} />*/}
          {/*<Route path='/feedback'  component={FeedBack} />*/}
          <Route path='/searching'  component={SearchResults} />
          {/*<Route path="/ux" exact component={UxAnalytics} />*/}
          <Route path="/feedback" exact component={FeedBack} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
