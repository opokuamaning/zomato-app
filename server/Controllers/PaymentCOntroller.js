const Razorpay = require("razorpay");
const KEY_ID = "rzp_test_RB0WElnRLezVJ5";
const KEY_SECRET = "VLMCIrqKxRMNR9EcRcbL2UG8";
let instance = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});
const crypto = require("crypto");
const PaymentController = {
  createOrder: (request, response) => {
    let { amount } = request.body;
    let options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        response.status(500).send({
          call: false,
          message: "unable to create order",
        });
      } else {
        response.send({
          call: true,
          order,
        });
      }
    });
  },
  verifyPayment: (request, response) => {
    let { payment_id, order_id, signature } = request.body;
    let payDetails = order_id + "|" + payment_id
    let generated_signature = crypto.createHmac("sha256", KEY_SECRET).update(payDetails.toString()).digest("hex");
    console.log("generated signature", generated_signature);
    console.log("client signature", signature);
    if (generated_signature == signature) {
      response.send({
        status: true,
        message: "Payment done",
      });
    } else {
      response.status(500).send({
        call: false,
        message: "Payment failed",
      });
    }
  },
};

module.exports = PaymentController;
