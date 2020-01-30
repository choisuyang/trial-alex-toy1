import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import SignUpPage from './Pages/SignUp/SignUpPage.jsx';
import HeaderBar from './component/HeadBar/HeaderBar.jsx';
// import SignInPage frsom './Pages/SignInPage/SignInPage.jsx';

// import { widthTracker } from 'meteor/react-meteor-data';

const App = () => (
  <div>
    <HeaderBar />
    {/* <SignInPage/> */}
    <SignUpPage />
  </div>
);

export default App;
