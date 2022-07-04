import React, { useEffect } from "react";
import { useFormik, useField } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import InputAdornment from "@mui/material/InputAdornment";

const SearchForm = ({ getInput, formData, coord }) => {
  let isMobile = false;
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    isMobile = true;
  }
  const formik = useFormik({
    initialValues: {
      radius: formData.radius,
      date: formData.date,
      endDate: formData.endDate,
      // email: '',
    },
    validate,
    onSubmit: (values) => {
      values.endDate = new Date(
        new Date(values.date).getTime() + 1000 * 60 * 60 * 24
      )
        .toISOString()
        .slice(0, 19);
      getInput(values);
    },
  });
  function validate(values) {
    const errors = {};
    if (values.radius % 5 != 0) {
      errors.radius = "Must be a multiple of 5";
    }
    return errors;
  }

  function adjustRadius(radius) {
    const resto = radius % 5;
    if (!resto) {
      return radius;
    }
    let value;
    if (resto > 3) {
      value = radius + (5 - resto);
    } else {
      value = radius - resto;
    }
    return value;
  }

  function renderDatePicker() {
    if (isMobile) {
      return (
        <MobileDatePicker
          label="date"
          inputFormat="yyyy/MM/dd/"
          id="date"
          name="date"
          type="date"
          value={formik.values.date}
          onChange={(value) => {
            value = new Date(value).toISOString().slice(0, 19);
            console.log(formik);
            formik.setFieldValue("date", value);
            formik.handleSubmit();
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      );
    } else {
      return (
        <DesktopDatePicker
          label="date"
          inputFormat="yyyy/MM/dd"
          id="date"
          name="date"
          type="date"
          value={formik.values.date}
          onChange={(value) => {
            value = new Date(value).toISOString().slice(0, 19);
            console.log(formik);
            formik.setFieldValue("date", value);
            formik.handleSubmit();
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      );
    }
  }

  return (
    <div className="container">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexWrap: "wrap",
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <TextField
            sx={{ minWidth: 168 }}
            type="number"
            name="radius"
            id="radius"
            label="radius"
            value={formik.values.radius}
            InputProps={{
              endAdornment: <InputAdornment position="end">m</InputAdornment>,
            }}
            onChange={(e) => {
              formik.handleChange(e);
            }}
            onBlur={(e) => {
              if (formik.errors.radius) {
                formik.setFieldValue(
                  "radius",
                  adjustRadius(parseInt(e.target.value))
                );
              }
            }}
            inputProps={{
              step: 5,
            }}
            variant="outlined"
          />
          {formik.errors.radius && <div>{formik.errors.radius}</div>}
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {renderDatePicker()}
        </LocalizationProvider>
        <Button type="submit" sx={{ width: 2 }}>
          Apply
        </Button>
      </Box>
    </div>
  );
};

export default SearchForm;
