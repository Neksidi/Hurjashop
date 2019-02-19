import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'

class Api {
    static async headers() {
      var id = '';
      var user = '';
      //Check if session exists in phone storage
      //Then set values if found
      await RNSecureStorage.get("sessionId").then((value) => {
        console.log("Getting id")
        console.log(value) // Will return direct value
        id = value;
        }).catch((err) => {
          console.log(err)
        })

      await RNSecureStorage.get("sessionUser").then((value) => {
        console.log("Getting user")
        console.log(value) // Will return direct value
        user = value;
        }).catch((err) => {
          console.log(err)
        });

      console.log("Double check")
      console.log(user)
      console.log(id)
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
      options.headers = await Api.headers()
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