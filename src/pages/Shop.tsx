import "../styles/shop.scss";
import ProductCard, { Product } from "../components/Product";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";

export default function Shop() {
  const [products, setProducts] = useState([]);

  async function fetchData() {
    let ignore = false;
    console.log(document.cookie);
    console.log(document.cookie.split("=")[1]);

    const response = await fetch("http://localhost:8080/api/v1/products", {
      headers: {
        method: "GET",
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + document.cookie.split("=")[1],
      },
    });

    if (!ignore) {
      setProducts(await response.json());
      console.log(products);
    }

    return () => {
      ignore = true;
    };
  }

  useEffect(() => {
    // Declares the function to fetch the products

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="header">Shop page</h1>
        <div className="search-area">
          <TextField className="search-field" id="outlined-basic" label="Search for Products" variant="outlined" 
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}/>
          <Button variant="outlined">Search</Button>
        </div>
        <div className="refresh">
          <Button
            onClick={() => {
              fetchData();
            }}
          >
            Refresh
          </Button>
        </div>
        <div className="products">
          {products.map((product: Product) => {
            console.log(product.itemName);
            return ProductCard(product);
          })}
        </div>
      </div>
    </>
  );
}
