import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ReactComponent as Close } from "../../assets/images/close.svg";

const validationSchema = Yup.object().shape({
  url: Yup.string().required("Required")
});

export default function BookmarkForm({ onSubmit, handleHideAddBookmarks }) {
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
          <label htmlFor="url" className="bookmark-form_label">
            Url
          </label>
          <Field
            type="text"
            name="url"
            className="bookmark-form_field"
            onKeyDown={e => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          {/* <ErrorMessage name="url" component="div" className="form-error" /> */}
          <button
            type="submit"
            className="bookmark-form_button"
            disabled={isSubmitting}
            onClick={handleHideAddBookmarks}
          >
            {/* Submit */}
            <Close />
          </button>
        </Form>
      )}
    />
  );
}
