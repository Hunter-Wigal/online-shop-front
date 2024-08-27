import Link from "@mui/material/Link";
import "../styles/index.scss";
import { AppBar, Button, IconButton } from "@mui/material";
import {
  AccountCircle,
  ShoppingCartOutlined,
  StoreOutlined,
} from "@mui/icons-material";

// TODO fix this mess
const fontSize = 20;
const margin = "0.5%";

export default function Navbar() {
  // function toggleSignIn(){
  //     const dropdown = document.getElementById("dropdown");

  //     if (dropdown){
  //         dropdown.style.display = dropdown.style.display == "none" || dropdown.style.display == "" ? "block": "none";

  //     }
  // }

  function toggleAccount() {}

  const currUser = localStorage["user"];

  const account =
    currUser === undefined ? (
      <Button color="secondary" variant="contained" href="/account" sx={{'margin': 'auto', 'marginInline': '10%', 'height': '95%'}}>
        Login
      </Button>
    ) : (
      <IconButton onClick={toggleAccount} className="account">
        <AccountCircle />
      </IconButton>
    );

  return (
    <>
      {/* <p>{JSON.parse(currUser)['name']}</p>  */}
      <AppBar position="static" sx={{'marginBottom': '2%'}}>
        <div className="links">
          <IconButton>
            <StoreOutlined fontSize={"large"}/>
          </IconButton>
          <Link
            href="/"
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
            href="/shop"
            color="inherit"
            className="nav-link"
            underline="none"
            fontSize={fontSize}
            marginInline={margin}
          >
            Shop
          </Link>
          <Link
            href="/checkout"
            color="inherit"
            className="nav-link"
            underline="none"
            fontSize={fontSize}
            marginInline={margin}
          >
            Checkout
          </Link>
          <Link
            href="/about"
            color="inherit"
            className="nav-link"
            underline="none"
            fontSize={fontSize}
            marginInline={margin}
          >
            About
          </Link>
          <div className="act-btn">
            <IconButton>
              <ShoppingCartOutlined fontSize="large" />
            </IconButton>
            {account}
          </div>
        </div>
      </AppBar>
    </>
  );
}
