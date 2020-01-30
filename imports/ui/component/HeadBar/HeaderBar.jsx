import React from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import './HeaderBar.scss';

function HeaderBar() {
  const onClickHandle = () => {
    console.log('Go Home');
  };

  return (
    <div className="titleContainer">
      <Header
        as="h1"
        inverted
        color="grey"
        className="titleName"
        onClick={onClickHandle}
      >
        [Alex] Smart Link
      </Header>
      <Grid>
        <Grid.Column>
          <Button>Sign IN</Button>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default HeaderBar;
