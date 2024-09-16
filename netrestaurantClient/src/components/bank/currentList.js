import React from 'react';

const currentList = () => {
    return (
        <>
        <h3> 현재 조회한 목록</h3>
        <hr style={{ border: "2px solid #808080", width: '100%' }} />
        <div
            id='detail'
            style={{
                width: '100px',
                height: '80px',
                position: 'static',
            }}
        ></div>
        </>
    );
};

export default currentList;