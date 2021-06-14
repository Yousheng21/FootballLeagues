import React from 'react';
import {get} from "../../actions/app";
import './breadcrumbs.css';

const Breadcrumbs = (props) => {
    let year = get('season');
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {
                        props.items.map((item, index) => {
                            return <li key={index} className={`breadcrumb-item ${item.className}`}>
                                {item.className === 'active' ?
                                    item.title :
                                    <a href={`${item.path}?season=${year}`}>{item.title}</a>
                                }
                            </li>
                        })
                    }
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;