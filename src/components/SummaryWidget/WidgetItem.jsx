import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './center.css';

function WidgetItem ({ listofWidget }) {
    const dispatch = useDispatch();
    //title of widget
    //data
    return (
        <div key={listofWidget.title} className="centering">
            <p>{listofWidget.title}</p>
            <p>{listofWidget.data}</p>
        </div>
    )
}

export default WidgetItem;