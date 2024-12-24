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
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (!data) {
          console.log("Can't connect to the server");
          return;
        } else {
          setSearchedProducts(data);
          setLoaded(true);
        };
      })
      .catch((err) => {
        console.log("Error fetching products");
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="header">Shop page</h1>
          <form className="search-area" onSubmit={(event)=>{event.preventDefault();search(searchText).then((foundPrducts)=>{setSearchedProducts(foundPrducts)})}}>
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
            <Button type="submit" variant="outlined" onClick={()=>{search(searchText).then((foundPrducts)=>{setSearchedProducts(foundPrducts)})}}>Search</Button>
          </form>

        <div className="products">
          {searchedProducts.length > 0 ? (
            searchedProducts.map((product: ProductType) => {
              return ProductCard({ product, navigate, key: product.product_id.toString() });
            })
          ) : (
            loaded ? <h2>No products available to display</h2> : <h2>Loading...</h2>
          )}
        </div>
      </div>
    </>
  );
}
