import React ,{useState} from 'react';

const rankingList = (placeList) => {
// eslint-disable-next-line react-hooks/rules-of-hooks
const [List] = useState([placeList]);
  
return (
        <>
        <div
            id='lastdetail'
            style={{
               // width: '80x',
                height: '380px',
                position: 'static',
                fontSize:'30px', 
                fontcolor : 'black',
                padding: '180px',
                background: 'white'
            }}
            
        >
        {'👑조회 수 랭킹 목록 👑'}
        <hr style={{ border: "2px solid #808080", width: '100%' }} />
        <ul> 
        { List.map((place) => (
            <li key= 'lanking'> {place.place_name} <a href={place.palce_url}>더보기</a></li>
        ))} 
        </ul>
        </div>
        </>
    );
};

export default rankingList;