import Link from '@mui/material/Link';
import "../styles/index.scss";
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
        {/* <p>{JSON.parse(currUser)['name']}</p>  */}
            <AppBar position='static'>
                <div className="links">
                    <Button variant="contained">
                        <Link href="/" color="inherit" key={""} className="remove-underline">Home</Link>
                    </Button>
                    <Button variant="contained">
                        <Link href="/shop" color="inherit" className="remove-underline">Shop</Link>
                    </Button>
                    <Button variant="contained">
                        <Link href="/checkout" color="inherit" className="remove-underline">Checkout</Link>
                    </Button>
                    <Button variant="contained">
                        <Link href="/about" color="inherit" className="remove-underline">About</Link>
                    </Button>
                    <div className="act-btn">
                    <IconButton ><ShoppingCartOutlined/></IconButton> 
                        {account}
                    </div>
                    
                </div>
            </AppBar> 
        </>
    )
}

