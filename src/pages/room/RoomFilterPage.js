import style from '../../styles/room-scss/roomFilterPage.module.scss'
import RoomFilterResult from './components/RoomFilterResult'

function RoomFilterPage() {
  return (
    <>
      <div className={style.warp}>
        <div className={style.filter}>
          <div className={style.location}>
            <select>
              <option>苗栗縣</option>
            </select>
          </div>
          <div className={style.mountain}>
            <select>
              <option>加里山</option>
            </select>
          </div>
          <button>查詢</button>
          <span>查詢結果：'{'NUM'}' 間</span>
        </div>

        <div className={style.roomCardGroup}>
          <RoomFilterResult />
          <RoomFilterResult />
          <RoomFilterResult />
          <RoomFilterResult />
        </div>
      </div>
    </>
  )
}

export default RoomFilterPage
