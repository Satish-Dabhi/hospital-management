import {
  Avatar,
  Drawer,
  Hidden,
  List,
  Toolbar,
  Typography,
  styled
} from "@material-ui/core";
import { Link } from "react-router-dom";

// icons & images
import CryptoJS from 'crypto-js';
import { FaUserFriends } from "react-icons/fa";
import { ImPieChart } from "react-icons/im";
import userAvatar from "../images/avatar_default.jpg";

import { LOCAL_OBJECT_SECRET_KEY } from "../Services/api";
import { getLocalStorageObject } from "../Services/util";
import CustomListItem from "../components/Drawer/CustomListItem";
import { drawerWidth } from "./DashboardLayout";

const NavDrawerStyle = styled("nav")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: drawerWidth,
    flexShrink: 0,
  },
}));

const LogoStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.green.darker,
  margin: 0,
}));

const UserCardStyle = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: "inherit",
  backgroundColor: theme.palette.gray.light,
  margin: "12px",
  padding: "14px 12px",
  borderRadius: theme.spacing(1.5),
  textDecoration: "none",
  "& .MuiTypography-root": {
    marginLeft: theme.spacing(1.5),
  },
}));

const ListStyle = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

// links for the side nav
const links = [
  {
    id: "L0",
    path: "/",
    icon: <ImPieChart />,
    title: "Dashboard",
  },
  { id: "L1", path: "/patients", icon: <FaUserFriends />, title: "Patients" }
];

const SideDrawer = (props) => {
  const user = getLocalStorageObject('arogyaToken');
  const loggedInUser =
    user && CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  const userData = JSON.parse(loggedInUser);

  const drawerContent = (
    <>
      {/* Logo */}
      <Toolbar>
        <LogoStyle variant="h6" component="h2">
          SANJIVNI DASHBOARD
        </LogoStyle>
      </Toolbar>

      {/* User Card */}
      <UserCardStyle to="/" onClick={props.onClose}>
        <Avatar src={userAvatar} alt="User Image" />

        <Typography variant="subtitle1" component="h3">
          {userData?.user?.name}
        </Typography>
      </UserCardStyle>

      {/* List of links */}
      <ListStyle>
        {links.map((el) => (
          <CustomListItem
            key={el.id}
            path={el.path}
            icon={el.icon}
            title={el.title}
            onClick={props.onClose}
          />
        ))}
      </ListStyle>
    </>
  );

  return (
    <NavDrawerStyle aria-label="Navigation Panel">
      {/* Hidden 01 for sm size */}
      <Hidden smUp implementation="css">
        <Drawer
          container={props.container}
          variant="temporary"
          //anchor={theme.direction === "rtl" ? "right" : "left"}
          open={props.toggleMenu}
          onClose={props.onClose}
          classes={{ paper: props.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {/* Drawer Component */}
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Hidden 02 for big size*/}
      <Hidden xsDown implementation="css">
        <Drawer variant="permanent" open classes={{ paper: props.drawerPaper }}>
          {drawerContent}
        </Drawer>
      </Hidden>
    </NavDrawerStyle>
  );
};

export default SideDrawer;
