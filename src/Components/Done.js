import React from 'react';
import back from '../img/left-arrow.png';
import close from '../img/close.png';

const Done = (props) => {
    return (
        <div className="item">
            <p>{props.listItem}</p>
            <div className='icons-container'>
                <img alt="back" src={back} onClick={props.back} />
                <img alt="close" src={close} onClick={props.close} />
            </div>
        </div>
    )

}
export default Done; 