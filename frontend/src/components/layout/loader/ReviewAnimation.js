import React from 'react'

const ReviewAnimation = () => {
  return (
    <>
    <div id="homepage" className="col-md-12 rev-animation">
      <div style={{alignItems:'center'}} className="item row">
        <div className="animated-background rev-image-box" />
       <div className='col-md-8'>
       <div className="animated-background rect1" />
        <div className="animated-background rect2" />
        <div className="animated-background rect3" />
        <div style={{marginBottom:0}} className="animated-background rect4" />
       </div>
      </div>
    </div>
  </>
  )
}

export default ReviewAnimation
