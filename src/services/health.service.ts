// Function meant to eliminate the long fetch calls. May be changed to axios later
function easyFetch(
    url_endpoint: string,
    auth: boolean,
    method: string,
    body?: any
  ): Promise<Response> {
    let jwt = localStorage.getItem("jwt");
    if (!jwt) jwt = "";
  
    let headers: RequestInit["headers"] = !auth
      ? {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        }
      : {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        };
  
    return fetch(`${import.meta.env.VITE_SERVER_URL}/actuator/${url_endpoint}`, {
      method: `${method}`,
      headers: headers,
      body: body,
    });
  }

export async function healthCheck(){
    return easyFetch("health", false, "GET").then(async (response)=>{
        return (await response.json()).status == "UP";
    })
}