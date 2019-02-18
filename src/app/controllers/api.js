class Api {
    static headers() {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json',
      }
    }
  
    static async get(route) {
      return await this.xhr(route, null, 'GET');
    }
  
    static put(route, params) {
      return this.xhr(route, params, 'PUT');
    }
  
    static post(route, params) {
      return this.xhr(route, params, 'POST');
    }
  
    static delete(route, params) {
      return this.xhr(route, params, 'DELETE');
    }
  
    static async xhr(route, params, method) {
      console.log(route);
      var options = Object.assign({ method }, params ? { body: JSON.stringify(params) } : null);
      options.headers = Api.headers()
      return await fetch(route, options)
        .then((response) => {
          //console.log(response)     DEBUG
          if(response.status === 404) {
            response.error = "Not found";
            return response;
          }
          if(response.status === 200) {
            return response.json()
              .then((responseJson) => {
                return responseJson;
              })
              .catch((error) => {
                return "Parse error";
              });
          }
        })
        .catch((error) => {
          const response = {
            error: "Error connecting to server"
          }
          return response;
        });
    }
  }
  
  export default Api