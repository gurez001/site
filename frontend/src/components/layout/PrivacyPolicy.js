import React from "react";
import MetaData from "./metaData/MetaData";

const PrivacyPolicy = () => {
  return (
   <>
    <MetaData title={'Privacy Policy'} content={'Privacy Policy'} keywords={'Privacy Policy'} />
    <section>
      <div className="product-cont privacy-policy">
        <h1>Privacy Policy</h1>
        <div>
          <h2>GDPR and CCPA Compliance: Protecting Your Data and Privacy</h2>
          <p>
            At Gurez, we are committed to protecting the privacy and data of our
            users and customers. We prioritize compliance with the General Data
            Protection Regulation (GDPR) and the California Consumer Privacy Act
            (CCPA) to ensure that your personal information is handled with the
            utmost care and in accordance with these regulations.
          </p>
          <h2>General Data Protection Regulation (GDPR)</h2>
          <ol>
            <li>
              <p>
                Lawful Basis for Data Processing: Gurez ensures that we have a
                lawful basis for processing personal data in accordance with the
                GDPR. We collect and process personal information when we have
                obtained your consent or when it is necessary to fulfill a
                contract, comply with legal obligations, protect vital
                interests, perform a task in the public interest, or pursue
                legitimate interests.
              </p>
            </li>
            <li>
              <p>
                Transparent Data Processing: We are transparent about how we
                collect, use, and store your personal data. Our Privacy Policy
                provides detailed information about the data we collect, the
                purpose of processing, the legal basis for processing, data
                retention periods, and your rights as a data subject.
              </p>
            </li>
            <li>
              <p>
                Individual Rights: Gurez respects your rights as a data subject
                under the GDPR. You have the right to access, rectify, erase,
                restrict, and object to the processing of your personal data.
                You can exercise these rights by contacting us through the
                contact information provided at the end of this page.
              </p>
            </li>
            <li>
              <p>
                Data Security: We have implemented technical and organizational
                measures to protect your personal data against unauthorized
                access, loss, alteration, or disclosure. Our security measures
                include encryption, access controls, regular audits, and staff
                training.
              </p>
            </li>
            <li>
              <p>
                Data Transfers: If your personal data is transferred outside the
                European Economic Area (EEA), we ensure that appropriate
                safeguards are in place to protect your data, such as using
                standard contractual clauses or relying on Privacy Shield
                certification.
              </p>
            </li>
          </ol>
          <h2>California Consumer Privacy Act (CCPA)</h2>
          <ol>
            <li>
              <p>
                Notice of Collection: Gurez provides clear and conspicuous
                notice to California consumers regarding the categories of
                personal information we collect, the purposes for which the
                information is used, and the categories of third parties with
                whom we share the information.
              </p>
            </li>
            <li>
              <p>
                Right to Know: California consumers have the right to request
                information about the personal information we collect, disclose,
                and sell. We provide a means for you to request this information
                and will respond within the timeframes mandated by the CCPA.
              </p>
            </li>
            <li>
              <p>
                Right to Delete: California consumers can request the deletion
                of their personal information held by Gurez. We honor these
                requests, subject to certain exceptions allowed under the CCPA.{" "}
              </p>
            </li>
            <li>
              <p>
                Non-Discrimination: Gurez does not discriminate against
                California consumers for exercising their CCPA rights. We will
                not deny goods or services, charge different prices, or provide
                a different level or quality of service based on your exercise
                of these rights.
              </p>
            </li>
            <li>
              <p>
                Data Sales Opt-Out: Gurez does not sell personal information to
                third parties.
              </p>
            </li>
          </ol>
          <p>Who We Are Our website address is: https://gurez.com.</p>
          <p>
            Comments When visitors leave comments on the site, we collect the
            data shown in the comments form, the visitor’s IP address, and
            browser user agent string to help with spam detection.
          </p>
          <p>
            An anonymized string created from your email address (also called a
            hash) may be provided to the Gravatar service to see if you are
            using it. The Gravatar service privacy policy is available at:
            https://automattic.com/privacy/. After approval of your comment,
            your profile picture is visible to the public in the context of your
            comment.
          </p>
          <p>
            Media If you upload images to the website, please ensure that you
            avoid uploading images with embedded location data (EXIF GPS)
            included. Visitors
          </p>
        </div>
      </div>
    </section>
    </>
  );
};

export default PrivacyPolicy;
