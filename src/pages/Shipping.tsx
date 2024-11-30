import { useEffect } from 'react';

export default function Shipping() {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  return (
    <div className="pt-36 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-4">Shipping Policy</h1> {/* Increased size */}
      <p className="text-gray-700">
        At TooFarGone, we strive to ensure customer satisfaction with our products. Please review the following policy regarding returns and refunds:
      </p>
      <p>
        <u>All Sales Are Final:</u><br />
        We do not accept returns or offer refunds on any purchased items. Once an order has been placed and processed, all sales are considered final. We do not accommodate requests for returns after the shipment has been dispatched.
      </p>
      
      <p>
        <u>Exceptional Circumstances:</u><br />
        If you receive an incorrect size or product different from what you ordered, we are committed to resolving the issue promptly. Please contact us at toofargonesupp0rt@gmail.com within 24 hours of receiving your package to report any discrepancies.
      </p>

      <p>
        <u>Lost, Unclaimed, or Damaged Packages:</u><br />
        TooFarGone is not liable for any lost, unclaimed, or damaged packages after they have been shipped and left our facilities. We recommend contacting the relevant courier service for further assistance and information regarding your package.
      </p>

      <p>
        <u>Contact Us:</u><br />
        If you encounter any problems or have inquiries about your order, please reach out to our customer support team at toofargonesupp0rt@gmail.com. We are dedicated to providing assistance and ensuring a positive experience for our valued customers.
      </p>

      <p>
        <u>Note:</u><br />
        This policy applies to all purchases made through TooFarGone's official website or authorized sales channels.
      </p>

      <p>
        <u>Thank you for your understanding and support of TooFarGone.</u><br />
        We appreciate your business!
      </p>

      <h1 className="text-4xl font-bold mb-4">Exchange Policy</h1> {/* Increased size */}
      <p className="text-gray-700">
        Please check your order when you receive it and contact us right away if it’s incorrect size. We’ll evaluate the issue and try to make it right. If you receive an incorrect size or product different from what you ordered, we are committed to resolving the issue promptly. Please contact us at toofargonesupp0rt@gmail.com within 24 hours of receiving your package to report any discrepancies.
      </p>

      {/* Back Home Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => window.location.href = "/"} // Redirect to home
          className="bg-black text-xs text-white py-1 px-4 hover:bg-gray-800 transition"
        >
          BACK HOME
        </button>
      </div>
    </div>
  );
}
