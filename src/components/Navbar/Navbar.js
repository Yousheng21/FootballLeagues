import React, {useEffect, useState} from 'react';
import DatePick from "../../utils/Date/DatePick";
import {get} from "../../actions/app";
import "./navbar.css";

export const defaultSeasons = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]

const Navbar = () => {
    let year = get('season');

    let [search, setSearch] = useState(get('search'));

    let page = window.location.pathname.split('/')[1];

    useEffect(() => {
        const select = document.getElementById('select').getElementsByTagName('option');
        for (let i = 0; i < select.length; i++) {
            if (select[i].value === year) select[i].selected = true;
        }
    }, [year])


    return (
        <div>
            <form action="" className={'d-flex justify-content-between'} id={'form'} name={'form'} method={"get"}>
                <div className="form-group">
                    <label>Текущий сезон</label>
                    <select name={'season'} id={'select'}
                            onChange={(e) => {
                                let change = document.getElementById('change');
                                if (change) document.getElementById('change').value = 'true';
                                document.getElementById("form").submit();
                                if (change) document.getElementById('change').value = 'false';
                            }}
                            className="form-control">
                        {
                            defaultSeasons.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })
                        }
                    </select>
                </div>
                {
                    page === 'calendar' ?
                        <div className={'d-flex flex-column justify-content-center'}>
                            <DatePick/>
                            <input name={'change'} id={'change'} className={'d-none'} value={'false'} type="text"/>
                            <input autoFocus={true} type="submit" className={'send'} value="Применить"/>
                            <button className={'allMatches'} autoFocus={false} onClick={() => {
                                let change = document.getElementById('change');
                                if (change) document.getElementById('change').value = 'true';
                            }}>Показать все матчи
                            </button>

                        </div>
                        :
                        page === 'league' ? '' :
                            <div className={'d-flex search'}>
                                <input id={'search'} className={'align-self-center m-1 p-1'}
                                       placeholder={'Поисковой запрос...'}
                                       onChange={(e) => setSearch(e.target.value)}
                                       name={'search'} value={search} type="text"/>
                                <input className={'btn btn-outline-secondary align-self-center'} type="submit"
                                       value="Найти"/>
                            </div>

                }

            </form>
        </div>
    );
};

export default Navbar;