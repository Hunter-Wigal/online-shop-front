import "../styles/shop.scss";
import ProductCard, { ProductType } from "../components/ProductCard";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";
import { getProducts } from "../services/products.service";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
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
            sx={{"width": "100% !important"}}
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
          {products.length > 0 ? products.map((product: ProductType) => {
            return ProductCard({product, navigate});
          }) : <h2>No products available to display</h2>}
        </div>
      </div>
    </>
  );
}
