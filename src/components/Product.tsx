import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import "../styles/product.scss"

export interface Product {
  id: number;
  itemName: string;
  image_URL: string;
  description: string;
  price: number;
}

export default function ProductCard(product: Product) {
  return (
    <Card key={product.id} className="card">
      <CardContent className="" key={product.id}>
        <h2>{product.itemName}</h2>
        <p>{product.description}</p>
        <img
          src={product.image_URL}
          alt={`A picture of ${product.itemName}`}
        ></img>
        <p>Price: ${product.price}</p>
      </CardContent>
    </Card>
  );
}
