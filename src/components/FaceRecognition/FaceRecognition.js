import React from 'react'
import './FaceRecognition.css';


const FaceRecognition = ({ imageUrl, box }) => {
    return(
        <div className='center ma4'>
            <div className='relative mt2'>
                <img alt='' id='inputimage' src={imageUrl} width='500px' height='auto'/>
                {
                    box.map((box, i) => {
                        return(
                            <div className='bounding-box' key={i} style={{top: box.toprow, right: box.rightcol, left: box.leftcol, bottom: box.bottomrow }}></div>  
                        );
                    })
                }
                
            </div>
        </div>
    );
}


export default FaceRecognition;