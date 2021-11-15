export const baseUrl = `http://localhost:5000/api/v1/` 

export function doPost({method= 'POST', body, path='',token=''}){

  const headers = {
    "content-type": "application/json",
  }

  if(token){
    headers['Authorization'] = `Bearer ${token}`
  }

  const options = {
    method: method,
    headers: headers, 
    body: JSON.stringify(body),
  };
  const url = new URL(path, baseUrl).toString();
  return fetch(url, options);
}

export function doPostForm({method= 'POST', body, path='',token=''}){

  const headers = {
    'Authorization' :  `Bearer ${token}`
  }

  const options = {
    method: method,
    headers: headers, 
    body: body
    ,
  };
  for (const item of body.values()) {
    console.log(item)
  }
  const url = new URL(path, baseUrl).toString();
  return fetch(url, options);
}

export function doGet({query={},path='',token=''}){
    const params = new URLSearchParams(query).toString();
    const url = new URL(path, baseUrl).toString();

    const headers = {
      "accept": "application/json",
    }
  
    if(token){
      headers['Authorization'] = `Bearer ${token}`
    }
  
    const options = {
      method: 'GET',
      headers: headers, 
    };

    return fetch(`${url}?${params}`, options);
}

