import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  Typography
} from "@mui/material";
import { getLocalStorageObject, removeLocalStorageObject } from "../../Services/util";

import CryptoJS from 'crypto-js';
import { LOCAL_OBJECT_SECRET_KEY } from "../../Services/api";
import { styled } from "@mui/material/styles";
import userAvatar from "../../images/avatar_default.jpg";

// Styled Menu (customizes the Paper slot)
const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    maxWidth: 225,
    width: "90%",
    boxShadow: `0 2px 10px -5px ${theme.palette.green.darker}`,
  },
}));

const BoxStyle = styled(Box)({
  padding: "10px 16px",
});

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
    textDecoration: "none",
  },
}));

const UserMenu = (props) => {
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
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* Header */}
        <BoxStyle>
          <Typography variant="h6" component="h3">
            {userData?.user?.name}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            sx={{ color: (theme) => theme.palette.gray.main }}
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
