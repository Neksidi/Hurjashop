import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'

async function getCardToken() {
  return await RNSecureStorage.get("cardToken").then((value) => {
    console.log("Getting card")
    console.log(value)
      return value;
    }).catch((err) => {
      return false;
  });
}

async function getCardType() {
  return await RNSecureStorage.get("cardType").then((value) => {
    console.log("Getting card")
    console.log(value)
      return value;
    }).catch((err) => {
      return false;
  });
}

async function getCardPartial() {
  return await RNSecureStorage.get("cardPartial").then((value) => {
    console.log("Getting card")
    console.log(value)
      return value;
    }).catch((err) => {
      return false;
  });
}


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

async function setCardToken(token) {
  await RNSecureStorage.set("cardToken", token, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
  .then((res) => {
    console.log(res);     
  }, (err) => {
    console.log(err);
  })
}

async function setCardType(type) {
  await RNSecureStorage.set("cardType", type, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
  .then((res) => {
    console.log(res);     
  }, (err) => {
    console.log(err);
  })
}

async function setCardPartial(partial) {
  await RNSecureStorage.set("cardPartial", partial, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
  .then((res) => {
    console.log(res);     
  }, (err) => {
    console.log(err);
  })
}

async function setSessionId(id) {
    await RNSecureStorage.set("sessionId", id, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
    .then((res) => {
      console.log(res);    
    }, (err) => {
      console.log(err);
    });
}

async function setSessionUser(username) {
    await RNSecureStorage.set("sessionUser", username, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
    .then((res) => {
      console.log(res);    
    }, (err) => {
      console.log(err);
    })
}

async function removeCardToken() {
  await RNSecureStorage.remove("cardToken")
  .then((res) => {
    console.log(res);     
  }, (err) => {
    console.log(err);
  })
}

async function removeCardType() {
  await RNSecureStorage.remove("cardType")
  .then((res) => {
    console.log(res);    
  }, (err) => {
    console.log(err);
  })
}

async function removeCardPartial() {
  await RNSecureStorage.remove("cardPartial")
  .then((res) => {
    console.log(res);    
  }, (err) => {
    console.log(err);
  })
}

async function removeSessionId() {
    await RNSecureStorage.remove("sessionId")
    .then((res) => {
      console.log(res);    
    }, (err) => {
      console.log(err);
    });
}

async function removeSessionUser() {
    await RNSecureStorage.remove("sessionUser")
    .then((res) => {
      console.log(res);     
    }, (err) => {
      console.log(err);
    })
}

export {
  getCardToken,
  getCardType,
  getCardPartial,
  getSessionId,
  getSessionUser,
  setCardToken,
  setCardType,
  setCardPartial,
  setSessionId,
  setSessionUser,
  removeCardToken,
  removeCardType,
  removeCardPartial,
  removeSessionId,
  removeSessionUser,
}