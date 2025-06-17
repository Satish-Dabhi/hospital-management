import { Button, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Box } from "@mui/system";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

// style
const BoxStyle = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(2)}px 0`,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "& .MuiTypography-root": {
    fontSize: 30,
    fontWeight: 500,
  },

  "& .MuiButton-root": {
    fontSize: 10,
    fontWeight: 600,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
    boxShadow: theme.shadows[5],

    "&:hover": {
      boxShadow: "none",
    },
  },
}));

const UserHeader = () => {
  const navigate = useNavigate();

  return (
    <BoxStyle>
      <Typography variant="h3" className="form-title">Sanjivni - Patients</Typography>
      <Button variant="contained" disableElevation startIcon={<BiPlus />} onClick={() => navigate("/patient")}>
        New Patient
      </Button>
    </BoxStyle>
  );
};

export default UserHeader;
