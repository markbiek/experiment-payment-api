(function ($) {
    if (!window.PaymentRequest) {
        alert("No payment for you!");
    } else {
        const paymentMethods = [
            {
                supportedMethods: ["basic-card"]
            }
        ];

        const paymentDetails = {
            total: {
                label: "Total",
                amount: {
                    currency: 'USD',
                    value: 0
                }
            }
        };

        const options = {};

        const request = new PaymentRequest(paymentMethods, paymentDetails, options);

        //Display the request UI
        request.show()
        .then(response => {
            //Simulate processing the payment
            setTimeout(() => {
                //When "payment" is complete, close the UI
                return response.complete()
                .then(() => {
                    //Output the response
                    console.log(response);
                });
            }, 1000);
        })
        .catch(err => {
            console.error(err);
        });
    }
})(jQuery);
