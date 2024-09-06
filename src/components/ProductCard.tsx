import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import "../styles/product.scss";
import { Button } from "@mui/material";
import { NavigateFunction } from "react-router-dom";

export interface ProductType {
  id: number;
  itemName: string;
  image_URL?: string;
  description: string;
  price: number;
  quantity: number;
}

export default function ProductCard(props: {
  product: ProductType;
  navigate?: NavigateFunction;
}) {
  let product = props.product;
  return (
    <Card key={product.id} className="card" id={`product-${product.id}`}>
      <CardContent className="content" key={product.id}>
        <h2>{product.itemName}</h2>
        <p>{product.description}</p>
        <img src={product.image_URL} alt={`A picture of ${product.itemName}`} />
        <p>Price: ${product.price}</p>
        <Button
          variant="outlined"
          onClick={() => {
            if (props.navigate) 
              return props.navigate(`/item/${product.id}`);
          }}
        >
          View Item
        </Button>
      </CardContent>
    </Card>
  );
}
