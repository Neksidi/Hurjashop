import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'

async function getSessionId() {
  return await RNSecureStorage.get("sessionId").then((value) => {
    console.log("Getting id")
    console.log(value)
    return value;
    }).catch((err) => {
      return false;
  })
}
  
async function getSessionUser() {
  return await RNSecureStorage.get("sessionUser").then((value) => {
    console.log("Getting user")
    console.log(value)
      return value;
    }).catch((err) => {
      return false;
  });
}

async function setSessionId(id) {
    await RNSecureStorage.set("sessionId", id, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
    .then((res) => {
      console.log(res);     //TODO: error messages && alerts?
    }, (err) => {
      console.log(err);
    });
}

async function setSessionUser(username) {
    await RNSecureStorage.set("sessionUser", username, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
    .then((res) => {
      console.log(res);     //TODO: error messages && alerts?
    }, (err) => {
      console.log(err);
    })
}

async function removeSessionId() {
    await RNSecureStorage.remove("sessionId")
    .then((res) => {
      console.log(res);     //TODO: error messages && alerts?
    }, (err) => {
      console.log(err);
    });
}

async function removeSessionUser() {
    await RNSecureStorage.remove("sessionUser")
    .then((res) => {
      console.log(res);     //TODO: error messages && alerts?
    }, (err) => {
      console.log(err);
    })
}

export {
    getSessionId,
    getSessionUser,
    setSessionId,
    setSessionUser,
    removeSessionId,
    removeSessionUser
}