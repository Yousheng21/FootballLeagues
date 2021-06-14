import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {get, saveLocal, startApp} from "../../actions/app";
import Preloader from "../../utils/Preloader/Preloader";
import './listLeague.css';


const ListLeagues = () => {

    const dispatch = useDispatch();
    let year = get('season');

    let leagues = useSelector(state => state.app.leagues);

    useEffect(() => {
        if (leagues.length === 0)
            dispatch(() => startApp());
    }, [dispatch, leagues.length])

    let searchIsEmpty = useSelector(state => state.app.searchIsEmpty);

    return (
        <div className={'list'}>
            {
                searchIsEmpty ? <p className={'mx-auto'}>По вашему запросу ничего не найдено.</p> :
                    leagues.length !== 0 ?
                        leagues.map((item, index) => {
                            return <div key={index}>
                                <div className={'listLeagues'} key={item.league.id}>
                                    <div>
                                        <img className={'img'} src={item.league.logo} alt=""/>
                                    </div>
                                    <div>
                                        {item.country.name}
                                    </div>
                                    <div>
                                        <a href={`/teams/${item.league.id}?season=${year}`}>{item.league.name}</a>
                                    </div>
                                    <div className={'d-flex'}>
                                        <a href={`/league/${item.league.id}?season=${year}`}
                                           className={'btn btn-outline-primary'}>таблица</a>
                                    </div>
                                    <div className={'calendar'}>
                                        <a onClick={() => {
                                            saveLocal('league', item.league)
                                        }} href={`/calendar/league/${item.league.id}?season=${year}`}
                                           className={'btn btn-outline-primary'}>календарь</a>
                                    </div>
                                </div>
                                <hr className={'hr'}/>
                            </div>

                        }) : <Preloader/>
            }
        </div>
    );
}

export default ListLeagues;