import React from 'react'
import { useState } from 'react'
import styled from '../../../styles/order-scss/OrderNum.module.scss'
function OrderNum() {
  const [open, setOpen] = useState(false)
  const openOrder = () => {
    setOpen(!open)
  }
  return (
    <>
      <div className={styled.numWrap}>
        <div className={styled.orederNum} onClick={openOrder}>
          <p> 訂單編號：0000000000</p>
        </div>
        <div className={open ? `${styled.contentOpen}` : `${styled.content}`}>
          <div className={styled.div1}>12121</div>
          <div className={styled.div1}>121212</div>
          <div className={styled.div1}>21212</div>
          <div className={styled.div1}>21212</div>
        </div>
      </div>
      {/* <div className="tabs">
        <div className="tab">
          <input type="checkbox" id="chck1" />
          <label className="tab-label" for="chck1">
            Item 1
          </label>
          <div className="tab-content">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum,
            reiciendis!
          </div>
        </div>
      </div> */}
    </>
  )
}

export default OrderNum