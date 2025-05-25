import { useNavigate, useParams } from "react-router"
import { useGetProductQuery } from "./productApi";
import { baseUrl } from "../../app/mainApi";
import { Button, Card, IconButton, Rating } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToCart } from "../carts/cartSlice";
import AddReview from "../user/AddReview.jsx";
import ReviewList from "../user/ReviewList.jsx";

export default function Product() {

  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const { data, isLoading, error } = useGetProductQuery(id);

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>{error.data?.message || error?.error}</h1>



  return (
    <div>
      <div className="grid grid-cols-3 my-5 gap-5">
        <div>
          <img src={`${baseUrl}${data.image}`} alt="" />
        </div>
        <div className="space-y-3">
          <h2 className="font-medium">{data.title}</h2>
          <p className="text-red-400">Rs.{data.price}</p>
          <Rating readonly value={Math.round(data.rating)} />
          <p>{data.description}</p>
        </div>
        <ProductAddToCart product={data} />
      </div>

      {user && user?.role === 'User' && <AddReview id={data._id} />}
      <ReviewList product={data} />
    </div>
  )
}



function ProductAddToCart({ product }) {
  const nav = useNavigate();
  const { carts } = useSelector((state) => state.cartSlice);
  const isExistCart = carts.find((cart) => cart._id === product._id);

  const [count, setCount] = useState(isExistCart?.qty || 1);
  const { user } = useSelector((state) => state.userSlice);


  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(setToCart({ title: product.title, image: product.image, price: product.price, qty: count, _id: product._id }));
    nav('/carts');
  }
  return (
    <Card className="flex items-center space-y-7 justify-center">
      <h1>Product Add</h1>
      <div className="flex gap-3">

        <IconButton
          onClick={() => setCount(count - 1)}
          disabled={count === 1}
          size="sm">
          <i className="fas fa-minus" />
        </IconButton>

        <h1>{count}</h1>

        <IconButton
          onClick={() => setCount(count + 1)}
          size="sm">
          <i className="fas fa-add" />
        </IconButton>

      </div>
      <Button
        onClick={handleCart}
        disabled={!user || user?.role === 'Admin'}>Add To Cart</Button>
    </Card>
  )
}
