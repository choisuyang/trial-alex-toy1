import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import SignUpPage from './Pages/SignUp/SignUpPage.jsx';
import HeaderBar from './component/HeadBar/HeaderBar.jsx';
import SignInPage from './Pages/SignInPage/SignInPage.jsx';
import PostItem from './component/PostItem/PostItem.jsx';
import MainPage from './Pages/MainPage/MainPage.jsx';
// import { BrowserRouter } from 'react-router-dom';

// import { widthTracker } from 'meteor/react-meteor-data';

const App = () => (
  <div>
    <MainPage />
    {/* <PostItem /> */}
  </div>
);

export default App;
