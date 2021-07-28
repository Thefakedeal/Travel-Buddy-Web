import { doPost } from "./request";

export async function register(body){
    try{
        const response = await doPost({body,path:'signup'});
        if(response.ok){
            return {status: response.status, body: await response.json(), success: response.ok}
        }
        throw new Error({status: response.status, body: await response.json()})
    }catch(err){
        return {status: err.status||400, body: err.body||{message:'Something Went Wrong'}, success: false}
    }
}

export async function login(body){
    try{
        const response = await doPost({body,path:'login'});
        if(response.ok){
            return {status: response.status, body: await response.json(), success: response.ok}
        }
        throw {status: response.status, body: await response.json()}
    }catch(err){
        return {status: err.status||500, body: err.body||{message:'Something Went Wrong'}, success: false}
    }
}

export async function logout() {
    try{
        const token = localStorage.getItem('token');
        const response = await doPost({method:'DELETE',path:'logout',token:token});
        return response.ok;
    }catch(err){
        return false;
    }
}