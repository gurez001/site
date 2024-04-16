import React, { useState } from 'react';
import './Ordercancel.css';

function Ordercancel() {
    const [name,setName]=useState('Order Created By Mistakes');

  
  return (
   <>
  
  <div className="tracking">
        <div className="tracking-status">
          <h2>Order Cancellation</h2>
          <form>
   <select value={name} onChange={e=>setName(e.target.value)}>
    <option >Cancel Reason</option>
    <option value="Order Created By Mistakes">Order Created By Mistake</option>
    <option value="Item Would Not Arrive On Times">Item Would Not Arrive On Time</option>
    <option value="Shipping Cost Too High">Shipping Cost Too High</option>
    <option value="Item Price TOO High">Item Price TOO High</option>
    <option value="Found Cheaper Somewhere Else">Found Cheaper Somewhere Else</option>
    <option value='Need To Change Shipping Address'>Need To Change Shipping Address</option>
    <option value='Need To Change Shipping Speed'>Need To Change Shipping Speed</option>
    <option value='Need To Change Billing Address'>Need To Change Billing Address</option>
    <option value='Need To Change Payment Method'>Need To Change Payment Method</option>
    <option value='Others'>Others</option>
   </select>
   
   <button type='Submit'>Request Cancellation</button>
   </form>
</div>
</div>
   </>
  )
 
}

export default Ordercancel
