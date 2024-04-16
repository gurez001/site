import React, { useEffect } from "react";
import {
  ClearError,
  // getPaymentData,
} from "../../../../../actions/Paymentaction";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Aside } from "../../../aside/Aside";
import { keys } from "@material-ui/core/styles/createBreakpoints";
import Loader from "../../../../layout/loader/Loader";

const PaymentDetails = () => {
  const { paymentid } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, paymentData, error } = useSelector((state) => state.payData);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(ClearError());
    }
    // dispatch(getPaymentData(paymentid));
  }, [alert, error, dispatch]);
  console.log(paymentData)

  return (
    <>
      <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
               <div className="payment-row">
               {loading ? (
                  <Loader />
                ) : (
                  <>
                   <ul>
                    <li><span>id</span><span>{paymentData.id}</span></li>
                    <li><span>Amount</span><span>{paymentData.amount}</span></li>
                    <li><span>status</span><span>{paymentData.status}</span></li>
                    <li><span>currency</span><span>{paymentData.currency}</span></li>
                    <li><span>method</span><span>{paymentData.method}</span></li>
                    <li><span>email</span><span>{paymentData.email}</span></li>
                    {paymentData.bank?<li><span>bank</span><span>{paymentData.bank}</span></li>:null}
                    {paymentData.invoice_id?<li><span>invoice_id</span><span>{paymentData.invoice_id}</span></li>:null}
                    <li>
                      {paymentData.card?(
                        <ul>
                         
                          <li><span>entity</span><span>{paymentData.card.entity}</span></li>
                          <li><span>id</span><span>{paymentData.card.id}</span></li>
                          <li><span>name</span><span>{paymentData.card.name}</span></li>
                          <li><span>network</span><span>{paymentData.card.network}</span></li>
                          <li><span>type</span><span>{paymentData.card.type}</span></li>
                        </ul>
                      ):null}
                    </li>
                   </ul>
                  </>
                )}
               </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
