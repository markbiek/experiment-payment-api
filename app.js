(function ($) {
    $(document).ready(() => {
        let total = 0;

        $('.product-price').each(function() {
            total = total + $(this).data('amount');
        });

        $('#total-amount').html('$' + total + '.00').data('total', total);
    });

    $('.pay-button').on('click', (e) => {
        e.preventDefault();

        const total = parseFloat($('#total-amount').data('total'));

        if (!window.PaymentRequest) {
            alert("No payment for you!");
        } else {
            //Only add basic-card support
            //(we could limit to specific types of cards here)
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
                        value: total
                    }
                }
            };

            //No options needed for now
            const options = {};

            //Create the request
            const request = new PaymentRequest(paymentMethods, paymentDetails, options);

            //Display the request UI
            request.show()
            .then(response => {
                //Simulate processing the payment
                $('.pay-button').parent().html('<i class="fa fa-spinner pay-button"></i>');
                setTimeout(() => {
                    //When "payment" is complete, close the UI
                    return response.complete()
                    .then(() => {
                        //Output the response
                        $('.pay-button').parent().html('<p class="text-success">Payment complete!</p>');
                        console.log('Response complete:');
                        console.log(response);
                    });
                }, 1000);
            })
            .catch(err => {
                alert('Sorry, something went wrong with your payment!');
                console.error(err);
            });
        }
    });
})(jQuery);
