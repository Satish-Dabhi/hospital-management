// icons
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  Typography
} from "@material-ui/core";
import { makeStyles, styled, withStyles } from "@material-ui/styles";
import CryptoJS from 'crypto-js';

// icons & images
import { LOCAL_OBJECT_SECRET_KEY } from "../../Services/api";
import { getLocalStorageObject, removeLocalStorageObject } from "../../Services/util";
import userAvatar from "../../images/avatar_default.jpg";

// styles
const useStyles = makeStyles((theme) => ({
  grayMain: {
    color: theme.palette.gray.main,
  },
  grayDark: {
    color: theme.palette.gray.dark,
  },
  listHeader: {
    color: theme.palette.gray.main,
    margin: "8px 0",
    paddingLeft: theme.spacing(2),
    letterSpacing: 1,
    fontSize: theme.spacing(2),
    fontWeight: 600,
  },
}));

const StyledMenu = withStyles((theme) => ({
  paper: {
    maxWidth: 225,
    width: "90%",
    boxShadow: `0 2px 10px -5px ${theme.palette.green.darker}`,
  },
}))((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const BoxStyle = styled(Box)(({ theme }) => ({
  padding: "10px 16px",
}));

const AvatarButtonStyle = styled(IconButton)(({ theme }) => ({
  padding: "2px 6px",
  "& .MuiAvatar-root": {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const LinkStyle = styled(Link)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  padding: theme.spacing(1),
  color: theme.palette.common.black,
  fontSize: theme.spacing(2.25),
  fontWeight: 500,
  border: "1px solid #333",
  borderRadius: theme.spacing(0.75),
  transition: "background 0.25s ease-in",
  "&:hover": {
    backgroundColor: theme.palette.gray.lighter,
    underline: "none",
  },
}));


const UserMenu = (props) => {
  const classes = useStyles();
  const user = getLocalStorageObject('arogyaToken');
  const loggedInUser =
    user && CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  const userData = JSON.parse(loggedInUser);

  return (
    <>
      <AvatarButtonStyle
        aria-controls="notifications"
        aria-haspopup="true"
        onClick={props.onOpen}
      >
        <Avatar src={userAvatar} alt="User Name">
          SATISH DABHI
        </Avatar>
      </AvatarButtonStyle>

      <StyledMenu
        id="notificationsMenu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.onClose}
      >
        {/* Header */}
        <BoxStyle>
          <Typography variant="h6" component="h3">
            {userData?.user?.name}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            className={classes.grayMain}
          >
            {userData?.user?.email}
          </Typography>
        </BoxStyle>

        <Divider />

        <BoxStyle>
          <LinkStyle href="/sign-in" underline="none" onClick={() => removeLocalStorageObject('arogyaToken')}>
            Logout
          </LinkStyle>
        </BoxStyle>
      </StyledMenu>
    </>
  );
};

export default UserMenu;
