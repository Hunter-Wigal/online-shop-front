import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";

export default function OrderSuccess(){
    const { orderId } = useParams();
    let orderLink = `https://www.sandbox.paypal.com/unifiedtransactions/details/payment/${orderId}`;
    return <>
    <Box>
        <h1>Order Processed Successfully!</h1>
        <div>
            <h3>Order details: </h3>
            <a href={orderLink}>View Order in Paypal</a>
        </div>
    </Box>
    </>
}