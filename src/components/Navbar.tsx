import Link from '@mui/material/Link';
import "../styles/index.scss"
// import { login, register, getUserDetails } from '../services/authentication.service';
import { AppBar, Button, IconButton } from '@mui/material';
import { AccountCircle, ShoppingCartOutlined } from '@mui/icons-material';

export default function Navbar(){
    // function toggleSignIn(){
    //     const dropdown = document.getElementById("dropdown");

    //     if (dropdown){
    //         dropdown.style.display = dropdown.style.display == "none" || dropdown.style.display == "" ? "block": "none";

    //     }
    // }

    function toggleAccount(){

    }

    let currUser = localStorage['user'];

    let account = currUser === undefined ? <Button color="secondary" variant="contained" href="/account">Login/Sign Up</Button> : <IconButton onClick={toggleAccount}><AccountCircle/></IconButton>;

    return(
        <>
        {/* <p>{JSON.parse(currUser)['name']}</p> */}
            <AppBar position='static'>
                <ul className="links">
                    <li>
                        <Link href="/" color="inherit" key={""}>Home</Link>
                    </li>
                    <li>
                        <Link href="/shop" color="inherit">Shop</Link>
                    </li>
                    <li>
                        <Link href="/checkout" color="inherit">Checkout</Link>
                    </li>
                    <li>
                        <Link href="/about" color="inherit">About</Link>
                    </li>
                    <li className="act-btn">
                        {account}
                    {/* <Button className="toggle-modal" onClick={()=>{getUserDetails()}}>Test</Button> */}
                        <IconButton><ShoppingCartOutlined/></IconButton>
                        {/* <Button className="toggle-modal" onClick={()=>{toggleSignIn()}}>Sign In</Button> */}
                    </li>
                </ul>
            </AppBar>
        </>
    )
}