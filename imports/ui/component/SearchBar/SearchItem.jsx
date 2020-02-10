import React from 'react';
import './SearchItem.scss';
import { List, Image, Table, Header, Grid } from 'semantic-ui-react';

function SearchItem({ nameData }) {
  console.log('서치 에서 의 : ', nameData);
  return (
    <div className="searchItem">
      {nameData.map(item => {
        return (
          <List animated verticalAlign="middle">
            <List.Item>
              <Image
                avatar
                src="https://react.semantic-ui.com/images/avatar/small/helen.jpg"
              />
              <List.Content>
                <List.Header>{item.username}</List.Header>
              </List.Content>
            </List.Item>
          </List>
        );
      })}
    </div>
  );
}

export default SearchItem;
