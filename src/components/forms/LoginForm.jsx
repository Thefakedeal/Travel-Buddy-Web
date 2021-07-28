import React from "react";
import { Input, Button, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Formik, Field } from "formik";
import {useHistory} from 'react-router-dom';
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { login } from "../../helpers/auth";

const UserSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginForm() {
  const { setToken } = useAuth();
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={UserSchema}
      onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
        setSubmitting(true);
        const data = await login(values);
        if (data.success) {
          const token = data.body.token;
          setToken(token);
          history.replace("/");
        }
        //Error
        const errorArray = data.body?.errors || [];
        const errors = errorArray.reduce(function (acc, cur) {
          acc[cur.param] = cur.msg;
          return acc;
        }, {});
        setErrors(errors);
        setStatus(data.body.message);
        setSubmitting(false);
      }}
    >
      {({ errors, values, handleSubmit, handleChange, status, isSubmitting }) => (
        <div>
            {status}
          <div className="row align-items-center py-2">
            <div className="col-md-3">
              Email <span className="text-danger">*</span>
            </div>
            <div className="col-md-9">
              <Field
                component={Input}
                name="email"
                onChange={handleChange("email")}
                prefix={<UserOutlined />}
                placeholder="Email"
              />
              <small className="text-danger">{errors.email}</small>
            </div>
          </div>
          <div className="row align-items-center py-2">
            <div className="col-md-3">
              Password <span className="text-danger">*</span>
            </div>
            <div className="col-md-9">
              <Field
                component={Input.Password}
                name="password"
                onChange={handleChange("password")}
                prefix={<LockOutlined />}
                placeholder="Password"
              />
              <small className="text-danger">{errors.password}</small>
            </div>
          </div>

          <div className="py-4">
            <Button
              className="float-end"
              onClick={handleSubmit}
              type="primary"
              disabled={isSubmitting}
            >
              {isSubmitting?<Spin /> : <UserOutlined />} Login
            </Button>
          </div>
        </div>
      )}
    </Formik>
  );
}
