const header = {
  "Content-Type": "application/json",
};


const FetchWrapper = {

 getMethod: async function(url)  {

 console.warn("Inside getmethod  fetchwrapper.js");
 console.warn("url "+url);
  try {
                                  let response = await fetch(
                                    'http://192.168.12.65:8080'+url
                                  );
                                  if (!response.ok) {
                                  console.warn(response);
                                   throw Error(response);
                                   }
                                  let json = await response.json();
                                  console.warn(json);
                                  return json;
                                } catch (error) {
                                  console.error(error);
                                }

}
};

export default FetchWrapper;