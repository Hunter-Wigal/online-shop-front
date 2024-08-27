import "../styles/shop.scss";
import ProductCard, { Product } from "../components/Product";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";
import { fetchData } from "../services/products.service";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData()
      .then((data) =>
        { 
          if(data == null){
            console.log("Cannot connect to the server");
            return;
          }
          setProducts(data)})
      .catch(() => {
        console.log("Error fetching products");
      });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="header">Shop page</h1>
        <div className="search-area">
          <TextField
            className="search-field"
            id="outlined-basic"
            label="Search for Products"
            variant="outlined"
            margin="none"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined">Search</Button>
        </div>
        {/* <div className="refresh">
          <Button
            onClick={() => {
              fetchData();
            }}
          >
            Refresh
          </Button>
        </div> */}
        <div className="products">
          {products.length > 0 ? products.map((product: Product) => {
            console.log(product.itemName);
            return ProductCard(product);
          }) : <h2>No products available to display</h2>}
        </div>
      </div>
    </>
  );
}
