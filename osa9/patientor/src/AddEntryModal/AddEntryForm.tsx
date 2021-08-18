import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "./FormField";
import { NewEntryFormValues } from "../types";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */

interface Props {
  onSubmit: (values: NewEntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        type: "OccupationalHealthcare",
        employerName: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer Name"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Type"
              placeholder="OccupationalHealthcare"
              name="type"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
