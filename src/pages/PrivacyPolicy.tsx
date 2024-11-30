import { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    // Scrolls to the top of the page on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-36 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-4">Privacy Policy</h2>
      <p className="text-gray-700 mb-6">
        <strong>Last Updated:</strong> November 26, 2024
      </p>

      <section className="mb-6">
        <p className="mb-4">
          This Privacy Policy describes how <strong>TooFarGone</strong> (the "Site," "we," "us," or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from{" "}
          <strong>toofargone.in</strong> (the "Site") or otherwise communicate with us (collectively, the "Services").
        </p>
        <p className="mb-4">
          For the purposes of this Privacy Policy, "you" and "your" refer to you as a user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected. 
          Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. 
          If you do not agree to this Privacy Policy, please do not use or access any of the Services.
        </p>
      </section>

      <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
      <p className="mb-6">
        We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. 
        We will post the revised Privacy Policy on the Site and update the "Last Updated" date accordingly.
      </p>

      <h2 className="text-2xl font-semibold mb-4">How We Collect and Use Your Personal Information</h2>
      <p className="mb-4">
        To provide the Services, we collect personal information about you from various sources. The information we collect and use varies depending on how you interact with us. 
        In addition to the specific uses outlined below, we may use information we collect about you to communicate with you, provide the Services, comply with legal obligations, enforce terms of service, and protect our rights and those of our users.
      </p>

      <h3 className="text-xl font-semibold mb-2">What Personal Information We Collect</h3>
      <p className="mb-4">The types of personal information we obtain depend on how you interact with our Site and use our Services. The following sections describe the categories and specific types of personal information we collect:</p>
      
      <ul className="list-disc pl-5 mb-6">
        <li className="mb-2">
          <strong>Information We Collect Directly from You:</strong>
          <ul className="list-disc pl-5">
            <li>Basic contact details: name, address, phone number, email.</li>
            <li>Order information: billing address, shipping address, payment confirmation.</li>
            <li>Account information: username, password, security questions.</li>
            <li>Shopping information: items viewed, added to cart or wishlist.</li>
            <li>Customer support information: details included in communications with us.</li>
          </ul>
        </li>
        <li className="mb-2">
          <strong>Information We Collect through Cookies:</strong>
          Usage data including device information, browser details, IP address through cookies and similar technologies.
        </li>
        <li>
          <strong>Information We Obtain from Third Parties:</strong>
          Data from vendors and service providers who collect information on our behalf (e.g., payment processors like Shopify).
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">How We Use Your Personal Information</h2>
      <ul className="list-disc pl-5 mb-6">
        <li className="mb-2">Providing Products and Services: To process payments, fulfill orders, send notifications related to your account and transactions.</li>
        <li className="mb-2">Marketing and Advertising: To send promotional communications via email or text message.</li>
        <li className="mb-2">Security and Fraud Prevention: To detect and investigate fraudulent activity.</li>
        <li>Communication: To provide customer support and improve our Services.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
      <p className="mb-6">
        We use cookies to enhance our Site and Services. You can manage cookies through your browser settings; however, blocking cookies may impact your user experience.
      </p>

      <h2 className="text-2xl font-semibold mb-4">How We Disclose Personal Information</h2>
      <p className="mb-4">
        We may disclose your personal information to third parties in certain circumstances:
      </p>
      <ul className="list-disc pl-5 mb-6">
        <li className="mb-2">With vendors or other third parties performing services on our behalf (e.g., payment processing).</li>
        <li className="mb-2">With business partners for marketing purposes.</li>
        <li>When you consent to disclosure for specific purposes.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">Third Party Websites and Links</h2>
      <p className="mb-6">
        Our Site may link to third-party platforms. We are not responsible for their privacy practices. Please review their policies before sharing personal data.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Children’s Data</h2>
      <p className="mb-6">
        Our Services are not intended for children. If you believe a child has shared personal information with us, please contact us to request its deletion.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Security and Retention of Your Information</h2>
      <p className="mb-6">
        While we implement security measures, no system is completely secure. Retention of your personal information depends on various factors including legal obligations.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Your Rights and Choices</h2>
      <p className="mb-4">Depending on your location, you may have rights regarding your personal information:</p>
      <ul className="list-disc pl-5 mb-6">
        <li className="mb-2">Right to Access: Request access to personal information we hold about you.</li>
        <li className="mb-2">Right to Delete: Request deletion of your personal information.</li>
        <li className="mb-2">Right to Correct: Request correction of inaccurate personal data.</li>
        <li>Right of Portability: Request a copy of your data in certain circumstances.</li>
      </ul>

      <p>You can manage communication preferences by opting out of promotional emails at any time.</p>
<br></br>
      <h2 className="text-2xl font-semibold mb-4">Complaints</h2>
      <p className="mb-6">
        If you have complaints about how we process your personal information, please contact us. If unsatisfied with our response, you may appeal our decision or lodge a complaint with your local data protection authority.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p>
        For questions about this Privacy Policy or if you wish to exercise your rights, please email us at:  
        <a href="mailto:toofargonesupp0rt@gmail.com" className="text-blue-500">toofargonesupp0rt@gmail.com</a>.
      </p>
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