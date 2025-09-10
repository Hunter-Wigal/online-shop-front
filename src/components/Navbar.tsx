import Link from "@mui/material/Link";
import "../styles/index.scss";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { Menu as HamburgerMenu } from "@mui/icons-material";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import StoreOutlined from "@mui/icons-material/StoreOutlined";

import { useNavigate } from "react-router-dom";
import { ProductType } from "./ProductCard";
import {
  checkAdmin,
  checkJWT,
  logout,
} from "../services/authentication.service";
import { useEffect, useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AuthCard from "./AuthCard";
import Divider from "@mui/material/Divider";

const fontSize = 20;
const margin = "0.5%";

export default function Navbar(props: {
  cart: ProductType[];
  setCart: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setColorMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  colorMode: "light" | "dark";
  serverStatus: boolean;
}) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  function toggleDarkMode() {
    let newColor: "light" | "dark" =
      props.colorMode == "dark" ? "light" : "dark";
    props.setColorMode(newColor);
  }

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
      // navigate("/auth");
    }
    if (props.serverStatus) {
      checkAdmin().then((isAdmin) => {
        setAdmin(isAdmin);
      });
    }
  }, []);

  let cart = props.cart;

  const currUser = sessionStorage["user"];

  const account =
    currUser === undefined ? (
      <Button
        color="secondary"
        variant="contained"
        onClick={handleOpenModal}
        sx={{ margin: "auto", marginInline: "10%", height: "auto" }}
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

          <div className="dropdown-container">
            <IconButton
              onClick={toggleDarkMode}
              style={{ height: "fit-content", alignSelf: "center" }}
            >
              {props.colorMode == "dark" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            <div className="side-buttons">
              {!admin ? (
                <IconButton
                  size="large"
                  onClick={() => {
                    return navigate("/cart");
                  }}
                >
                  <Badge badgeContent={cart.length} color="secondary">
                    <ShoppingCartOutlined fontSize="large" />
                  </Badge>
                </IconButton>
              ) : (
                <></>
              )}

              {account}
            </div>

            <AuthCard
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              setOpenModal={setOpenModal}
            ></AuthCard>
          </div>

          <IconButton className="hamburger" onClick={handleClick}>
            <HamburgerMenu fontSize="large" />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
            id="hamburger-menu"
            children={
              currUser != null ?
              [<MenuItem key="1" onClick={handleClose}>My account</MenuItem>, <MenuItem key="2" onClick={()=>{return navigate("/checkout")}}>Cart</MenuItem>, <MenuItem key="3" onClick={handleClose}>Logout</MenuItem>]
              :
              [<MenuItem key="1" onClick={handleOpenModal}>Login</MenuItem>, <Divider/>,<MenuItem key="2" onClick={()=>{return navigate("/checkout")}}>Cart</MenuItem>]
            }
          >
          </Menu>
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
            logout(props.setCart).then(()=>{toggleAccount();});
            

            return navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
