import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  url: Yup.string().required("Required")
});

export default function BookmarkForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ title: "", url: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
      render={({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="form bookmark-form">
          <label htmlFor="title" className="bookmark-form_label">
            Title:
          </label>
          <Field
            className="form-input"
            type="text"
            name="title"
            className="bookmark-form_field"
          />
          <ErrorMessage name="title" component="div" className="form-error" />
          <label htmlFor="url" className="bookmark-form_label">
            Url:
          </label>
          <Field
            className="form-input"
            type="text"
            name="url"
            className="bookmark-form_field"
          />
          <ErrorMessage name="url" component="div" className="form-error" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    />
  );
}
