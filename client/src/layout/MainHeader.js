import { useState } from "react";

import { AppBar, Box, IconButton, styled, Toolbar } from "@material-ui/core";

import { drawerWidth } from "./DashboardLayout";

// icons
import { BiSearch } from "react-icons/bi";
import { RiMenu3Line } from "react-icons/ri";

// components
import UserMenu from "../components/MainHeader/UserMenu";

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  backgroundColor: "rgba(255, 255, 255, 0.72)",
  color: "#333333",
  [theme.breakpoints.up("sm")]: {
    width: `calc(100% - ${drawerWidth}px)`,
    flexShrink: 0,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignContent: "flex-start",
  alignItems: "center",
}));

const ContainerStyle = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(0.5),
  gridAutoFlow: "column",
}));

const ToggleButtonStyle = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const MainHeader = (props) => {
  const [showUserMenu, setShowUserMenu] = useState(null);

  // User Menu
  const handleOpenUserMenu = (e) => setShowUserMenu(e.currentTarget);
  const handleCloseUserMenu = () => setShowUserMenu(null);

  return (
    <AppBarStyle position="fixed">
      <ToolbarStyle>
        {/* Left side's items */}
        <ContainerStyle>
          <ToggleButtonStyle
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.onClick}
          >
            <RiMenu3Line />
          </ToggleButtonStyle>

          {/* <IconButton aria-label="search">
            <BiSearch fontSize="small" />
          </IconButton> */}
        </ContainerStyle>

        {/* Right side's items */}
        <ContainerStyle>
          <UserMenu
            anchorEl={showUserMenu}
            onOpen={handleOpenUserMenu}
            onClose={handleCloseUserMenu}
          />
        </ContainerStyle>
      </ToolbarStyle>
    </AppBarStyle>
  );
};

export default MainHeader;
