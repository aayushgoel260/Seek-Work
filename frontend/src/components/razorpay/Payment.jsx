import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Payment({setHasVisitedPayment}) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Set the button to appear after 6 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 18000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);
  const amount = 100;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    const response = await fetch("http://localhost:8080/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const order = await response.json();
    console.log(order);

    var options = {
      key: "rzp_test_solbTfFIP51l4S", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "SEEK&WORK", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:8080/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f4f4f4' }}>
      <div
        style={{
          width: '500px', // Increased card size
          padding: '30px',
          background: '#fff',
          borderRadius: '10px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          textAlign: 'center',
          height:'600px'
        }}
      >
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Job Posting</h2>
        <p style={{ marginBottom: '20px', color: '#555', fontSize: '18px' }}>
          To post a job, you need to buy a subscription first.
        </p>
        <img
          src="/logo.png"
          width="90%"
        />
        <br/><br/><br/><br/><br/>
        <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        onClick={paymentHandler}
        style={{
          background: '#87CEEB',
          color: '#fff',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '5px',
          fontSize: '18px',
          cursor: 'pointer',
          transition: 'background 0.3s ease',
          marginRight: '16px', // Add margin to the right of the button
        }}
        onMouseOver={(e) => (e.target.style.background = '#6495ED')}
        onMouseOut={(e) => (e.target.style.background = '#87CEEB')}
      >
        Buy Subscription
      </button>
      {isVisible && (
        <Link
          to="/job/post"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#87CEEB',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'background 0.3s ease',
          }}
          onClick={() => setHasVisitedPayment(true)}
          onMouseOver={(e) => (e.target.style.background = '#6495ED')}
          onMouseOut={(e) => (e.target.style.background = '#87CEEB')}
        >
          Go to Job Post
        </Link>
      )}
    </div>

      </div>
    </div>
  );
  
}

export default Payment;
