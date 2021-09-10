import React from 'react';

const colorInfo = [
    {
        colorClass: 'ok',
        label: 'Размер подходит',
    },
    {
        colorClass: 'warning',
        label: 'Размер велик',
    },
    {
        colorClass: 'bad',
        label: 'Размер мал',
    },
]

const DogModelLabel = () => {

    return (
        <div className="px-4 position-absolute bottom-0 my-2" style={{fontSize: '90%',}}>
            {colorInfo.map((item) =>
                <div className="row row-cols-2 align-items-center my-1">
                    <div className='col col-1'>
                        <div className={`marker-circle marker-color-${item.colorClass} `} />
                    </div>
                    <div className='col col-10'>{item.label}</div>
                </div>
            )}
        </div>
    )
}

export default DogModelLabel;

