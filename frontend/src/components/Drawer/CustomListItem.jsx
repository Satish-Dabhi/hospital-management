import { Box, ListItem, ListItemIcon, Typography, styled } from "@mui/material";

import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles"; // for theme access

// Styled ListItem
const ListItemStyle = styled(ListItem)({
  padding: 0,
});

// Styled NavLink with active style support
const CustomLinkStyle = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  width: "100%",
  padding: "8px 8px 8px 32px",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  color: theme.palette.gray.main,
  backgroundColor: active ? theme.palette.green.lighter : "inherit",
  borderRight: active ? `3px solid ${theme.palette.green.darker}` : "none",
  "& .MuiListItemIcon-root": {
    minWidth: "auto",
    marginRight: theme.spacing(2),
    color: "inherit",
    fontSize: 18,
  },
  "& h6": {
    fontSize: 15,
    fontWeight: active ? 600 : 400,
    color: active
      ? `${theme.palette.green.darker} !important`
      : theme.palette.gray.main,
  },
}));

const CustomListItem = (props) => {
  // theme is available for use if needed elsewhere
  const theme = useTheme();

  return (
    <ListItemStyle button onClick={props.onClick}>
      <CustomLinkStyle
        to={props.path}
        // NavLink provides isActive to its children as a function
        // We use this to set the "active" prop for styled
        style={({ isActive }) => ({
          // no-op, we handle active in styled via prop
        })}
        active={undefined} // workaround to prevent React warning
        // Use the function-as-child pattern to get isActive
        children={({ isActive }) => (
          <Box
            component="span"
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              color: isActive
                ? theme.palette.green.darker
                : theme.palette.gray.main,
              backgroundColor: isActive
                ? theme.palette.green.lighter
                : "inherit",
              borderRight: isActive
                ? `3px solid ${theme.palette.green.darker}`
                : "none",
              "& .MuiTypography-subtitle1": {
                fontWeight: isActive ? 600 : 400,
              },
            }}
          >
            <ListItemIcon>{props.icon}</ListItemIcon>
            <Typography variant="subtitle1" component="h6">
              {props.title}
            </Typography>
          </Box>
        )}
      />
    </ListItemStyle>
  );
};

export default CustomListItem;
