document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const matric = document.getElementById('matric').value.trim();
  const rrr = document.getElementById('rrr').value.trim();
  if (!matric || !rrr) return alert("Enter valid details");

  const handler = PaystackPop.setup({
    key: 'pk_live_691f0137e7ce1a10814b51da0710d626f7c1ed38',
    email: matric + "@student.ful.edu.ng",
    amount: 20000,
    currency: "NGN",
    metadata: {
      custom_fields: [
        { display_name: "Matric", variable_name: "matric", value: matric },
        { display_name: "RRR", variable_name: "rrr", value: rrr }
      ]
    },
    callback: function (response) {
      localStorage.setItem('user', JSON.stringify({matric, rrr}));
      alert("Payment successful!");
      window.location.href = "../quiz/select.html";
    },
    onClose: function () {
      alert('Payment was cancelled.');
    }
  });
  handler.openIframe();
});
