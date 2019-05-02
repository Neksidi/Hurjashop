import { getSessionId, getSessionUser } from '../controllers/secureStorage'


class Api {
    static async headers(requiresAuth) {
      var id = false;
      var user = false;
      
      if (requiresAuth) {
        var id = await getSessionId();
        var user = await getSessionUser();
      }
       
      
      if(requiresAuth && id && user) {
        return {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'dataType': 'json',
          'sessionId': id,
          'sessionUser': user,
        }
      }
      else  {
        return {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'dataType': 'json',
        }
      }
    }
  
    static async get(route, requiresAuth) {
      return await this.xhr(route, null, 'GET', requiresAuth);
    }
  
    static async put(route, params, requiresAuth) {
      return this.xhr(route, params, 'PUT', requiresAuth);
    }
  
    static async post(route, params, requiresAuth) {
      return this.xhr(route, params, 'POST', requiresAuth);
    }
  
    static async delete(route, params, requiresAuth) {
      return this.xhr(route, params, 'DELETE', requiresAuth);
    }
  
    static async xhr(route, params, method, requiresAuth) {
      var options = Object.assign({ method }, params ? { body: JSON.stringify(params) } : null);
      options.headers = await Api.headers(requiresAuth)
      return await fetch(route, options)
        .then((response) => {  
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
            case '5': {
              response.error = "Server error";
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