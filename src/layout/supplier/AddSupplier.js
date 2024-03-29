import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Paper } from "@material-ui/core";
import Navbar from "../../components/navbar/Navbar";
import SideBar from "../../components/sidebar/SideBar";
import { Alert, Button, FormHelperText } from "@mui/material";
import axios from "axios";
import { ADD_COMPANY } from "../../utils/config";
import SnackBar from "../../components/alert/SnackBar";

export default function AddSupplier() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [personName, setPersonName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [license, setLicense] = useState("");
  const [email, setEmail] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // error states
  const [codeError, setCodeError] = useState("");
  const [nameError, setNameError] = useState("");
  const [personNameError, setPersonNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [licenseError, setLicenseError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");

  const [openingBalance, setOpeningBalance] = useState("");
  const [status, setStatus] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  var supplier = {
    code: "",
    name: "",
    person: "",
    phoneNumber: "",
    description: "",
    license: "",
    address: "",
    email: "",
    accountNumber: "",
  };
  const addSupplier = () => {
    const supplier = {
      code,
      name,
      person: personName,
      phoneNumber: phone,
      description,
      license,
      address,
      email,
      accountNumber,
    };

    axios
      .post(ADD_COMPANY, supplier)
      .then((response) => {
        if (response.data.error) {
          handleSnackbar("error", response.data.error);
        } else {
          handleSnackbar("success", response.data.message);
       
        }
      })
      .catch((error) => {
        handleSnackbar("error", error.response.data.error);
      });
  };

  const validation = () => {
    setCodeError("");
    setNameError("");
    setPhoneError("");
    setAddressError("");
    setEmailError("");
    setLicenseError("");
    setCodeError("");
    setDescriptionError("");
    setAccountNumberError("");
    setPersonNameError("");

    let isValid = true;

    if (code.trim() === "") {
      setCodeError("Enter code");
      isValid = false;
    }
    if (name.trim() === "") {
      setNameError("Enter company name");
      isValid = false;
    }

    if (phone.trim() === "") {
      setPhoneError("Enter phone");
      isValid = false;
    } else if (phone.trim().length < 11 || phone.trim().length > 13) {
      setPhoneError("Phone number must be between 11 and 13 characters");
      isValid = false;
    }
    
    if (address.trim() === "") {
      setAddressError("Enter address");
      isValid = false;
    }

    if (email.trim() === "") {
      setEmailError("Enter email");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address");
      isValid = false;
    }
    

    if (license.trim() === "") {
      setLicenseError("Enter license");
      isValid = false;
    }

    if (description.trim() === "") {
      setDescriptionError("Enter descrption");
      isValid = false;
    }

    if (accountNumber.trim() === "") {
      setAccountNumberError("Enter account number ");
      isValid = false;
    }

    if (personName.trim() === "") {
      setPersonNameError("Enter person name");
      isValid = false;
    }

    if (isValid) {
      addSupplier();
    } else {
      handleSnackbar("error", "Enter valid values!");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSnackbar = (severity, message) => {
    setOpen(true);
    setSeverity(severity);
    setMessage(message);
  };
  return (
    <div className="box">
      <SideBar />
      <div className="box-container">
        <Navbar />
        <Paper className="form-container">
          <Typography variant="h6" gutterBottom>
            Add Company
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              {/* <TextField  
  required
                required
                label="Company Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              /> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField  
  required
                label="Code"
                fullWidth
                variant="outlined"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {codeError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField  
  required
                label="Company Name"
                fullWidth
                variant="outlined"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {nameError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField  
  required
                label="Contacted Person Name"
                fullWidth
                variant="outlined"
                value={personName}
                onChange={(event) => setPersonName(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {personNameError}
              </FormHelperText>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField  
  required
                label="Email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {emailError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField  
  required
                label="Address"
                fullWidth
                variant="outlined"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {addressError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField  
  required
                label="Phone Number"
                fullWidth
                type="number"
                variant="outlined"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {phoneError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField  
  required
                label="License Number"
                fullWidth
                variant="outlined"
                value={license}
                onChange={(event) => setLicense(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {licenseError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField  
  required
                label="Account Number"
                fullWidth
                variant="outlined"
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {accountNumberError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField  
  required
                label="Description"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <FormHelperText style={{ color: "red" }}>
                {descriptionError}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <FormControlLabel
                control={
                  <Checkbox color="secondary" name="status" value="false" />
                }
                label="Status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              /> */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid
                justifyContent={"flex-end"}
                container
                spacing={1}
                direction={"row"}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="success"
                    onClick={() => validation()}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="error"
                    onClick={() => {
                      setName("");
                      setPhone("");
                      setOpeningBalance("");
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <SnackBar
          open={open}
          severity={severity}
          message={message}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}
