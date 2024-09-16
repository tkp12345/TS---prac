import React from 'react';

const lastList = () => {
    return (
        <>
        <h3> 이전에 조회한 목록</h3>
        <hr style={{ border: "2px solid #808080", width: '100%' }} />
        <div
            id='lastdetail'
            style={{
                width: '100px',
                height: '80px',
                position: 'static',
            }}
        ></div>
        </>
    );
};

export default lastList;