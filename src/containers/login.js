import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import "../assets/css/login.css";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// Static User ID and Password
const STATIC_USER = {
  userid: "admin",
  password: "password123",
};

export default function LoginPage() {
  const history = useHistory();

  const LoginSchema = Yup.object().shape({
    userid: Yup.string().required("User ID is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    // Check if token exists and redirect if true
    if (localStorage.getItem("token")) {
      history.push("/dashboard");
    }
  }, [history]);

  const formik = useFormik({
    initialValues: {
      userid: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (data) => {
      // Check if entered credentials match static user
      if (data.userid === STATIC_USER.userid && data.password === STATIC_USER.password) {
        // Successful login, save token and redirect to dashboard
        localStorage.setItem("token", "sample-token"); // Simulating token
        history.push("/dashboard");
      } else {
        alert("Invalid credentials!"); // Invalid credentials handling
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit } = formik;

  return (
    <div className="form-box">
      <div className="fullHeight p-ai-center p-d-flex p-jc-center">
        <div className="shadow card m-3 px-3 py-4 px-sm-4 py-sm-5">
          <div className="avatar-container text-center mb-4">
            {/* Custom Avatar Image */}
            <img 
              src="https://www.w3schools.com/w3images/avatar5.png" 
              alt="Avatar"
              className="avatar-image"
              style={{ width: 60, height: 60, borderRadius: "50%", backgroundColor: "#00796b" }}
            />
          </div>
          <h4 className="text-center">Sign In</h4>
          <p className="text-center mb-3">Enter your details below.</p>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit} className="p-fluid">
              <div className="p-field">
                <span className="p-float-label">
                  <InputText
                    id="userid"
                    name="userid"
                    value={formik.values.userid}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": Boolean(touched.userid && errors.userid),
                    })}
                  />
                  <label
                    htmlFor="userid"
                    className={classNames({
                      "p-error": Boolean(touched.userid && errors.userid),
                    })}
                  >
                    User ID
                  </label>
                </span>
                {Boolean(touched.userid && errors.userid) && (
                  <small className="p-error">{formik.errors["userid"]}</small>
                )}
              </div>

              <div className="p-field">
                <span className="p-float-label">
                  <Password
                    id="password"
                    name="password"
                    toggleMask
                    feedback={false}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": Boolean(touched.password && errors.password),
                    })}
                  />
                  <label
                    htmlFor="password"
                    className={classNames({
                      "p-error": Boolean(touched.password && errors.password),
                    })}
                  >
                    Password*
                  </label>
                </span>
                {Boolean(touched.password && errors.password) && (
                  <small className="p-error">{formik.errors["password"]}</small>
                )}
              </div>

              <div className="forgotPassword text-right">
                <Link to="/forgot-password">
                  <u>Forgot Password</u>
                </Link>
              </div>

              <div className="submitBtnBox">
                <Button
                  type="submit"
                  label="Login"
                  iconPos="right"
                  loading={isSubmitting}
                  className="mt-4 submitBtn"
                  disabled={isSubmitting}
                />
              </div>

              <div className="signupBox mt-3 text-center">
                Don’t have an account? <Link to="/register">Get started</Link>
              </div>
            </Form>
          </FormikProvider>
        </div>
      </div>
    </div>
  );
}
