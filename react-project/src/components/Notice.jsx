import React from 'react'

const Notice = () => {
  return (
    <div>
      <form action="/lcd" method='get'>
        <input type="text" placeholder='알림 메세지를 적어주세요.' style={{marginRight:'10px', width:'350px'}} name='notice'/>
        <select name="" id="" style={{marginRight:'10px'}}>
          <option value="" name="deck1">1번 데크</option>
          <option value="" name="deck2">2번 데크</option>
          <option value="" name="deck3">3번 데크</option>
          <option value="" name="deck4">4번 데크</option>
          <option value="" name="deck5">5번 데크</option>
          <option value="" name="deck6">6번 데크</option>
          <option value="" name="deck0">전체 데크</option>
        </select>
        <input type="submit" value="보내기" />
      </form>
    </div>
  )
}

export default Notice