async function updateOrderStatus(status) {
    return await fetch(WEB_URL + "/order/update/" + this.props.order.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          "status": status,
          "customer_id": this.props.contact.id,
        }
      )
    })

    .then((response) => response.json())
    .then((responseJson) => {
      if(status == "processing")
      this.props.navigation.navigate('Success')
    })
    .catch((error) => {
      console.error(error);
    });
}

export {
    updateOrderStatus
}