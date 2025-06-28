import "../styles/shop.scss";
import ProductCard, { ProductType } from "../components/ProductCard";
import { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";
import { getProducts, productSearch } from "../services/products.service";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Skeleton from "@mui/material/Skeleton";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';



async function search(keyword: string) {
  let foundProducts = await productSearch(keyword);

  return foundProducts;
}

export default function Shop() {
  const [searchText, setSearch] = useState("");
  const [searchedProducts, setSearchedProducts] = useState(
    new Array<ProductType>()
  );
  const [loaded, setLoaded] = useState(false);
  // Server availability
  const [status, setStatus] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (!data) {
          console.log("Can't connect to the server");
          setStatus(false);
          return;
        } else {
          setSearchedProducts(data);
          setLoaded(true);
        }
      })
      .catch((err) => {
        console.log("Error fetching products");
        // console.log(err);
        err!;
      });
  }, []);

  return (
    <>
      <Container className="container" style={{paddingLeft: 0}}>
        <h1 className="mx-auto">Shop page</h1>
        <form
          className="search-area"
          onSubmit={(event) => {
            event.preventDefault();
            search(searchText).then((foundProducts) => {
              setSearchedProducts(foundProducts);
            });
          }}
        >
          <FormControl fullWidth={true}>
            <InputLabel htmlFor="component-outlined">
              Search for Products
            </InputLabel>
            <OutlinedInput
              fullWidth={true}
              id="component-outlined"
              label="Search for Products"
              value={searchText}
              style={{marginRight: 0}}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          {/* <Button
            type="submit"
            variant="outlined"
            style={{minWidth: "15%"}}
            onClick={() => {
              search(searchText).then((foundPrducts) => {
                setSearchedProducts(foundPrducts);
              });
            }}
          >
            Search
          </Button> */}
          <IconButton color="primary">
            <SearchIcon></SearchIcon>
          </IconButton>
        </form>

        <div className="products mt-1">
          {searchedProducts.length > 0 ? (
            searchedProducts.map((product: ProductType) => {
              return ProductCard({
                product,
                navigate,
                key: product.product_id.toString(),
              });
            })
          ) : loaded ? (
            <h2>No products available to display</h2>
          ) : status ? (<>
                {Array.from({ length: 3 }, (_, i) => (
                  <Card key={i} className="card mi-1">
                    <CardContent className="card-skeleton mi-1">
                      <h2>
                        <Skeleton sx={{marginInline:5}} variant="rectangular" width={300} />
                      </h2>
                      <p>
                        <Skeleton variant="rectangular" width={300} height={50} />
                      </p>
                      <Skeleton variant="rounded" width={300} height={350} />
                    </CardContent>
                  </Card>
                ))}
            </>
          ) : (
            <h2 style={{alignSelf: "center"}}>Server unavailable</h2>
          )}
        </div>
      </Container>
    </>
  );
}
