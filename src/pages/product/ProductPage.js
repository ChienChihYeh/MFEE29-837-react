import React, { useRef, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from '../../styles/product-scss/productPage.module.scss'
import axios from 'axios'
import { useEffect } from 'react'
import ProCartContext from '../../contexts/ProCartContext'
import StarRating from './components/starRating'
import CommentLightBox from './components/CommentLightBox'
import comFakeData from './comFakeData'
import Swal from 'sweetalert2'

export default function ProductPage() {
  const { product_sid } = useParams()
  const { addProCart } = useContext(ProCartContext)
  //哪一筆評論的Index
  const [whichCom, setWhichCom] = useState(-1)
  //衣服size
  const clotheSize = ['S', 'M', 'L']
  // //fetchSize
  const [fetchSize, setFetchSize] = useState([{}])
  //預設值

  // 尺寸選取
  const [size2, setSize2] = useState()

  //燈箱切換
  const [comLightBox, setComLightBox] = useState(false)
  //換圖
  const changePic = useRef()
  // 尺寸選取

  //選擇數量
  const [num, setNum] = useState(1)
  //商品介紹、評論
  const [introCom, setintroCom] = useState(true)

  //sweetAlert2
  const sweetAlert = (text) => {
    Swal.fire({
      title: `${text}`,
      icon: 'info',
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    })
  }

  //加入購物車方法
  const addCartFunction = (v) => {
    Swal.fire({
      title: '將此商品加入購物車?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定!',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '已加入!',
          showCancelButton: false,
        })
        addProCart(
          product_sid,
          v.product_name,
          size2,
          Number(v.product_price),
          num,
          v.product_img
        )
      }
    })
  }

  //隨機產生3筆資料
  const [randomData, setRandomData] = useState([
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
  //商品細節主商品
  const productData = [
    {
      product_sid: 1,
      product_name:
        'Arcteryx 始祖鳥 Beta LT  Gore Tex登山雨衣/風雨衣/女款 鐵克諾紅 Techno',
      product_category_sid: 10,
      brand_sid: 7,
      product_price: 3699,
      product_inventory: 20,
      product_img: 'M84312469_big4.jpg',
      product_imgs:
        'M84312469_big4.jpg,M84312469_big3.jpg,M84312469_big2.jpg,M84312469_big1.jpg',
      product_spec:
        'Arcteryx 始祖鳥 Beta LT 女款 Gore Tex登山雨衣/風雨衣 29458 材質：3L tricot技術N40p-X GORE-TEX材質 重量：350g 符合bluesign標準的材料',
      product_feature:
        '透氣的GORE-TEX材質提供全面抗候防護 可調整、可兼容頭盔StormHood™兜帽提供防護且不遮擋視線 WaterTight™抗水主拉鍊 雙WaterTight™抗水拉鍊插手口袋，配有RS™拉鍊頭 腋下拉鍊以便透氣 WaterTight™抗水主拉鍊 兩個可調節的下擺抽繩，可防止寒氣入侵 可調式袖口 ',
      size: 'S',
    },
  ]

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
  //我是fetch
  const getProductData = async () => {
    const response = await axios.get(
      `http://localhost:3001/product/page/${product_sid}`
    )
    const r = response.data
    console.log(r)
    setDatas(r)
  }
  //我是fetch Size的
  const getSize2 = async () => {
    const response = await axios.get(
      `http://localhost:3001/product/size/${product_sid}`
    )
    const r = response.data
    console.log(r)
    setFetchSize(r)
  }

  //format currency
  const moneyFormat = (price) => {
    let a = Number(price)
    let b = a.toLocaleString('zh-TW', { style: 'currency', currency: 'TWD' })
    let c = b.split('.')
    return c[0]
  }
  //取得亂數資料的方法
  const getRondomProductData = async () => {
    const response = await axios.get('http://localhost:3001/product/random')
    const r = response.data
    console.log(r)
    setRandomData(r)
  }
  // 切換開關方法
  const changeBtn = (e) => {
    setintroCom(!introCom)
  }
  // mouseLeave Function
  const msLeave = (v) => {
    changePic.current.setAttribute(
      'src',
      `http://localhost:3001/imgs/zx/${v.product_imgs[0]}`
    )
  }
  // 商品介紹 or 商品評論
  const intro = datas.map((v, i) => {
    return (
      <div className={styled.introWrap}>
        <div className={styled.introTitle}>產品規格</div>
        <p className={styled.intro}>{v.product_spec}</p>
        <div className={styled.introTitle}>特色說明</div>
        <p className={styled.intro}>{v.product_feature}</p>
        <div className={styled.introTitle}>猜你喜歡</div>
        <div className={styled.guessYouLike}>
          {randomData.map((v, i) => {
            return (
              <Link
                className={styled.card}
                key={v.product_sid}
                to={'/product/' + v.product_sid}
                onClick={() => {
                  getProductData()
                }}
              >
                <div>
                  <div className={styled.imgWrap}>
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_img}`}
                      alt=""
                    />
                  </div>
                  <p className={styled.p}>{v.product_name}</p>
                  <h2>
                    金額：<span>${v.product_price}</span>
                  </h2>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    )
  })

  const com = (
    <div className={styled.comWrap}>
      <div className={styled.starBox}>
        <StarRating />
        <p className={styled.write} onClick={() => {}}>
          (19)
        </p>
      </div>
      <div className={styled.commonArea}>
        {comFakeData.map((v, i) => {
          return (
            <div className={styled.commonBox}>
              <div className={styled.commonTitle}>
                <div className={styled.commonTitle_img_border}>
                  <div className={styled.commonTitle_img}>
                    <img
                      src="https://cdn2.ettoday.net/images/2253/2253152.jpg"
                      alt=""
                    />
                  </div>
                </div>

                <div className={styled.memberName}>{v.name}</div>
              </div>
              <div className={styled.commonText}>{v.text}</div>
              <div className={styled.howStar}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <div
                className={styled.readMore}
                onClick={() => {
                  setWhichCom(i)
                  setComLightBox(true)
                }}
              >
                閱讀更多
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
  const shoseSize = (
    <>
      <h2>商品規格</h2>
      {fetchSize.map((v, i) => {
        return (
          <>
            <div
              className={
                size2 === v.size
                  ? `${styled.standardBoxChose2}`
                  : `${styled.standardBox2}`
              }
              onClick={() => {
                setSize2(v.size)
              }}
            >
              {v.size}
            </div>
          </>
        )
      })}
    </>
  )

  const clotheChose = (
    <>
      <h2>商品規格</h2>
      {clotheSize.map((v, i) => {
        return (
          <>
            <div
              className={
                size2 == clotheSize[i]
                  ? `${styled.standardBoxChose}`
                  : `${styled.standardBox}`
              }
              onClick={() => {
                setSize2(v)
              }}
            >
              {v}
            </div>
          </>
        )
      })}
    </>
  )
  useEffect(() => {
    getRondomProductData()
  }, [])
  useEffect(() => {
    getProductData()
  }, [product_sid])
  useEffect(() => {
    getSize2()
  }, [])
  return (
    <>
      <div className={styled.empty}></div>
      {comLightBox && (
        <CommentLightBox
          comFakeData={comFakeData}
          whichCom={whichCom}
          setComLightBox={setComLightBox}
        />
      )}
      <div className={styled.card}>
        <div className={styled.container}>
          {/* //bordshell */}
          {datas.map((v, i) => {
            return (
              <div className={styled.productDtail} key={v.product_sid}>
                <div className={styled.imgBox}>
                  <div className={styled.bigImg}>
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_img}`}
                      alt=""
                      ref={changePic}
                    />
                  </div>
                  <div className={styled.imgGroup}>
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_imgs[0]}`}
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          `http://localhost:3001/imgs/zx/${v.product_imgs[0]}`
                        )
                      }}
                      onMouseLeave={() => {
                        msLeave(v)
                      }}
                    />
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_imgs[1]}`}
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          `http://localhost:3001/imgs/zx/${v.product_imgs[1]}`
                        )
                      }}
                      onMouseLeave={() => {
                        msLeave(v)
                      }}
                    />
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_imgs[2]}`}
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          `http://localhost:3001/imgs/zx/${v.product_imgs[2]}`
                        )
                      }}
                      onMouseLeave={() => {
                        msLeave(v)
                      }}
                    />
                    <img
                      src={`http://localhost:3001/imgs/zx/${v.product_imgs[3]}`}
                      alt=""
                      onMouseMove={() => {
                        changePic.current.setAttribute(
                          'src',
                          `http://localhost:3001/imgs/zx/${v.product_imgs[3]}`
                        )
                      }}
                      onMouseLeave={() => {
                        msLeave(v)
                      }}
                    />
                  </div>
                </div>

                <div className={styled.productText}>
                  <div className={styled.productTitle}>
                    <h1>{v.product_name}</h1>
                    <Link>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </Link>
                  </div>

                  <div className={styled.standard}>
                    {v.product_category_sid == 9 || v.product_category_sid == 10
                      ? clotheChose
                      : ''}
                    {v.product_category_sid == 7 || v.product_category_sid == 8
                      ? shoseSize
                      : ''}
                  </div>
                  <h2>金額：{moneyFormat(v.product_price)}</h2>
                  <div className={styled.howNum}>
                    <p>商品數量</p>
                    <div className={styled.numBox}>
                      <div className={styled.numBox1}>
                        <i
                          className="fa-solid fa-minus"
                          onClick={() => {
                            if (num < 2) return
                            setNum(num - 1)
                          }}
                        ></i>
                      </div>
                      <div className={styled.numBox2}>{num}</div>
                      <div className={styled.numBox3}>
                        <i
                          className="fa-solid fa-plus"
                          onClick={() => {
                            if (num > v.product_inventory) return
                            setNum(num + 1)
                          }}
                        ></i>
                      </div>
                    </div>
                  </div>

                  <div className={styled.buttonGroup}>
                    <button
                      className={styled.cart}
                      onClick={() => {
                        if (
                          (v.product_category_sid == '7' ||
                            v.product_category_sid == '8' ||
                            v.product_category_sid == '9' ||
                            v.product_category_sid == '10') &&
                          !size2
                        ) {
                          return sweetAlert('請選尺寸')
                        }
                        addCartFunction(v)
                      }}
                    >
                      加入購物車
                    </button>
                    <Link
                      to={
                        (v.product_category_sid == '7' ||
                          v.product_category_sid == '8' ||
                          v.product_category_sid == '9' ||
                          v.product_category_sid == '10') &&
                        !size2
                          ? ''
                          : '/cart'
                      }
                    >
                      <button
                        className={styled.buy}
                        onClick={() => {
                          if (
                            (v.product_category_sid == '7' ||
                              v.product_category_sid == '8' ||
                              v.product_category_sid == '9' ||
                              v.product_category_sid == '10') &&
                            !size2
                          ) {
                            return sweetAlert('請選尺寸')
                          }
                          addProCart(
                            product_sid,
                            v.product_name,
                            size2,
                            Number(v.product_price),
                            num,
                            v.product_img
                          )
                        }}
                      >
                        直接購買
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
          <div className={styled.changeTitle}>
            <div
              className={
                introCom
                  ? `${styled.productIntro} ${styled.underLine}`
                  : `${styled.productIntro}`
              }
              onClick={(e) => {
                if (!introCom) {
                  changeBtn()
                } else {
                  return
                }
              }}
            >
              商品介紹
            </div>
            <div
              className={
                !introCom
                  ? `${styled.productIntro} ${styled.underLine}`
                  : `${styled.productIntro}`
              }
              onClick={() => {
                if (introCom) {
                  changeBtn()
                } else {
                  return
                }
              }}
            >
              商品評論
            </div>
          </div>
          {introCom ? intro : com}
          <div className={styled.empty}></div>
        </div>
      </div>
    </>
  )
}
