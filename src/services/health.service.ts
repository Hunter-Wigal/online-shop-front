import easyFetch from "../helpers/EasyFetch";


export async function healthCheck(){
    return easyFetch("actuator/health", false, "GET").then(async (response)=>{
        return (await response.json()).status == "UP";
    }).catch(()=>{return false;})
}