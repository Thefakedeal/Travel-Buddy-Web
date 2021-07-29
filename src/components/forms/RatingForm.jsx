import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Typography, Rate, notification, Input, Button, Spin } from "antd";
import useAuth from "../../hooks/useAuth";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { doGet, doPost } from "../../helpers/request";

const RatingSchema = Yup.object().shape({
  stars: Yup.number()
    .min(1, "Cant be lower Than 1")
    .max(5, "Cant Be higher than 5"),
  description: Yup.string(),
});

export default function RatingForm({ id }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const history = useHistory();
  const { token, user } = useAuth();

  const fetchReview = async ()=>{
    const response = await doGet({
        path: `places/${id}/review/user`,
        token: token
      });
    const review = await response.json();
    if(response.ok){
        setStars(review.stars);
        setComment(review.comment);
    }
  }
  useEffect(()=>{
    if(user){
       fetchReview() 
    }
  },[user]);

  return (
    <>
    <div className="card my-2 ">
        <div className="card-header">Your Review</div>
        <div className="card-body">
            <Rate disabled value={stars} />
            <Typography.Paragraph>
                {comment}
            </Typography.Paragraph>
        </div>
    </div>
    <Formik
      initialValues={{
        stars: stars,
        comment: comment,
        placeID: id,
      }}
      validationSchema={RatingSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (!user) {
            return history.push("/login");
          }
          const response = await doPost({
            body: values,
            token,
            path: "reviews",
          });
          if (response.ok) {
            notification.success({
              type: "success",
              message: "Review Posted",
              placement: "bottomRight",
            });
          } else {
            notification.error({
              type: "error",
              message: "Failed to post review",
              placement: "bottomRight",
            });
          }
        } catch (err) {
          notification.error({
            type: "error",
            message: "Failed to post review!",
            placement: "bottomRight",
          });
        }
      }}
    >
      {({
        values,
        isSubmitting,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <div className="card p-4">
          <div className="card-header">Post Review </div>
          <div className="card-body">
            <Rate
              defaultValue={stars}
              name="stars"
              allowClear={false}
              onChange={(value) => {
                setFieldValue("stars", value);
              }}
            />
            <Field
              component={Input.TextArea}
              name="comment"
              onChange={handleChange("comment")}
            />
            <div className="py-4">
              <Button
                className="float-end"
                onClick={handleSubmit}
                type="primary"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spin />} Post Review
              </Button>
            </div>
          </div>
        </div>
      )}
    </Formik>
    </>
  );
}
