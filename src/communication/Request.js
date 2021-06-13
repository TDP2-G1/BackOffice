function getRequestOptions(method, headers, body, bearerToken){
    let requestOptions = {
        method: method,
        headers: headers        
      };
  
      if(bearerToken){
        requestOptions.headers = { ...headers, 'Authorization': /* 'Bearer ' + */ bearerToken}
      }
      if(body){
          requestOptions = {...requestOptions, body: JSON.stringify(body)}
      }
  
      return requestOptions;
  }
  
export async function get(endpoint, bearerToken){
let headers = { 'Content-Type': 'application/json' }
const requestOptions = getRequestOptions('GET', headers, '', bearerToken);    

let response = await fetch(endpoint, requestOptions);
return response;
}

export async function put(endpoint, body = '', bearerToken){
  let headers = { 'Content-Type': 'application/json' }
  const requestOptions = getRequestOptions('PUT', headers, body, bearerToken);    
  
  let response = await fetch(endpoint, requestOptions);
  return response;
  }

export async function post(endpoint, body = '', bearerToken){
  let headers = { 'Content-Type': 'application/json' }
  const requestOptions = getRequestOptions('POST', headers, body, bearerToken);    
  
  let response = await fetch(endpoint, requestOptions);
  return response;
  }
  
export async function get_profile(endpoint, bearerToken){
  let headers = { 'Content-Type': 'application/json', 'Token': bearerToken }
  const requestOptions = getRequestOptions('GET', headers, '');    
  
  let response = await fetch(endpoint, requestOptions);
  return response;
  }


export async function put_profile(endpoint, body = '', bearerToken){
  let headers = { 'Content-Type': 'application/json', 'Token': bearerToken }
  const requestOptions = getRequestOptions('PUT', headers, body);    
  
  let response = await fetch(endpoint, requestOptions);
  return response;
  }

export async function post_profile(endpoint, body = '', bearerToken){
  let headers = { 'Content-Type': 'application/json', 'Token': bearerToken }
  const requestOptions = getRequestOptions('POST', headers, body);    
  
  let response = await fetch(endpoint, requestOptions);
  return response;
  }