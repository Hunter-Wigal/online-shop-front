import Link from "@mui/material/Link";
import "../styles/index.scss";
import { AppBar, Badge, Button, IconButton } from "@mui/material";
import {
  AccountCircle,
  ShoppingCartOutlined,
  StoreOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Product } from "./Product";

// TODO fix this mess
const fontSize = 20;
const margin = "0.5%";

export default function Navbar(props: {cart: Product[]}) {
  // function toggleSignIn(){
  //     const dropdown = document.getElementById("dropdown");

  //     if (dropdown){
  //         dropdown.style.display = dropdown.style.display == "none" || dropdown.style.display == "" ? "block": "none";

  //     }
  // }

  let cart = props.cart;

  function toggleAccount() {}

  const currUser = localStorage["user"];

  const account =
    currUser === undefined ? (
      <Button
        color="secondary"
        variant="contained"
        onClick={()=>{return navigate("/account")}}
        sx={{ margin: "auto", marginInline: "10%", height: "95%" }}
      >
        Login
      </Button>
    ) : (
      <IconButton onClick={toggleAccount} className="account">
        <AccountCircle />
      </IconButton>
    );

  const navigate = useNavigate();

  return (
    <>
      {/* <p>{JSON.parse(currUser)['name']}</p>  */}
      <AppBar position="static" sx={{ marginBottom: "2%" }}>
        <div className="links">
          <IconButton onClick={()=>{return navigate("/")}}>
            <StoreOutlined fontSize={"large"} />
          </IconButton>
          <Link
            onClick={()=>{return navigate("/")}}
            color="inherit"
            key={""}
            className="nav-link"
            underline="none"
            fontSize={fontSize}
            marginInline={margin}
            marginLeft={"3%"}
          >
            Home
          </Link>
          <Link
            onClick={()=>{return navigate("/shop")}}
            color="inherit"
            className="nav-link"
            underline="none"
            fontSize={fontSize}
            marginInline={margin}
          >
            Shop
          </Link>

          <Link
            onClick={()=>{return navigate("/about")}}
            color="inherit"
            className="nav-link"
            underline="none"
            fontSize={fontSize}
            marginInline={margin}
          >
            About
          </Link>
          
          <div className="act-btn">
            <IconButton onClick={() => {return navigate("/checkout")}}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartOutlined fontSize="large" />
              </Badge>
            </IconButton>
            {account}
          </div>
        </div>
      </AppBar>
    </>
  );
}
