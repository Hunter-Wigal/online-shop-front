import TextField from "@mui/material/TextField";
import { ProductType } from "./ProductCard";
import { removeFromCart, updateQuantity } from "../services/products.service";
import { CartContextType } from "../App";
import Button from "@mui/material/Button";
import { useState } from "react";
import Box  from "@mui/material/Box";

export default function ProductRow(props: {product: ProductType, index: number, context: CartContextType}){
    const {product, index, context} = props;

    const [quantity, setQuantity] = useState(product.quantity);

    return (
        <Box
          className="row mb-1 product p-1"
          key={product.product_id}
        >
          <img
            width="150"
            height="100"
            className="mr-3"
            src={product.image_url}
          />
          <div className="col">Name: {product.item_name}</div>
          <div className="col-start mr-2">
            Price: ${product.price.toFixed(2)}
          </div>
          <div className="col-end">
              <span className="mr-5" style={{ alignContent: "center" }}>
                Quantity:
              </span>
              <TextField
                value={quantity}
                disabled={true}
                sx={{minWidth: '40%', maxWidth: '50%'}}
                type="number"
                onChange={(event) =>{
                  updateQuantity(
                    context,
                    index,
                    parseInt(event.target.value)
                  );
                  setQuantity(context.cart[index].quantity);
                }
                }
              />
            </div>
            <div className="ml-2" style={{ alignContent: "center", minWidth: 'fit-content' }}>
              Total Price: $
              {(product.price * product.quantity).toFixed(2)}
            </div>
            <Button
              className="ml-2"
              style={{ height: "75%", alignSelf: "center" }}
              variant="contained"
              color="warning"
              onClick={() => removeFromCart(context, index)}
            >
              Remove
            </Button>
        </Box>
      );
}