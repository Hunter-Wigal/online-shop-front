import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import "../styles/product.scss";
import { Button } from "@mui/material";
import { NavigateFunction } from "react-router-dom";

export interface ProductType {
  product_id: number;
  item_name: string;
  image_URL?: string;
  description: string;
  price: number;
  quantity: number;
}

export default function ProductCard(props: {
  product: ProductType,
  navigate?: NavigateFunction,
  edit? : boolean
}) {
  let btnText = "View Item";
  let route = "item";

  if(props.edit){
    btnText = "Edit Item";
    route = "edit"
  }

  let product = props.product;
  return (
    <Card key={product.product_id} className="card mi-1" id={`product-${product.product_id}`}>
      <CardContent className="content">
        <h2>{product.item_name}</h2>
        <p>{product.description}</p>
        <img src={product.image_URL} alt={`A picture of ${product.item_name}`} />
        <p>Price: ${product.price}</p>
        <Button
          variant="outlined"
          onClick={() => {
            if (props.navigate) 
              return props.navigate(`/${route}/${product.product_id}`);
          }}
        >
          {btnText}
        </Button>
      </CardContent>
    </Card>
  );
}
