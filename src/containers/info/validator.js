import React from 'react'

const email = (email) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
    if (reg.test(email) === true) {
      return true;
    } else {
      return false;
    }
}


export default {
  email,
}
