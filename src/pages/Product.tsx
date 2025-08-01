import { Navigate, useParams } from "react-router-dom";
import { addToCart, getProduct } from "../services/products.service";
import { useContext, useEffect, useState } from "react";
import { ProductType } from "../components/ProductCard";
import "../styles/product.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { CartContext } from "../App";
import Divider from "@mui/material/Divider";

export default function Product() {
  const defaultProduct: ProductType = {
    product_id: 0,
    item_name: "Undefined",
    description: "Something went wrong",
    price: 0,
    quantity: 0,
  };

  const [product, setProduct] = useState(defaultProduct);
  const { id } = useParams();
  const [navigate, setNavigate] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const context = useContext(CartContext);

  // Validate quantity input
  function quantitySetter(value: number) {
    if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  }

  if (!id) {
    return (
      <>
        <h1>Product not found</h1>
      </>
    );
  }

  useEffect(() => {
    getProduct(parseInt(id)).then((json) => {
      if (!json) {
        alert("Product not found");
        setNavigate(true);
      } else setProduct(json);
    });
  }, []);

  return (
    <>
      {navigate ? <Navigate to="/shop" /> : null}

      <div className="container">
        <div className="row mx-auto">
          <div className="col ">
            <h1>{product.item_name}</h1>
          </div>
        </div>
        <Divider className="mt-1 mb-8"></Divider>
        <div className="row product-content">
          <div className="col img">
            <img src={product.image_url} />
          </div>
          <div className="col description">
            <p>Description: {product.description}</p>
          </div>
        </div>
        <Divider className="mt-8 mb-2"></Divider>
        <div className="row add-row">
          <div className="col price">Price: ${product.price.toFixed(2)}</div>
          <div className="col quantity">
            <TextField
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              type="number"
              value={quantity}
              onInput={(e) =>
                quantitySetter(parseInt((e.target as HTMLInputElement).value))
              }
            />
          </div>
          <div className="col add-btn">
            <Button
              variant="contained"
              sx={{minWidth: "5rem"}}
              onClick={() => {
                product.quantity = quantity;
                addToCart(context, product);
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
