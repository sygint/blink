import React from "react";
// import { Form, Input, Button } from "semantic-ui-react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import "./BookmarkForm.scss";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  url: Yup.string().required("Required")
});

export default function BookmarkForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{
        title: "",
        url: ""
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onSubmit(values);
      }}
      render={({ errors, status, touched, isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title" className="form-label form-inline">
              Title:
            </label>
            <Field type="text" name="title" />
            {errors.title && touched.title && <div>{errors.title}</div>}
          </div>

          <label htmlFor="url" className="form-label form-inline">
            Url:
          </label>
          <Field type="text" name="url" />
          {errors.url && touched.url && <div>{errors.url}</div>}

          {status && status.msg && <div>{status.msg}</div>}

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    />
  );
}
