import { Block } from '@mui/icons-material'
import ReactSwipe from 'react-swipe'
import '../../styles/home-scss/carouselBird.scss'

const CarouselHome = ({ setDisply }) => {
  let reactSwipeEl

  const imageStyles = {
    margin: '25px auto',
    width: '100%',
    // height: '100%',
  }
  const imageStyle = {
    display: 'block',
    margin: '10px 120px',
    width: '70%',
    // height: '100%',
  }
  return (
    <>
      <div className="CarouselGroup">
        <div className="TipXmark">
          <i
            className="fa-solid fa-xmark"
            onClick={() => {
              setDisply(false)
            }}
          ></i>
        </div>
        <div className="groupbutton" onClick={() => reactSwipeEl.prev()}>
          <i className="fa-solid fa-angle-left"></i>
        </div>
        <ReactSwipe
          className="carousel"
          swipeOptions={{ continuous: false }}
          ref={(el) => (reactSwipeEl = el)}
        >
          <div className="item">
            <img style={imageStyles} alt="" src={`/img/tips/tip1.JPG`} />
          </div>
          <div className="item">
            <img style={imageStyle} alt="" src={`/img/tips/tip2.JPG`} />
          </div>
          <div className="item">
            <img style={imageStyle} alt="" src={`/img/tips/tip3.JPG`} />
          </div>

          <div className="item">
            <img style={imageStyle} alt="" src={`/img/tips/tip4.JPG`} />
          </div>
        </ReactSwipe>
        <div className="groupbutton" onClick={() => reactSwipeEl.next()}>
          <i className="fa-solid fa-angle-right"></i>
        </div>
      </div>
    </>
  )
}

export default CarouselHome