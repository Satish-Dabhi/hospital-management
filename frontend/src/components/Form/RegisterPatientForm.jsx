import { Button, InputAdornment } from "@mui/material";
import { CREATE_PATIENT, POST_API, UPDATE_PATIENT } from "../../Services/api";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect } from "react";

import { Box } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import { MessageBarContext } from "../../App";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { getDateFormate } from "../../Services/util";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

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

  // Button style
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

const RegisterPatientForm = ({ data, editPatient, pId }) => {
  const { setMessageBar } = useContext(MessageBarContext);

  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      address: "",
      contactNumber: "",
      weight: "",
      gender: "",
      age: "",
      referDoctor: "",
      consultantDoctor: "",
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "billCharges"
  });

  const billChargesList = [
    'FIRST CONSULTATION CHARGE - 100',
    'SECOND CONSULTATION CHARGE - 50',
    'EMERGENCY CONSULTATION CHARGE - 500',
    'ECG CHARGE - 200',
    'RBS CHARGE - 50',
    'I.C.U. CHARGE - 3000',
    'SPECIAL ROOM CHARGE - 2000',
    'SEMI SPECIAL ROOM CHARGE - 1500',
    'GENERAL WARD CHARGE - 1000',
    'PRE OPERATIVE FITNESS CHARGE - 600',
    'NEBULISATION CHARGE - 50',
    'INTUBATION CHARGE - 1500',
    'DEFIBRILLATOR CHARGE - 1000',
    'I.C.D. CHARGE - 3000',
    'PLUERAL FLUID TAPING CHARGE - 3000',
    'ASCITIC FLUID TAPING CHARGE - 3000',
    'DOCTOR VISIT CHARGE - 1000',
    'MEDICAL OFFICER VISIT CHARGE - 500',
    'NURSING STAFF CHARGE - 300',
    'OXYGEN CHARGE - 1000',
    'BIOMEDICAL WASTE CHARGES - 200',
    'DRESSING CHARGE(SMALL) - 100',
    'DRESSING CHARGE(BIG) - 300',
    'DAY CARE ADMISSION CHARGES - 500',
    'EMERGENCY ROOM CHARGE - 2000',
    'ADMISSION CHARGE - 250',
    'MULTIPARA MONITOR CHARGE - 500',
    'INFUSION PUMP CHARGE - 500',
  ];  

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      reset({
        billCharges: data.billCharges,
        name: data.name,
        date: getDateFormate(data.date),
        address: data.address,
        contactNumber: data.contactNumber,
        weight: data.weight,
        age: data.age,
        gender: data.gender,
        referDoctor: data.referDoctor,
        consultantDoctor: data.consultantDoctor
      });
    }
  }, [data]);

  // submit
  const onSubmit = async (data) => {
  const filteredBillCharges = data.billCharges.filter(
    (charge) => charge.chargeList && charge.days
  );

  const updatedData = { ...data, billCharges: filteredBillCharges };

    const patientResponse = await POST_API(
      editPatient ? UPDATE_PATIENT : CREATE_PATIENT,
      editPatient
        ? {
          ...updatedData,
          _id: pId,
        }
        : updatedData
    );
    if (patientResponse?.status === "done") {
      setMessageBar({
        open: true,
        severity: "success",
        message: patientResponse.message,
      });
    } else {
      setMessageBar({
        open: true,
        severity: "error",
        message: patientResponse.message,
      });
    }

    navigate("/patients");
  };

  return (
    <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        fullWidth
        type="date"
        label="Date Of Entry"
        {...register("date", { required: true })}
        error={errors.date}
        helperText={errors.date && "Enter a valid date"}
        style={{ width: "100%" }}
        InputLabelProps={{ shrink: true }}
      />
      <Box
        sx={{
          display: "grid",
          gap: { xs: 3, sm: 2 },
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="Patient Name"
          {...register("name", { required: true })}
          error={errors.name}
          helperText={errors.name && "Enter a valid Patient Name"}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Patient weight"
          {...register("weight", {
            required: true,
            pattern: {
              value: /^\d{0,3}$/,
              message: "Enter a valid weight with exactly 3 digits",
            },
          })}
          error={errors.weight}
          helperText={errors.weight && "Enter a valid weight"}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Patient Age"
          {...register("age", {
            required: true,
            pattern: {
              value: /^\d{0,3}$/,
              message: "Enter a valid weight with exactly 3 digits",
            },
          })}
          error={errors.age}
          helperText={errors.age && "Enter a valid Patient Age"}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Contact Number"
          {...register("contactNumber", {
            required: true,
            pattern: {
              value: /^\d{10}$/,
              message: "Enter a valid weight with exactly 3 digits",
            },
          })}
          error={errors.contactNumber}
          helperText={errors.contactNumber && "Enter a valid Contact Number"}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Gender</FormLabel>
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          )}
        />
        {errors.gender && <span>Choose a gender</span>}
      </FormControl>

      <TextField
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        type="text"
        label="Patient Address"
        {...register("address", { required: true })}
        error={errors.address}
        helperText={errors.address && "Enter a valid address"}
        InputLabelProps={{ shrink: true }}
      />

      <Box
        sx={{
          display: "grid",
          gap: { xs: 3, sm: 2 },
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="Refer Doctor"
          {...register("referDoctor", { required: true })}
          error={errors.referDoctor}
          helperText={errors.referDoctor && "Refer Doctor"}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="Consultant Doctor"
          {...register("consultantDoctor", { required: true })}
          error={errors.consultantDoctor}
          helperText={errors.consultantDoctor && "Consultant Doctor"}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Typography variant="h5" className="form-title">Bill Details</Typography>

      {fields.map(({ id, chargeList, days }, index) => (
        <div key={id}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 3, sm: 2 },
              gridTemplateColumns: { xs: "1fr", sm: "5fr 3fr 1fr" },
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">List</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="billCharges-${index}"
                label="Age"
                defaultValue={chargeList}
                {...register(`billCharges[${index}].chargeList`)}
              >
                {billChargesList.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              fullWidth
              type="number"
              label="Days"
              {...register(`billCharges[${index}].days`)}
              InputLabelProps={{ shrink: true }}
              defaultValue={days}
            />
            <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => remove(index)} color="error">
              Delete
            </Button>
          </Box>
        </div>
      ))}

      <Button variant="outlined" endIcon={<ReceiptLongIcon />} onClick={() => append({})}>
        Add Bill Charges
      </Button>

      <Button type="submit" variant="contained" disableElevation>
        {editPatient ? "UPDATE" : "SUBMIT"}
      </Button>
    </FormStyle>
  );
};

export default RegisterPatientForm;
