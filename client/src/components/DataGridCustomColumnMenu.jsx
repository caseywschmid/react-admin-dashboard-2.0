// Allows you to change the tooltip options for columns on Data Grid
// In this case, added a filter option 

import {
  GridColumnMenuContainer,
  GridFilterMenuItem,
  HideGridColMenuItem,
} from "@mui/x-data-grid";

const CustomColumnMenu = ({ hideMenu, currentColumn, open }) => {
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      <GridFilterMenuItem
        onClick={hideMenu}
        column={currentColumn}
      ></GridFilterMenuItem>
      <HideGridColMenuItem
        onClick={hideMenu}
        column={currentColumn}
      ></HideGridColMenuItem>
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;
