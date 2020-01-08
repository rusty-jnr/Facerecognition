import React from 'react';
import './ImageLinkForm.css'


const ImageLinkForm = ({ handleText, onSubmitImage }) => {
    return(
        <div>
            <p className="f5">
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 shadow-5'>
                    <input type='text' className='f4 pa2 w-70 center' onChange={handleText}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmitImage}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;