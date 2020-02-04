import React from 'react';
import { Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import SignUpPage from '../../ui/Pages/SignUp/SignUpPage';
import SignInPage from '../../ui/Pages/SignInPage/SignInPage';
import App from '../../ui/App';
import HeaderBar from '../../ui/component/HeadBar/HeaderBar';
import PostPage from '../../ui/Pages/PostPage/PostPage';
import PostItem from '../../ui/component/PostItem/PostItem';
import SetPostPage from '../../ui/Pages/SetPostPage/SetPostPage';

// route components

const history = createBrowserHistory();

export const renderRoutes = props => (
  <Router history={history}>
    <Switch>
      <div>
        <HeaderBar />

        <div>
          <Route replace={true} exact path="/" component={App} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
          {/* <Route path="/postpage" component={PostPage} /> */}
          <Route path="/postpage" component={PostPage} />
          <Route path="/postitem/:_id" component={PostItem} />
          <Route path="/setpostpage/:_id" component={SetPostPage} />
        </div>
      </div>
    </Switch>
  </Router>
);
