import React from 'react';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router-dom';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const LeftDrawer = props => (
  <Drawer open={props.open}>
    <div
      onClick={props.toggle}
      style={{padding: '20px 20px 10px', textAlign: 'right'}}>
      <NavigationClose />
    </div>
    <Menu onItemTouchTap={props.toggle}>
      {props.routes
        .filter(r => r.name === 'home')
        .map(r => (
          <MenuItem
            linkButton
            containerElement={<Link to={r.path} />}
            primaryText={r.title}
          />
        ))}
      <Divider />
      <Subheader>Ejercicios</Subheader>
      {props.routes
        .filter(r => r.exercise)
        .map(r => (
          <MenuItem
            linkButton
            containerElement={<Link to={r.path} />}
            primaryText={r.title}
          />
        ))}
      <Divider />
    </Menu>
  </Drawer>
);

export default LeftDrawer;
