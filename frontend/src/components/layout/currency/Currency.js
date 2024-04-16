import React from 'react'

const Currency = ({price}) => {

    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(parseFloat(price));
  return (
  <>
  { formattedPrice }
  
  </>
  )
}

export default Currency
