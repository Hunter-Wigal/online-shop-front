import TextField from "@mui/material/TextField";
import { ProductType } from "./ProductCard";
import { removeFromCart, updateQuantity } from "../services/products.service";
import { CartContextType } from "../App";
import Button from "@mui/material/Button";

export default function ProductRow(props: {product: ProductType, index: number, context: CartContextType}){
    const {product, index, context} = props;
    
    return (
        <div
          className="row mb-1 product p-1"
          key={product.product_id}
        >
          <img
            width="150"
            height="100"
            className="mr-3"
            src={product.image_url}
          />
          <div className="col w-25">Name: {product.item_name}</div>
          <div className="col-start">
            Price: ${product.price.toFixed(2)}
          </div>
          <div className="col-end">
            <div className="mr-10 row center">
              <span style={{ alignContent: "center" }}>
                Quantity:
              </span>
              <TextField
                value={product.quantity}
                type="number"
                onChange={(event) =>
                  updateQuantity(
                    context,
                    index,
                    parseInt(event.target.value)
                  )
                }
              />
            </div>
            <div style={{ alignContent: "center" }}>
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
          </div>
        </div>
      );
}