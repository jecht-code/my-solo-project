import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function WidgetItem ({ tranx }) {
    const dispatch = useDispatch();

    return (
        <div>
            <p key={tranx.id}>
                {tranx.category_spend}
            </p>
        </div>
    )
}

export default WidgetItem;