import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import "../styles/product.scss"

export interface Product {
  id: number;
  name: string;
  image_URL?: string;
  description: string;
  price: number;
  quantity: number;
}

export default function ProductCard(props: {product: Product}) {
  let product = props.product;
  return (
    <Card key={product.id} className="card">
      <CardContent className="" key={product.id}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <img
          src={product.image_URL}
          alt={`A picture of ${product.name}`}
        ></img>
        <p>Price: ${product.price}</p>
      </CardContent>
    </Card>
  );
}
