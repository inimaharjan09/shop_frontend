import { Button, Rating, Textarea } from "@material-tailwind/react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useAddReviewMutation } from "../products/productApi.js";
import toast from "react-hot-toast";

export default function AddReview({ id }) {
  const [addReview, { isLoading }] = useAddReviewMutation();
  const { user } = useSelector((state) => state.userSlice);


  return (
    <div className="max-w-[400px] mt-10">

      <Formik
        initialValues={{
          review: '',
          rating: 0
        }}
        onSubmit={async (val) => {
          try {

            await addReview({
              id,
              token: user?.token,
              body: {
                comment: val.review,
                rating: Number(val.rating),
                username: user?.username
              }
            }).unwrap();
            toast.success('Review added successfully');
          } catch (err) {
            toast.error(err.data?.message || err.data)
          }
        }}
      >
        {({ handleSubmit, handleChange, touched, values, setFieldValue }) => (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <Rating
              name="rating"
              value={values.rating}
              onChange={(e) => setFieldValue('rating', e)}
            />
            <div>
              <Textarea
                onChange={handleChange}
                name="review"
                label="Review"
                value={values.review}
              />
            </div>
            <Button loading={isLoading} type="submit">Submit</Button>


          </form>
        )}
      </Formik>

    </div>
  )
}
