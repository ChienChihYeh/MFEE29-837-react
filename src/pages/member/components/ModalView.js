import styled from '../../../styles/member-scss/MemberInfo.module.scss'
import TextareaAutosize from 'react-textarea-autosize'
import dayjs from 'dayjs'
import axios from 'axios'
import { useContext, useEffect, useState, useRef } from 'react'
import MemberContext from '../../../contexts/MemberContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'

//TODO 頭像外框變化

export default function ModalView({
  getPostList,
  setIsView,
  showData,
  setCurrentPost,
  currentPost,
  listLength,
}) {
  // console.log(showData.member_sid)
  const navgigate = useNavigate()

  const { data } = useContext(MemberContext)

  const [user, setUser] = useState({
    member_sid: 0,
    avatar: '',
    nickname: '',
    total_height: 0,
  })
  const [liked, setLiked] = useState(false)
  const [replies, setReplies] = useState([])

  const replyForm = useRef(null)

  async function getInfo() {
    const rows = await axios.get(
      `http://localhost:3001/member/modal/api?mid=${showData.member_sid}`
    )
    console.log(rows.data)
    setUser(rows.data[0])
  }

  async function getLike() {
    const mid = data.member_sid || ''

    const rows = await axios.get(
      `http://localhost:3001/member/like/api?mid=${mid}&pid=${showData.post_sid}`
    )
    console.log(rows.data[0])
    if (rows.data[0]) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }

  async function addLike() {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return alert('請先登入會員')
    }

    const result = await axios.post(
      `http://localhost:3001/member/like/api`,
      { mid: data.member_sid, pid: showData.post_sid },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    getPostList()
    setLiked(true)

    console.log(result.data)
  }

  async function removeLike() {
    const token = localStorage.getItem('token') || ''

    if (!token) {
      return alert('請先登入會員')
    }

    const result = await axios.delete(
      `http://localhost:3001/member/like/api?mid=${data.member_sid}&pid=${showData.post_sid}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    console.log(result.data)
    getPostList()
    setLiked(false)
  }

  async function addReply() {
    const token = localStorage.getItem('token') || ''

    const formData = new FormData(replyForm.current)

    if (!token) {
      return alert('請先登入會員')
    }

    const result = await axios.post(
      'http://localhost:3001/member/reply/api',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    )
    if (result.data.success) {
      alert('成功回覆')
      getReply()
      getPostList()
    }

    console.log(result.data)
  }

  async function getReply() {
    const rows = await axios.get(
      `http://localhost:3001/member/reply/api?pid=${showData.post_sid}`
    )

    setReplies(rows.data)
    console.log(rows.data)
  }

  useEffect(() => {
    getInfo()
    getLike()
    getReply()
  }, [currentPost])

  return (
    <>
      <div
        className={styled.modalBg}
        // z-index over nav bar?
        onClick={() => {
          setIsView(false)
        }}
      >
        <div
          className={styled.modal}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className={styled.editImg}>
            <img
              src={`http://localhost:3001/uploads/${showData.image_url}`}
              alt="postImg"
            ></img>
          </div>
          <div className={styled.editContent}>
            <div className={styled.contentTop}>
              <div className={styled.contentFlex}>
                <div
                  className={styled.avatar}
                  onClick={() => {
                    setIsView(false)
                    setCurrentPost(0)
                    navgigate(`/profile?id=${showData.member_sid}`)
                  }}
                >
                  <img
                    src={
                      user.avatar
                        ? `http://localhost:3001/uploads/avatar_${user.avatar}`
                        : 'https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg'
                    }
                    alt="postImg"
                  ></img>
                </div>
                <h4>{user.nickname}</h4>
                {liked ? (
                  <span
                    onClick={() => {
                      removeLike()
                    }}
                  >
                    {showData.likes} <i className="fa-solid fa-heart"></i>
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      addLike()
                    }}
                  >
                    {showData.likes} <i className="fa-regular fa-heart"></i>
                  </span>
                )}
              </div>
              <TextareaAutosize
                maxRows="3"
                className={styled.contentTxt}
                readOnly
                value={showData.context}
                style={{ overflow: 'auto' }}
              />
              <div className={styled.contentFlex}>
                <p style={{ marginLeft: '72px' }}>
                  {dayjs(showData.created_at).format('YYYY-MM-DD')}
                </p>
                <p>{showData.name}</p>
                <p>
                  {showData.mountain_name} {showData.height}m
                </p>
              </div>
              <hr />
              <div className={styled.reply}>
                {replies.map((v, i) => {
                  return (
                    <div key={i} className={styled.replyPost}>
                      <div className={`${styled.contentFlex} ${styled.left}`}>
                        <div
                          className={styled.replyAvatar}
                          onClick={() => {
                            setIsView(false)
                            setCurrentPost(0)
                            navgigate(`/profile?id=${v.member_sid}`)
                          }}
                        >
                          <img
                            src={
                              v.avatar
                                ? `http://localhost:3001/uploads/avatar_${v.avatar}`
                                : 'https://learn.100mountain.com/wp-content/uploads/2020/06/P9181685.jpg'
                            }
                            alt="postImg"
                          ></img>
                        </div>

                        <div>
                          <h4>{v.nickname}</h4>
                          <TextareaAutosize readOnly value={v.context} />
                        </div>
                        {/* <i className="fa-regular fa-heart"></i> */}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <hr />
            <div className={styled.contentFlex}>
              <form ref={replyForm}>
                <input
                  type="hidden"
                  value={data.member_sid}
                  name="member_sid"
                />
                <input
                  type="hidden"
                  value={showData.post_sid}
                  name="post_sid"
                />
                <span>
                  <TextareaAutosize
                    className={styled.replyInput}
                    maxRows="1"
                    maxLength="120"
                    placeholder="留言...(30字以內)"
                    name="context"
                  />
                </span>
                <button
                  className={styled.replySend}
                  onClick={(e) => {
                    e.preventDefault()
                    addReply()
                  }}
                >
                  送出
                </button>
              </form>
            </div>
          </div>
          <div
            className={`${styled.goTo} ${styled.prev}`}
            onClick={() => {
              if (currentPost > 0) {
                setCurrentPost(currentPost - 1)
              }
            }}
          >
            <i
              className="fa-solid fa-chevron-left"
              style={
                currentPost === 0 ? { display: 'none' } : { display: 'block' }
              }
            ></i>
          </div>
          <div
            className={`${styled.goTo} ${styled.next}`}
            onClick={() => {
              if (currentPost < listLength - 1) {
                setCurrentPost(currentPost + 1)
              }
              // if(currentPost === listLength -1) {
              //   setCurrentPost(0)
              // }
            }}
          >
            <i
              className="fa-solid fa-chevron-right"
              style={
                currentPost === listLength - 1
                  ? { display: 'none' }
                  : { display: 'block' }
              }
            ></i>
          </div>
        </div>
      </div>
    </>
  )
}
