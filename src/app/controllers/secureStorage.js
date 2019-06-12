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

//Return for modal errors
async function setCardToken(token,parent) {
  await RNSecureStorage.set("cardToken", token, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
  .then((res) => {
    console.log(res);  
  }, (err) => {
    console.log(err);
    // NAVIGATE parent.refs.setcardtoken.setButtonAction("Home", parent.props.navigation);
    parent.refs.setcardtoken.state.visible=true;
    parent.forceUpdate();
  })
}

async function setCardType(type,parent) {
  await RNSecureStorage.set("cardType", type, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
  .then((res) => {
    console.log(res);     
  }, (err) => {
    console.log(err);
    // NAVIGATE parent.refs.setcardtoken.setButtonAction("Home", parent.props.navigation);
    parent.refs.setcardtoken.state.visible=true;
    parent.forceUpdate();
  })
}

async function setCardPartial(partial,parent) {
  await RNSecureStorage.set("cardPartial", partial, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
  .then((res) => {
    console.log(res);     
  }, (err) => {
    console.log(err);
    // NAVIGATE parent.refs.setcardpartial.setButtonAction("Home", parent.props.navigation);
    parent.refs.setcardpartial.state.visible=true;
    parent.forceUpdate();
  })
}

async function setSessionId(id,parent) {
    await RNSecureStorage.set("sessionId", id, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
    .then((res) => {
      console.log(res);    
    }, (err) => {
      console.log(err);
      // NAVIGATE parent.refs.setsessionid.setButtonAction("Home", parent.props.navigation);
      parent.refs.setsessionid.state.visible=true;
      parent.forceUpdate();
    });
}

async function setSessionUser(username,parent) {
    await RNSecureStorage.set("sessionUser", username, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
    .then((res) => {
      console.log(res);     
    }, (err) => {
      console.log(err);
      // NAVIGATE parent.refs.setsessionuser.setButtonAction("Home", parent.props.navigation);
      parent.refs.setsessionuser.state.visible=true;
      parent.forceUpdate();
    })
}

async function removeCardToken(parent) {
  await RNSecureStorage.remove("cardToken")
  .then((res) => {
    console.log(res);     
  }, (err) => {
    console.log(err);
      // NAVIGATE parent.refs.removecartoken.setButtonAction("Home", parent.props.navigation);
      parent.refs.removecarttoken.state.visible=true;
      parent.forceUpdate();
  })
}

async function removeCardType(parent) {
  await RNSecureStorage.remove("cardType")
  .then((res) => {
    console.log(res);   
  }, (err) => {
    console.log(err);
      // NAVIGATE parent.refs.removecarttype.setButtonAction("Home", parent.props.navigation);
      parent.refs.removecarttype.state.visible=true;
      parent.forceUpdate();
  })
}

async function removeCardPartial(parent) {
  await RNSecureStorage.remove("cardPartial")
  .then((res) => {
    console.log(res);     
  }, (err) => {
    console.log(err);
      // NAVIGATE parent.refs.removecartpartial.setButtonAction("Home", parent.props.navigation);
      parent.refs.removecartpartial.state.visible=true;
      parent.forceUpdate();
  })
}

async function removeSessionId(parent) {
    await RNSecureStorage.remove("sessionId")
    .then((res) => {
      console.log(res);    
    }, (err) => {
      console.log(err);
      // NAVIGATE parent.refs.removesessionid.setButtonAction("Home", parent.props.navigation);
      parent.refs.removesessionid.state.visible=true;
      parent.forceUpdate();
    });
}

async function removeSessionUser(parent) {
    await RNSecureStorage.remove("sessionUser")
    .then((res) => {
      console.log(res);    
    }, (err) => {
      console.log(err);
      // NAVIGATE parent.refs.removesessionuser.setButtonAction("Home", parent.props.navigation);
      parent.refs.removesessionuser.state.visible=true;
      parent.forceUpdate();
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