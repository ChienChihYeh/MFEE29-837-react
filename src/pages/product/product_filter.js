import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react'
import styled from '../../styles/product-scss/product.module.scss'

export default function Product_filter() {
  const [lowPrice, setLowPrice] = useState('')
  const [highPrice, setHighPrice] = useState('')
  const brandOptions = ['Arcteryx 始祖鳥', 'mmm']
  const [brand, setBrand] = useState('')

  const [datas, setDatas] = useState([
    {
      product_sid: '1',
      product_name: 'a',
      product_category_sid: '10',
      brand_sid: '7',
      product_price: '3699',
      product_inventory: '20',
      product_img: '1',
      product_imgs: '1',
      product_spec: '1',
      product_feature: '1',
      size: 'S',
    },
  ])

  let allProduct = 'http://localhost:3001/product/all'
  let price = 'http://localhost:3001/product/price'
  let brands = 'http://localhost:3001/product/brand'
  let price_brand = 'http://localhost:3001/product/price&brand'
  const getData = async (rotues) => {
    if (lowPrice && highPrice && brand) {
      const response = await axios.post(rotues, {
        lowPrice: [lowPrice],
        highPrice: [highPrice],
        brand: brand,
      })
      const data = response.data
      console.log(data)
    } else if (lowPrice && highPrice) {
      const response = await axios.post(rotues, {
        lowPrice: [lowPrice],
        highPrice: [highPrice],
      })
      const data = response.data
      console.log(data)
    } else if (brand) {
      const response = await axios.post(rotues, {
        brand: [brand],
      })
      const data = response.data
      console.log(data)
    }
  }

  const filterData = () => {
    if (lowPrice && highPrice && brand) {
      getData(price_brand)
    } else if (lowPrice && highPrice) {
      getData(price)
    } else if (brand) {
      getData(brands)
    }
  }
  useEffect(() => {}, [])
  return (
    <div className={styled.filter}>
      <form action="">
        <h2>價格</h2>
        <div className={styled.pricebox}>
          <input
            size="5"
            type="text"
            placeholder="最低價格"
            name="lowPrice"
            value={lowPrice}
            onChange={(e) => {
              setLowPrice(e.target.value)
            }}
          />
          <div className={styled.dash}></div>
          <div className="dash"></div>
          <input
            size="5"
            type="text"
            placeholder="最高價格"
            name="highPrice"
            value={highPrice}
            onChange={(e) => {
              setHighPrice(e.target.value)
            }}
          />
        </div>
        <h2> 品牌</h2>
        {/* <input
          type="text"
          placeholder="請輸入品牌"
          name="brands"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value)
          }}
        /> */}
        <select
          name="brand"
          id=""
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value)
          }}
          className={styled.filterSelect}
        >
          <option value="-1">請選出廠牌</option>
          {brandOptions.map((v, i) => {
            return (
              <option key={i} value={i}>
                {v}
              </option>
            )
          })}
        </select>
        <div className={styled.genderRadio}>
          <div className={styled.genderBox}>
            <label htmlFor="male">男性</label>
            <input type="radio" id="male" name="sex" value="male" />
          </div>
          <div className={styled.genderBox}>
            <label htmlFor="female">女性</label>
            <input type="radio" id="female" name="sex" value="female" />
          </div>
        </div>
        <h2> 防水等級</h2>
        <div className={styled.checkBoxWrap}>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wRes" value="wRes" />
            <label htmlFor="wRes">抗水（Water Resistant）</label>
          </div>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wRep" value="wRep" />
            <label htmlFor="wRep">防潑水（Water Repellent）</label>
          </div>
          <div className={styled.checkBox}>
            <input type="checkbox" id="wProof" value="wProof" />
            <label htmlFor="wProof">防水（Waterproof）</label>
          </div>
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault()
            filterData()
          }}
          className={styled.filterButton}
        >
          送出
        </button>
        <hr />
        <div className={styled.star}>
          <Link>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </Link>

          <Link>
            <i class="fa-solid fa-star"></i>
          </Link>
        </div>
      </form>
    </div>
  )
}