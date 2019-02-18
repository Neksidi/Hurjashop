class Api {
    static headers() {
      //Check if session exists in phone storage
      //Then set values if found
      var id = '1343'
      var user = 'cat@cat.cat';

      /*
      *Replace id and user with values
      * id = storage.get("sessionId")
      * user = storage.get("sessionUser")
      */

      return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'dataType': 'json',
        'sessionId': id,
        'sessionUser': user,
      }
    }
  
    static async get(route) {
      return await this.xhr(route, null, 'GET');
    }
  
    static async put(route, params) {
      return this.xhr(route, params, 'PUT');
    }
  
    static async post(route, params) {
      return this.xhr(route, params, 'POST');
    }
  
    static async delete(route, params) {
      return this.xhr(route, params, 'DELETE');
    }
  
    static async xhr(route, params, method) {
      var options = Object.assign({ method }, params ? { body: JSON.stringify(params) } : null);
      options.headers = Api.headers()
      //options.credentials = 'same-origin'
      console.log(options)
      return await fetch(route, options)
        .then((response) => {
          console.log(response)     
          var statusShort = response.status.toString().charAt(0)
          switch(statusShort) {
            case '2': {
              return response.json()
              .then((responseJson) => {
                return responseJson;
              })
              .catch((error) => {
                response.error = "Error handling response"
                return response;
              });
            }
            case '4': {
              response.error = "Failed";
              return response;
            }
            default: {
              response.error = "No status given";
              return response;
            }
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