
function payPremium() {
  const email = document.getElementById("adEmail").value;
  const handler = PaystackPop.setup({
    key: 'pk_live_691f0137e7ce1a10814b51da0710d626f7c1ed38',
    email: email,
    amount: 300000,
    currency: "NGN",
    callback: function (response) {
      alert("Payment successful! Ref: " + response.reference);
    },
    onClose: function () {
      alert('Transaction cancelled');
    }
  });
  handler.openIframe();
}
