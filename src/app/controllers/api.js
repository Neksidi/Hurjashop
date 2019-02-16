class Api {
    static headers() {
      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json',
      }
    }
  
    static get(route) {
      return this.xhr(route, null, 'GET');
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
  
    static xhr(route, params, method) {
      var options = Object.assign({ method }, params ? { body: JSON.stringify(params) } : null);
      options.headers = Api.headers()
      console.log(route)
      return fetch(route, options)
        .then((res) => res.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            throw error;
        });
    }
  }
  
  export default Api