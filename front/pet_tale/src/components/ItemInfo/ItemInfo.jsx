import React from 'react';

const ItemInfoItem = ({title, value}) => {
    return (
        <tr className="d-flex my-1">
            <td className="col-3" style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>
                <span>{title}</span> <span>.......................................................</span>
            </td>
            <td className="col-sm-9">{value}</td>
        </tr>
    )
}

const ItemInfo = ({itemInfo}) => {
    return (
        <table className="table table-borderless table-sm col-12 my-3">
            <tbody>
            { itemInfo.map((item) =>
                <ItemInfoItem title={item[0]} value={item[1]}/>
            )}
            </tbody>
        </table>

    )
}

export default ItemInfo;

