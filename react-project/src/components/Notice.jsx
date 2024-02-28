import React,{useContext, useState} from 'react'
// import { Notice1Context } from '../context/Notice1Context'

const Notice = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  // const {notice1,setNotice1} = useContext(Notice1Context);
  const [selectedOption, setSelectedOption] = useState('');
  // const [noticeMessage, setNoticeMessage] = useState('');

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('handleform 실행')
  //   console.log(selectedOption);
  //   switch (selectedOption) {
  //     case '1':
  //       console.log('selectoption 성공')
  //       return setNotice1([...notice1,noticeMessage]);
  //   //   case '2':
  //   //     return setNotice2(notice2 +`<p>${`<p>${noticeMessage}</p>`}</p>`);
  //   //   case '3':
  //   //     return setNotice3(notice3 + `<p>${`<p>${noticeMessage}</p>`}</p>`);
  //   //   case '4':
  //   //     return setNotice4(notice4 +`<p>${noticeMessage}</p>`);
  //   //   case '5':
  //   //     return setNotice5(notice5 +`<p>${noticeMessage}</p>`);
  //   //   case '6':
  //   //     return setNotice6(notice6 +`<p>${noticeMessage}</p>`);  
  //   //   case 'All':
  //   //     setNotice1(notice1 +`<p>${noticeMessage}</p>`);
  //   //     setNotice2(notice2 +`<p>${noticeMessage}</p>`);
  //   //     setNotice3(notice3 +`<p>${noticeMessage}</p>`);
  //   //     setNotice4(notice4 +`<p>${noticeMessage}</p>`);
  //   //     setNotice5(notice5 +`<p>${noticeMessage}</p>`);
  //   //     setNotice6(notice6 +`<p>${noticeMessage}</p>`);
  //   //     return
  //   // }
  //   console.log(notice1);
  //   console.log(selectedOption);
  //   console.log(noticeMessage);
  // };

  // };

  return (
    <div>
      <form >
        <input type="text" placeholder='알림 메세지를 적어주세요.' 
        // onChange={(e) => setNoticeMessage(e.target.value)} 
        style={{marginRight:'10px', width:'350px'}} name='notice'/>
        <select onChange={(e) => setSelectedOption(e.target.value)} name="" id="" style={{marginRight:'10px'}}>
          <option value= "1" name="deck1">1번 데크</option>
          <option value="2" name="deck2">2번 데크</option>
          <option value="3" name="deck3">3번 데크</option>
          <option value="4" name="deck4">4번 데크</option>
          <option value="5" name="deck5">5번 데크</option>
          <option value="6" name="deck6">6번 데크</option>
          <option value="All" name="deckAll">전체 데크</option>
        </select>
        <input type="submit" value="보내기"/>  
      </form>
    </div>
  )
}

export default Notice