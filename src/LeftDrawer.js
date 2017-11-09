import React from "react";
import Drawer from "material-ui/Drawer";
import NavigationClose from "material-ui/svg-icons/navigation/close";

const LeftDrawer = props => (
  <Drawer open={props.open}>
    <NavigationClose onClick={props.toggle} />
  </Drawer>
);

export default LeftDrawer;
