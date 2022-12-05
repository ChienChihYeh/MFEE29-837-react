import React from 'react'
import { useState, useContext, useEffect, useCallback, useRef } from 'react'
import MemberContext from '../../contexts/MemberContext'
import styled from '../../styles/home-scss/Leaderboard.module.scss'
import styled2 from '../../styles/home-scss/Background.module.scss'
import axios from 'axios'
import _ from 'lodash'
import InputIME from '../../components/InputIME'
export default function Leaderboard() {
  // 切換按鈕
  const [switchBtn, setSwitchBtn] = useState(true)
  // 輸入用(可控表單元件用)
  const [inputKeyword, setInputKeyword] = useState('')
  // 按下搜尋按鈕用，真正搜尋用
  const [searchKeyword, setSearchKeyWord] = useState('')

  //搜尋時抓取後端資料
  const getUsersBySearchWord = async (searchKeyword) => {
    try {
      if (switchBtn) {
        console.log('hi')
        const response = await axios.get(
          'http://localhost:3001/product/borad/api3?search=' + searchKeyword
        )
        //設定到state裡
        setAllData(response.data)
      }
      //else if (!switchBtn) {
      //   console.log('hi')
      //   const a = yourFdData.filter((v, i) => {
      //     return v.name.includes(searchKeyword)
      //   })
      //   setYourFdData(a)
      // }
    } catch (e) {
      // 錯誤處理
      console.error(e.message)
    }
  }
  // 處理過濾的函式
  const handleSearch = (searchKeyword) => {
    // 檢查，當都沒輸入時回復原本data
    if (searchKeyword === '') {
      fetchAll()
      // fetchYourFd()
      return
    }
    getUsersBySearchWord(searchKeyword)
  }
  const debounceHandleSearch = useCallback(_.debounce(handleSearch, 400), [])

  const handleChange = (e) => {
    // e.preventdefault()
    // 可控元件綁用state使用
    setSearchKeyWord(e.target.value)

    // 搜尋用 - trim去除空白，toLowerCase轉小寫英文
    const newSearchWord = e.target.value.trim().toLowerCase()

    // 傳至debounceFn中
    debounceHandleSearch(newSearchWord)
  }

  //從context來的該會員登入資料
  const memberData = useContext(MemberContext)

  // 拿到該會員相關的好友們的PO文高度
  const [yourFdData, setYourFdData] = useState([{}])
  //全部資料
  const [allData, setAllData] = useState([{}])

  const fetchYourFd = async (searchKeyword) => {
    const response = await axios.get(
      `http://localhost:3001/product/borad/api?mid=${memberData.data.member_sid}`
    )
    const data = response.data

    // console.log(r)
    setYourFdData(data)
  }

  const fetchAll = async () => {
    const response = await axios.get(`http://localhost:3001/product/borad/api2`)
    const data = response.data
    setAllData(data)
  }

  const display = switchBtn ? allData : yourFdData

  const howHeight = (h) => {
    const heightest = 10000
    let present = Math.floor((h / heightest) * 100)
    return (
      <div className={styled.rectangle} style={{ width: `${present}%` }}>
        <p>{h}m</p>
      </div>
    )
  }
  useEffect(() => {
    fetchAll()
    fetchYourFd()
  }, [memberData.auth])
  // useEffect(() => {
  //   getUsersBySearchWord()
  // }, [switchBtn])
  return (
    <>
      <div className={styled2.bgc}>
        <div className={`${styled2.box} ${styled2.div1}`}></div>
        <div className={`${styled2.box} ${styled2.div2}`}></div>
        <div className={`${styled2.box} ${styled2.div3}`}></div>
      </div>

      <div className={styled.LeaderboardWrap}>
        <div className={styled.Leaderboard}>
          <div className={styled.topWrap}>
            <h2>登山英雄排行榜</h2>
            <form action="">
              <i className="fa-solid fa-magnifying-glass"></i>
              <InputIME
                value={searchKeyword}
                onChange={handleChange}
                placeholder="搜尋山友"
              />
              {/* <input
              type="text"
              placeholder="搜尋山友"
              value={inputKeyword}
              onChange={(e) => {
                setInputKeyword(e.target.value)
              }}
            /> */}
            </form>
          </div>
          <div className={styled.board}>
            <div className={styled.head}>
              <div className={styled.ranking}>名次</div>
              <div className={styled.name}>名稱</div>
              <div className={styled.height}>累積高度</div>
            </div>
            <ul
              className={display.length > 4 ? `${styled.flexUl}` : ''}
              // style={
              //   display.length > 5 ? { overflowY: 'scroll'} : ''
              // }
            >
              {display.map((v, i) => {
                const rank = i + 1
                return (
                  <li key={v.member_sid}>
                    <div className={styled.ranking}>
                      {rank === 1 || 2 || 3 ? (
                        <img
                          src={`http://localhost:3001/imgs/zx/borad_${rank}.png`}
                          alt=""
                        />
                      ) : (
                        rank
                      )}
                      {rank !== 1 && rank !== 2 && rank !== 3 ? rank : ''}
                    </div>
                    <div className={styled.nameWrap}>
                      <div className={styled.empty}>
                        <div className={styled.imgBorder}>
                          <div className={styled.imgWrap}>
                            <img src={v.avatar} alt="" />
                          </div>
                        </div>
                        <p>{v.name}</p>
                      </div>
                    </div>
                    <div className={styled.height}>
                      {!memberData.auth && !switchBtn
                        ? '你尚未登入'
                        : howHeight(v.total_height)}
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className={styled.switchBtn}>
              <div
                className={styled.btnLeft}
                onClick={() => {
                  setSwitchBtn(true)
                  fetchAll()
                }}
                style={
                  switchBtn
                    ? {
                        backgroundColor: 'rgba(230, 189, 67, 0.701)',
                        color: '#000',
                      }
                    : {}
                }
              >
                全部排名
              </div>
              <div
                className={styled.btnRight}
                onClick={() => {
                  setSwitchBtn(false)
                  fetchYourFd()
                }}
                style={
                  switchBtn
                    ? {}
                    : {
                        backgroundColor: 'rgba(230, 189, 67, 0.701)',
                        color: '#000',
                      }
                }
              >
                好友排名
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
