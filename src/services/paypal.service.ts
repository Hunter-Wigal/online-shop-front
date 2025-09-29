import { ProductType } from "../components/ProductCard";
import easyFetch from "../helpers/EasyFetch";

interface OrderData {
    id: string;
    details?: Array<{
      issue: string;
      description: string;
    }>;
    debug_id?: string;
}

interface PaypalCart{
    product_id: number;
    quantity: number
}

export async function createPaypalOrder(cart: ProductType[]) {
    // TODO change url and body of request
    try {
        // const response = await fetch("/my-server/create-paypal-order", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         cart: [{ id: "YOUR_PRODUCT_ID", quantity: "YOUR_PRODUCT_QUANTITY" }],
        //     }),
        // });

        let newCart: PaypalCart[] = []

        for (let item of cart){
            newCart.push({product_id: item.product_id, quantity: item.quantity})
        }
        let user = sessionStorage.getItem("user");
        if(!user){ console.log("can't find email")
            return "";
        };
        let userObject = JSON.parse(user);
        let email = userObject ? userObject['email'] : 'invalid'
        const response = await easyFetch(`orders/paypal/createorder/${email}`, true, "POST", JSON.stringify(
                newCart,
            ));
        // response.json().then((resp)=>{console.log(resp)});
        
      const orderData: OrderData = await response.json();
      console.log(orderData);
      if (!orderData.id) {
          const errorDetail = orderData?.details![0];
          const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : "Unexpected error occurred, please try again.";
          throw new Error(errorMessage);
      }
      return orderData.id;

    } catch (error) {
        console.error(error);
        throw error;
    }

};


export async function captureOrder(orderId: string){
    return easyFetch("orders/paypal/capture", true, "POST", JSON.stringify(orderId));
}