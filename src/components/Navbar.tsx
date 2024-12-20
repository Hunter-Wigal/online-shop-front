import Link from "@mui/material/Link";
import "../styles/index.scss";
import { AppBar, Badge, Button, IconButton } from "@mui/material";
import {
  AccountCircle,
  ShoppingCartOutlined,
  StoreOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ProductType } from "./ProductCard";
import { checkAdmin, checkJWT, logout } from "../services/authentication.service";
import { useEffect, useState } from "react";

// TODO fix this mess
const fontSize = 20;
const margin = "0.5%";

export default function Navbar(props: { cart: ProductType[], setCart: React.Dispatch<React.SetStateAction<ProductType[]>> }) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);


  function toggleAccount() {
    const dropdown = document.getElementById("account-dropdown");

    if (dropdown) {
      dropdown.style.display =
        dropdown.style.display == "none" || dropdown.style.display == ""
          ? "flex"
          : "none";
    }
  }
  useEffect(() => {
    if (!checkJWT()) {
      return navigate("/auth");
    }
    checkAdmin().then((isAdmin)=>{setAdmin(isAdmin)});
  }, []);

  let cart = props.cart;

  const currUser = sessionStorage["user"];

  const account =
    currUser === undefined ? (
      <Button
        color="secondary"
        variant="contained"
        onClick={() => {
          // return navigate("/account");
          return navigate("/auth");
        }}
        sx={{ margin: "auto", marginInline: "10%", height: "95%" }}
      >
        Login
      </Button>
    ) : (
      <IconButton
        onClick={toggleAccount}
        className="account mr-10 ml-5"
        size="large"
      >
        <AccountCircle sx={{ fontSize: "40px" }} />
      </IconButton>
    );


    
  return (
    <div className="mb-2">
      <AppBar position="relative">
        <div className="links">
          <IconButton
            onClick={() => {
              return navigate("/");
            }}
          >
            <StoreOutlined fontSize={"large"} />
          </IconButton>
          <Link
            onClick={() => {
              return navigate("/");
            }}
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
            onClick={() => {
              return navigate("/shop");
            }}
            color="inherit"
            className="nav-link"
            underline="none"
            fontSize={fontSize}
            marginInline={margin}
          >
            Shop
          </Link>

          <Link
            onClick={() => {
              return navigate("/about");
            }}
            color="inherit"
            className="nav-link"
            underline="none"
            fontSize={fontSize}
            marginInline={margin}
          >
            About
          </Link>
          {admin ? (
            <Link
              onClick={() => {
                return navigate("/admin");
              }}
              color="inherit"
              className="nav-link"
              underline="none"
              fontSize={fontSize}
              marginInline={margin}
            >
              Admin
            </Link>
          ) : null}

          <div className="act-btn">
            <IconButton
              size="large"
              onClick={() => {
                return navigate("/checkout");
              }}
            >
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartOutlined fontSize="large" />
              </Badge>
            </IconButton>
            {account}
          </div>
        </div>
      </AppBar>
      <div className="account-dropdown mt-1" id="account-dropdown">
        <Button
          className="mb-5"
          color="secondary"
          variant="contained"
          onClick={() => {
            toggleAccount();
            return navigate("/account");
          }}
        >
          View Account
        </Button>
        <Button
          className="logout"
          color="error"
          variant="contained"
          onClick={() => {
            logout(props.setCart);
            toggleAccount();

            return navigate("/auth");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
