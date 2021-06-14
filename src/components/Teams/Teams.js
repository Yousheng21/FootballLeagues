import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {get, saveLocal, showLeague} from "../../actions/app";
import Breadcrumbs from "../../utils/Breadcrumbs/Breadcrumbs";
import Preloader from "../../utils/Preloader/Preloader";
import './teams.css';


const Teams = (props) => {

    const dispatch = useDispatch();
    let id = props.match.params.id;
    let year = get('season');

    useEffect(() => {
        dispatch(() => showLeague(id));
    }, [dispatch, id])

    let teams = useSelector(state => state.app.teams);
    let league = useSelector(state => state.app.league);
    let searchIsEmpty = useSelector(state => state.app.searchIsEmpty);
    teams = teams.length !== 0 ? teams : league.table;

    const breadCrumbs = [
        {
            title: 'Список Лиг',
            path: '/',
            className: ''
        },
        {
            title: league.name,
            path: `/league/${league.id}`,
            className: 'active'
        }
    ];

    return (
        <div className={'bodyTeam'}>
            {
                searchIsEmpty ? <p className={'mx-auto'}>По вашему запросу ничего не найдено.</p> :
                    teams.length !== 0 ?
                        <div>
                            <Breadcrumbs items={breadCrumbs}/>
                            <div className={'d-flex justify-content-center mb-5'}>
                                <img className={'logoTeam'} src={league.logo} alt=""/>
                                <h1 className={'titleTeam align-self-center'}>{league.name} - {league.season}</h1>
                            </div>
                            <div className={'wrap'}>
                                {
                                    teams.map((item, index) => {
                                        return <div className={'listTeams'} key={item.team.id}>
                                            <div>
                                                <img className={'imgTeam'} src={item.team.logo} alt=""/>
                                            </div>
                                            <div>
                                                {item.team.name}
                                            </div>
                                            <div>
                                                <a onClick={() => {
                                                    saveLocal('team', item.team)
                                                }} href={`/calendar/team/${item.team.id}?season=${year}`}
                                                   className={'btn btn-outline-primary'}>календарь</a>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        : <Preloader/>
            }

        </div>
    );
};

export default Teams;