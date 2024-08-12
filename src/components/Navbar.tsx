import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import "../styles/index.scss"
import { login, register } from '../services/authentication.service';

export default function Navbar(){
    function toggleSignIn(){
        const dropdown = document.getElementById("dropdown");

        if (dropdown){
            dropdown.style.display = dropdown.style.display == "none" || dropdown.style.display == "" ? "block": "none";

        }
    }



    return(
        <>
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
                    <li>
                        <Link href="/account" color="inherit">Account</Link>
                    </li>
                    <li className="login">
                        <Button className="toggle-modal" onClick={()=>{toggleSignIn()}}>Sign In</Button>
                        <div className="dropdown" id="dropdown">
                            <Button onClick={()=>{login("email@gmail.com", "password")}}>Sign In</Button>
                            <Button onClick={()=>{register("email@gmail.com", "password")}}>Register</Button>
                        </div>
                    </li>
                </ul>
            </AppBar>
        </>
    )
}