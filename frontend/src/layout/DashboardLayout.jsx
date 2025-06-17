import { Box, Toolbar, styled } from "@mui/material";

import MainHeader from "./MainHeader";
import SideDrawer from "./SideDrawer";
import { useState } from "react";

const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  padding: theme.spacing(2.5),
  width: "100%",
}));

const DashboardLayout = (props) => {
  // window width
  const { window } = props;
  const [toggleMenu, setToggleMenu] = useState(false);

  // toggle drawer
  const handleToggleDrawer = () => setToggleMenu(!toggleMenu);
  const handleToggleClose = () => setToggleMenu(false);

  // I don't know the work of container yet
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <MainHeader onClick={handleToggleDrawer} />

      {/* Drawer */}
      <SideDrawer
        container={container}
        toggleMenu={toggleMenu}
        onClose={handleToggleClose}
      />

      {/* Content */}
      <MainStyle>
        <Toolbar />
        {/* Main parts */}
        {props.children}
      </MainStyle>
    </Box>
  );
};

export default DashboardLayout;

export const drawerWidth = 240;
