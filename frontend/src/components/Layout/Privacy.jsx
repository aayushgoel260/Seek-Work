import React from 'react';
import './Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-wrapper">
      <main>
        <div className="terms-container">
          <h1 className="terms-title" id="privacy-policy">Privacy Policy</h1>
          <p className="terms-updated">Last updated: November 19, 2024</p>
          <p>
            Welcome to Seek&Work! This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website. Please read this policy carefully.
          </p>

          <section id="information-collection" className="terms-content">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us. For example, we collect information when you create an
              account, make a reservation, or communicate with us. This information may include your name, email
              address, phone number, and payment information.
            </p>
          </section>

          <section className="terms-content">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and manage your reservations and transactions.</li>
              <li>Improve our services and website.</li>
              <li>Communicate with you, including sending updates and promotional materials.</li>
            </ul>
          </section>

          <section className="terms-content">
            <h2>3. How We Share Your Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers who assist us in operating our website and providing services.</li>
              <li>Legal authorities if required to comply with legal obligations or protect our rights.</li>
            </ul>
          </section>

          <section className="terms-content">
            <h2>4. Security of Your Information</h2>
            <p>
              We implement reasonable security measures to protect your information from unauthorized access, use, or
              disclosure. However, no method of transmission over the internet or electronic storage is completely
              secure, so we cannot guarantee absolute security.
            </p>
          </section>

          <section className="terms-content">
            <h2>5. Your Choices</h2>
            <p>
              You can access, correct, or delete your personal information by contacting us at
              <a href="mailto:abhishekduggal04@gmail.com"> abhishekduggal04@gmail.com</a>. You may also opt out of
              receiving promotional communications from us by following the unsubscribe instructions included in those
              communications.
            </p>
          </section>

          <section className="terms-content">
            <h2>6. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="terms-content" id="contact-us">
            <h2>7. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
            <ul>
              <li>Email: abhishekduggal04@gmail.com</li>
              <li>Address: Oxford Street, Punjab</li>
            </ul>
          </section>
        </div>
      </main>
</div>
);
}
