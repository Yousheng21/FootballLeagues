import React, { useState} from 'react';
import {formattedDate, get} from "../../actions/app";
import {useSelector} from "react-redux";
import './datePick.css'
const DatePick = () => {
    let from = get('from');
    let to = get('to');

    let fromState = useSelector(state => state.app.dateMatch[0])
    let toState = useSelector(state => state.app.dateMatch[1])

    if (!from) {
        from = formattedDate(fromState);
    }
    if (!to) {
        to = formattedDate(toState);
    }

    const [inputFrom,setInputFrom] = useState(from)
    const [inputTo,setInputTo] = useState(to)


    return (
        <div className={'datePick'}>
            <div>
                <label htmlFor='from'>С:</label>
                <input type="date"
                       id='from'
                       min={from}
                       value={inputFrom??from}
                       name={'from'}
                       onChange={(event => {
                           setInputFrom(event.target.value)
                       })}
                       onMouseDown={event => event.preventDefault()}

                />
            </div>
            <div>
                <label htmlFor='to'>По:</label>
                <input type="date"
                       id='to'
                       max={to}
                       name={'to'}
                       value={inputTo??to}
                       onChange={(event => {
                           setInputTo(event.target.value)
                       })}
                       onMouseDown={event => event.preventDefault()}
                />
            </div>
            {/*<input type="text" value={inputFrom??from} onClick={datepick('from')} id="from" name="from" readOnly={true} />*/}
            {/*<input type="text" value={inputTo??to} onClick={datepick('to')} id="to" name="to" readOnly={true} />*/}

        </div>
    );
};

export default DatePick;