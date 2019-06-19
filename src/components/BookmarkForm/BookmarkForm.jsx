import React from "react";
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
        <Form className="form">
          <div className="form-field">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <Field className="form-input" type="text" name="title" />
            {errors.title && touched.title && (
              <div className="form-error">{errors.title}</div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="url" className="form-label">
              Url:
            </label>
            <Field className="form-input" type="text" name="url" />
            {errors.url && touched.url && (
              <div className="form-error">{errors.url}</div>
            )}
          </div>

          {status && status.msg && <div>{status.msg}</div>}

          <button
            className="button form-submit"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    />
  );
}
