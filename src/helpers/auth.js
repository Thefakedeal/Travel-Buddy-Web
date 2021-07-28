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