import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Rating,
} from "@material-tailwind/react";
export default function ReviewList({ product }) {


  return (
    <div className="mt-10">
      {product.reviews.map((review) => (

        <Card key={review._id} color="transparent" shadow={false} className="w-full max-w-[26rem]">
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar
              size="lg"
              variant="circular"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              alt="tania andrew"
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {review.username}
                </Typography>
                <Rating readonly value={review.rating} />

              </div>

            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <Typography>
              {review.comment}
            </Typography>
          </CardBody>
        </Card>
      ))}


    </div >
  )
}
