import "../styles/shop.scss";
import ProductCard, { ProductType } from "../components/ProductCard";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";
import { getProducts, productSearch } from "../services/products.service";
import { useNavigate } from "react-router-dom";

async function search(keyword: string){
  let foundProducts = await productSearch(keyword);

  return foundProducts;
}

export default function Shop() {
  const [searchText, setSearch] = useState("");
  const [searchedProducts, setSearchedProducts] = useState(new Array<ProductType>());

  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (!data) {
          console.log("Cannot connect to the server");
          return;
        } else {
          setSearchedProducts(data);
        };
      })
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
            sx={{ width: "100% !important" }}
            id="search-text"
            label="Search for Products"
            variant="outlined"
            margin="none"
            value={searchText}
            onChange={(event)=>{setSearch(event.target.value)}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" onClick={()=>{search(searchText).then((foundPrducts)=>{setSearchedProducts(foundPrducts)})}}>Search</Button>
        </div>

        <div className="products">
          {searchedProducts.length > 0 ? (
            searchedProducts.map((product: ProductType) => {
              return ProductCard({ product, navigate });
            })
          ) : (
            <h2>No products available to display</h2>
          )}
        </div>
      </div>
    </>
  );
}
