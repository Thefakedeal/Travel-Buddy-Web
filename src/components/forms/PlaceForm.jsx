import React,{useState} from "react";
import { Input, notification, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from 'react-router-dom'
import useAuth from "../../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { doPostForm } from "../../helpers/request";

const PlaceSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

export default function PlaceForm() {
  const [file, setFile] = useState(null);
  const { user, token } = useAuth();
  const history = useHistory();
  const clicked = useSelector((store) => store.clickedMarker);
  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        // featured_upload: null,
      }}
      validationSchema={PlaceSchema}
      onSubmit={async (value, { setSubmitting, setErrors }) => {

        const form = new FormData();
        form.set("name", value.name);
        form.set("description", value.description);
        form.set("featured_image", file);
        form.set("lat", clicked.lat);
        form.set("lon", clicked.lon);

        const response =await  doPostForm({body: form, path: 'places', token: token})

       

        if (response.ok) {
          const data = await response.json();
          history.push(`/places/${data.id}`)
          return notification.success({
            type: "success",
            message: "Place Uploaded",
            placement: "bottomRight",
          });

        }
        const data = await response.json()
        const errorArray = data.body?.errors || [];
        const errors = errorArray.reduce(function (acc, cur) {
          acc[cur.param] = cur.msg;
          return acc;
        }, {});
        setErrors(errors);

        return notification.error({
          type: "error",
          message: "Failed To Upload",
          placement: "bottomRight",
        });
      }}
    >
      {({
        values,
        errors,
        setFieldValue,
        isSubmitting,
        handleSubmit,
        handleChange,
      }) => (
        <>
          <div className="row py-2">
            <div className="col-md-3">Name</div>
            <div className="col-md-9">
              <Field
                component={Input}
                placeholder="Place Name"
                title="name"
                name="name"
                onChange={handleChange("name")}
              />
              <span className="text-danger">{errors.name}</span>
            </div>
          </div>
          <div className="row py-2">
            <div className="col-md-3">Description</div>
            <div className="col-md-9">
              <Field
                component={Input.TextArea}
                placeholder="Place Name"
                title="description"
                name="description"
                onChange={handleChange("description")}
              />
              <span className="text-danger">{errors.description}</span>
            </div>
          </div>
          <input type="file" name="featured_upload" title="featured_upload" 
            onChange={(e) => {
                // setFieldValue("featured_upload", e.target.files[0]);
                setFile(e.target.files[0]);
              }}
          />
          {/* <Upload
            name="featured_upload"
            onChange={(value) => {
              setFieldValue("featured_upload", value);
            }}
          >
            <div className="py-4">
              <Button className="float-end" type="primary">
                <UploadOutlined /> Upload
              </Button>
            </div>
          </Upload> */}
          <span className="text-danger">{errors.featured_upload}</span>
          <div className="py-4 float-end">
            <Button className="float-end" type="primary" onClick={handleSubmit} disabled={(!clicked.lat || !clicked.lon ) || isSubmitting}>
              Add Place
            </Button>
          </div>
        </>
      )}
    </Formik>
  );
}
