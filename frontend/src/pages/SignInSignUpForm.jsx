import { Container, Typography } from "@mui/material";

import { Box } from "@mui/system";
import LeftPanel from "../components/Form/LeftPanel";
import LoginPhoto from "../images/auth/login.png";
import SignInForm from "../components/Form/SignInForm";
import SignUpForm from "../components/Form/SignUpForm";
import { styled } from "@mui/material/styles";

// styles
const ContainerBoxStyle = styled(Box)(({ theme }) => ({
  minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight * 2}px)`,
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: `350px 1fr`,

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: `1fr`,
  },
}));

const RightPanelStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",

  "& .account_switch": {
    textAlign: "right",
    paddingRight: theme.spacing(3),
    marginBottom: theme.spacing(8),
    "& .MuiLink-underlineNone	": {
      color: theme.palette.green.darker,
      fontWeight: 500,
    },
    [theme.breakpoints.down("sm")]: {
      paddingRight: theme.spacing(1.5),
    },
  },

  "& .form_Container": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    "& .MuiTypography-h4": {
      fontSize: 25,
      fontWeight: 500,
    },
    "& .MuiTypography-paragraph": {
      margin: "8px 0 20px 0",
    },
  },
}));

const SignInSignUpForm = ({ isSignInForm }) => {
  return (
    <>
      <title>{isSignInForm ? "Sign In" : "Sign Up"} | Arogya Care Hub</title>

      <ContainerBoxStyle container="true">
        <LeftPanel
          title="Hi, Welcome Back"
          img={LoginPhoto}
          imgAlt="Login Image"
        />

        <RightPanelStyle>
          <Container maxWidth="xs" className="form_Container">
            <Typography variant="h4">
              {isSignInForm ? "Sign In" : "Sign Up"} to Arogya Care Hub
            </Typography>
            <Typography paragraph color="textSecondary">
              Enter your details below.
            </Typography>
            {isSignInForm ? <SignInForm /> : <SignUpForm />}
          </Container>
        </RightPanelStyle>
      </ContainerBoxStyle>
    </>
  );
};

export default SignInSignUpForm;
