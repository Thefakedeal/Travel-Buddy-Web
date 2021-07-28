import React from "react";
import { useHistory } from "react-router-dom";
import { Input, Button,Spin } from "antd";
import { UserOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { register } from "../../helpers/auth";
import useAuth from "../../hooks/useAuth";

const UserSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name Is Too Short").required("Name is Required"),
  email: Yup.string().email("Invalid Email!").required("Email is required."),
  password: Yup.string().min(5, "Password is Too short."),
  repassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Passwords Must Match"),
});

export default function RegisterForm() {
  const { setToken } = useAuth();
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        repassword: "",
      }}
      validationSchema={UserSchema}
      onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
        setSubmitting(true);
        const data = await register(values);

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
      {({
        errors,
        status,
        handleChange,
        isSubmitting,
        handleSubmit,
      }) => (
        <div>
          {status}
          <div className="row align-items-center py-2">
            <div className="col-md-3">
              Name <span className="text-danger">*</span>{" "}
            </div>
            <div className="col-md-9">
              <Field
                component={Input}
                name="name"
                onChange={handleChange("name")}
                prefix={<UserOutlined />}
                placeholder="Name"
              />
              <small className="text-danger">{errors.name}</small>
            </div>
          </div>
          <div className="row align-items-center py-2">
            <div className="col-md-3">
              Email <span className="text-danger">*</span>{" "}
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
          <div className="row align-items-center py-2">
            <div className="col-md-3">
              Re-Password <span className="text-danger">*</span>
            </div>
            <div className="col-md-9">
              <Field
                component={Input.Password}
                name="repassword"
                onChange={handleChange("repassword")}
                prefix={<LockOutlined />}
                placeholder="Re-Password"
              />
              <small className="text-danger">{errors.repassword}</small>
            </div>
          </div>
          <div className="py-4">
            <Button className="float-end" onClick={handleSubmit} type="primary" disabled={isSubmitting}>
              {isSubmitting?<Spin/>:<UserAddOutlined />} Register
            </Button>
          </div>
        </div>
      )}
    </Formik>
  );
}
