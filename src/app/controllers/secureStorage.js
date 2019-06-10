import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import Modal2 from '../../app/components/common/modal'

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
async function setCardToken(token) {
  await RNSecureStorage.set("cardToken", token, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
  .then((res) => {
    console.log(res);     //TODO: error messages && alerts?
  }, (err) => {
    console.log(err);
    this.refs.modal.setTitle("Kortin syöttämisessä ongelma");
    this.refs.modal.setContent("Kortin syöttämisessä ongelma yritä uudelleen");
    this.refs.modal.show();
  })
}

async function setCardType(type) {
  await RNSecureStorage.set("cardType", type, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
  .then((res) => {
    console.log(res);     //TODO: error messages && alerts?
  }, (err) => {
    console.log(err);
    this.refs.modal.setTitle("Kortin syöttämisessä ongelma");
    this.refs.modal.setContent("Kortin syöttämisessä ongelma yritä uudelleen");
    this.refs.modal.show();
  })
}

async function setCardPartial(partial) {
  await RNSecureStorage.set("cardPartial", partial, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
  .then((res) => {
    console.log(res);     //TODO: error messages && alerts?
  }, (err) => {
    console.log(err);
    this.refs.modal.setTitle("Kortin syöttämisessä ongelma");
    this.refs.modal.setContent("Kortin syöttämisessä ongelma yritä uudelleen");
    this.refs.modal.show();
  })
}

async function setSessionId(id) {
    await RNSecureStorage.set("sessionId", id, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
    .then((res) => {
      console.log(res);     //TODO: error messages && alerts?
    }, (err) => {
      console.log(err);
      this.refs.modal.setTitle("Ongelma viedessä käyttäjän ID:tä");
      this.refs.modal.setContent("Yritä uudelleen");
      this.refs.modal.show();
    });
}

async function setSessionUser(username) {
    await RNSecureStorage.set("sessionUser", username, {accessible: ACCESSIBLE.WHEN_UNLOCKED})
    .then((res) => {
      console.log(res);     //TODO: error messages && alerts?
    }, (err) => {
      console.log(err);
      this.refs.modal.setTitle("Ongelma viedessä käyttäjätunnusta");
      this.refs.modal.setContent("Yritä uudelleen");
      this.refs.modal.show();
    })
}

async function removeCardToken() {
  await RNSecureStorage.remove("cardToken")
  .then((res) => {
    console.log(res);     //TODO: error messages && alerts?
  }, (err) => {
    console.log(err);
    this.refs.modal.setTitle("Ongelma poistettaessa korttia");
    this.refs.modal.setContent("Yritä uudelleen");
    this.refs.modal.show();
  })
}

async function removeCardType() {
  await RNSecureStorage.remove("cardType")
  .then((res) => {
    console.log(res);     //TODO: error messages && alerts?
  }, (err) => {
    console.log(err);
    this.refs.modal.setTitle("Ongelma poistettaessa korttia");
    this.refs.modal.setContent("Yritä uudelleen");
    this.refs.modal.show();
  })
}

async function removeCardPartial() {
  await RNSecureStorage.remove("cardPartial")
  .then((res) => {
    console.log(res);     //TODO: error messages && alerts?
  }, (err) => {
    console.log(err);
    this.refs.modal.setTitle("Ongelma poistettaessa korttia");
    this.refs.modal.setContent("Yritä uudelleen");
    this.refs.modal.show();
  })
}

async function removeSessionId() {
    await RNSecureStorage.remove("sessionId")
    .then((res) => {
      console.log(res);     //TODO: error messages && alerts?
    }, (err) => {
      console.log(err);
      this.refs.modal.setTitle("Ongelma poistettaessa istuntoa");
      this.refs.modal.setContent("Yritä uudelleen");
      this.refs.modal.show();
    });
}

async function removeSessionUser() {
    await RNSecureStorage.remove("sessionUser")
    .then((res) => {
      console.log(res);     //TODO: error messages && alerts?
    }, (err) => {
      console.log(err);
      this.refs.modal.setTitle("Ongelma poistettaessa istuntoa");
      this.refs.modal.setContent("Yritä uudelleen");
      this.refs.modal.show();
    })
}

const Message = () =>{
  return(
    <View>
      <Modal2 ref='modal'/>
    </View>
  );
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
  Message,
}