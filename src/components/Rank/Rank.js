import React from 'react';


const Rank = ({ user, index }) => {

    return(
        <div key={index}>
            <div className='white f4'>
                {`${user.name}, your current rank is...`}
            </div>
            <div className='white f3'>
                {user.entries}
            </div>
        </div>
    );
}

export default Rank;