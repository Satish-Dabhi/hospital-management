import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { TextField } from "@mui/material";
import CryptoJS from 'crypto-js';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MessageBarContext } from "../../App";
import { HOSPITAL_SIGN_UP_API, HOSPITAL_VERIFY_OTP_API, LOCAL_OBJECT_SECRET_KEY, POST_API, USER_SERVICE, VERIFY_TOKEN } from "../../Services/api";
import { getLocalStorageObject, setLocalStorageObject } from "../../Services/util";

// style
const FormStyle = styled("form")(({ theme }) => ({
  // root style
  marginTop: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(3),

  // input style
  "& label.Mui-focused": {
    color: theme.palette.success.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.success.main,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.success.main,
    },
  },

  // error
  "& .Mui-error.MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.error.light,
    },
  },
  "& label.Mui-error.Mui-focused": {
    color: theme.palette.error.light,
  },

  // checkbox style
  "& .MuiCheckbox-root": {
    color: theme.palette.success.light,
  },
  "& .Mui-checked": {
    color: theme.palette.success.main,
  },

  // forgot link style
  "& a": {
    color: theme.palette.success.main,
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.success.light,
    },
  },

  // button style
  "& .MuiButton-contained": {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    textTransform: "capitalize",
    padding: theme.spacing(1.25),
    boxShadow: `rgb(0 171 85 / 24%) 0px 8px 16px 0px`,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      boxShadow: "none",
    },
  },
}));

const SignUpForm = () => {
  const [showPassword, setShowPassord] = useState(false);
  const handleTogglePassword = () => setShowPassord(!showPassword);
  const [showOTPField, setShowOTPField] = useState(false);

  const { setMessageBar } = useContext(MessageBarContext);


  const navigate = useNavigate();

  useEffect(() => {
    const user = getLocalStorageObject('arogyaToken');
    const loggedInUser =
      user && CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(loggedInUser);

    async function verifyTokenIsValid(token) {
      const verifyTokenData = await POST_API(VERIFY_TOKEN, { token: token });
      if (verifyTokenData?.valid) {
        navigate('/');
      }
    }

    if (userData?.token) {
      verifyTokenIsValid(userData?.token);
    }
  }, [navigate]);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      otp: ""
    },
  });

  // prevent Default
  const preventDefault = (e) => e.preventDefault();

  // form submit
  const onSubmit = async (data) => {
    const { name, email, password } = data;
    const hospitalResponse = await USER_SERVICE(HOSPITAL_SIGN_UP_API, {
      name,
      email,
      password,
    });

    if (hospitalResponse.status === 'created') {
      setMessageBar({
        open: true,
        severity: "success",
        message: "Verification code sent",
      });

      const userData = CryptoJS.AES.encrypt(
        JSON.stringify(hospitalResponse),
        LOCAL_OBJECT_SECRET_KEY
      ).toString();
      setLocalStorageObject('arogyaToken', userData);
      setShowOTPField(true);
    } else {
      setMessageBar({
        open: true,
        severity: "error",
        message: hospitalResponse.message,
      });
    }
  };

  const handleOTPSubmit = async (data) => {
    console.log('setShowOTPField(true);setShowOTPField(true);', data);
    const { email, otp, name } = data;
    const verifyOtpResponse = await USER_SERVICE(HOSPITAL_VERIFY_OTP_API, {
      name,
      email,
      otp,
    });

    if (verifyOtpResponse.verified) {
      setMessageBar({
        open: true,
        severity: "success",
        message: verifyOtpResponse.message,
      });

      const userData = CryptoJS.AES.encrypt(
        JSON.stringify(verifyOtpResponse),
        LOCAL_OBJECT_SECRET_KEY
      ).toString();
      setLocalStorageObject('arogyaToken', userData);
      setShowOTPField(true);
      navigate("/");
    } else {
      setMessageBar({
        open: true,
        severity: "error",
        message: verifyOtpResponse.message,
      });
    }
  };

  return (
    <FormStyle component="form" onSubmit={handleSubmit(showOTPField ? handleOTPSubmit : onSubmit)}>
      <TextField
        variant="outlined"
        fullWidth
        type="text"
        label="Name"
        error={errors.name ? true : false}
        helperText={errors.name && "Name is required."}
        {...register("name", { required: true })}
      />

      <TextField
        variant="outlined"
        fullWidth
        type="text"
        label="Email"
        error={errors.email ? true : false}
        helperText={errors.email && errors.email.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        })}
      />

      <TextField
        variant="outlined"
        fullWidth
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleTogglePassword}>
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Password"
        error={errors.password ? true : false}
        helperText={
          errors.password && "Enter a valid password (5-15 characters)."
        }
        {...register("password", {
          required: true,
          minLength: 5,
          maxLength: 15,
        })}
      />

      <TextField
        variant="outlined"
        fullWidth
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleTogglePassword}>
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Re-enter Password"
        error={errors.rePassword ? true : false}
        helperText={
          errors.rePassword && "Enter a valid password (5-15 characters)."
        }
        {...register("rePassword", {
          required: true,
          minLength: 5,
          maxLength: 15,
        })}
      />

      {showOTPField && (
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="OTP"
          error={errors.otp ? true : false}
          helperText={errors.otp && "OTP is required."}
          {...register("otp", { required: true })}
        />
      )}

      <Button type="submit" variant="contained" disableElevation>
        {showOTPField ? 'Verify OTP' : 'Send OTP'}
      </Button>

      <Grid container>
        <Grid item>
          <Link href="/sign-in" variant="body2">
            {"Already have an account? Sign In"}
          </Link>
        </Grid>
      </Grid>
    </FormStyle>
  );
};

export default SignUpForm;
