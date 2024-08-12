export interface User{
    username: string,
    full_name: string,
    sessionID: string,
    sessionExp: Date
}

export function login(username: string, password: string){
    // TODO find out if sending passwords is fine
    // let response = null;

    fetch("http://localhost:8080/api/v1/auth/login", 
        {headers: {'Content-Type': 'application/json',}, method: "POST", body: JSON.stringify({email: username, password: password})})
        .then(async (response)=>{
            let result = await response.json();
            console.log(result.message);
            let token = result.accessToken;
            console.log(token);
            window.localStorage.setItem('accessToken', token);
            document.cookie = "accessToken=" + token;
            response = result;
        }).catch((err)=>{
            console.log(err);
        })
}

export function register(username: string, password: string){
    fetch("http://localhost:8080/api/v1/auth/register", 
        {headers: {'Content-Type': 'application/json'}, method: "POST", body: JSON.stringify({email: username, password: password})})
        .then(async (response)=>{
            let result = await response.text();
            console.log(result);
            // console.log(result.message);
            // let token = result.accessToken;
            // console.log(token);
            // window.localStorage.setItem('accessToken', token);
            // document.cookie += "accessToken=" + token;
            // response = result;
        }).catch((err)=>{
            console.log(err);
        })
}