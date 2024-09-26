import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import "../styles/product.scss";
import { Button } from "@mui/material";
import { NavigateFunction } from "react-router-dom";


export interface ProductType {
  product_id: number;
  item_name: string;
  image_url?: string;
  description: string;
  price: number;
  quantity: number;
}


function initiateDelete(id: number, handleOpen: Function, handleDeleting: Function) {
  handleOpen(true);
  handleDeleting(id);
}

export default function ProductCard(props: {
  product: ProductType;
  navigate?: NavigateFunction;
  edit?: boolean;
  handleOpen?: Function;
  setDeleting?: Function;
  key?: string
}) {
  let btnText = "View Item";
  let route = "item";

  if (props.edit) {
    btnText = "Edit Item";
    route = "edit";
  }

  let product = props.product;
  return (
      <Card
        key={props.key}
        className="card mi-1"
        id={`product-${product.product_id}`}
      >
        <CardContent className="content">
          <h2>{product.item_name}</h2>
          <p>{product.description}</p>
          <img
            src={product.image_url}
            alt={`A picture of ${product.item_name}`}
          />
          <p>Price: ${product.price}</p>
          <div className="buttons">
            <Button
              variant="outlined"
              onClick={() => {
                if (props.navigate)
                  return props.navigate(`/${route}/${product.product_id}`);
              }}
            >
              {btnText}
            </Button>
            {props.edit ? (
              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  if(props.handleOpen && props.setDeleting)
                  initiateDelete(product.product_id, props.handleOpen, props.setDeleting);
                }}
              >
                Delete
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
  );
}
