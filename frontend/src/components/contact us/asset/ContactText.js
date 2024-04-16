import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const ContactText = () => {
  return (
    <div className="contact-maintext">
      <div className="contact-innertext">
        <p>
          We appreciate you reaching out to us. We value your desire to get in
          touch with us. Our staff is available to help you and answer any
          queries or worries you may have.
        </p>
        <p>
          <b>You can reach us using any of the following methods:</b>
        </p>
      </div>
      <div className="contact-list">
        <li>
          <FaPhoneAlt />
          +91 82229 - 44567
        </li>
        <li>
          <FaRegEnvelope />
          ecom@gurez.com
        </li>
        <li>
          <IoLocationOutline />
          near Church, Anand Vihar Colony, Karnal, Haryana
        </li>
      </div>
      <h3>Businees hours</h3>
      <div className="contact-main-div">
        <div className="contact-inner-left">
          <p>
            <strong>Monday</strong>
          </p>
          <p>
            <strong>Tuesday</strong>
          </p>
          <p>
            <strong>Wednesday</strong>
          </p>
          <p>
            <strong>Thursday</strong>
          </p>
          <p>
            <strong>Friday</strong>
          </p>
          <p>
            <strong>Saturday</strong>
          </p>
          <p>
            <strong>Sunday</strong>
          </p>
        </div>
        <div className="contact-inner-right">
          <p>7 am–11 pm</p>
          <p>7 am–11 pm</p>
          <p>7 am–11 pm</p>
          <p>7 am–11 pm</p>
          <p>7 am–11 pm</p>
          <p>7 am–11 pm</p>
          <p>7 am–5 pm</p>
        </div>
      </div>
    </div>
  );
};

export default ContactText;
