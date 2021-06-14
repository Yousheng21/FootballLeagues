import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {showCalendar} from "../../actions/app";
import Breadcrumbs from "../../utils/Breadcrumbs/Breadcrumbs";
import {loadFromLocalStorage} from "../../reducers";
import Preloader from "../../utils/Preloader/Preloader";
import './style.css';

const status = {
    'Match Finished':'Матч Завершен',
    'No Started':"Не начался"
}

const Calendar = (props) => {

    const dispatch = useDispatch();
    let listMatches = useSelector(state=>state.app.matches)
    let league = loadFromLocalStorage('league');
    let team = loadFromLocalStorage('team');

    let id = props.match.params.id;
    let type = props.match.params.type;

    useEffect(()=>{
            dispatch(()=>showCalendar(type,id));
    },[dispatch, id, type])

    let breadCrumbs = [];

    if (type==='league'){
        breadCrumbs = [
            {
                title:'Список Лиг',
                path:'/',
                className:''
            },
            {
                title:league.name,
                path:``,
                className:'active'
            },
        ];
    }
    else if (type==='team') {
        breadCrumbs = [
            {
                title:'Список Лиг',
                path:'/',
                className:''
            },
            {
                title:league.name,
                path:`/league/${league.id}`,
                className:''
            },
            {
                title:team.name,
                path:``,
                className:'active'
            }
        ];
    }


    return (
        <div>
            {
                listMatches.length === 0? <Preloader/>
                    :
                    <div>
                        <Breadcrumbs items={breadCrumbs} />
                        {
                            type==='league'?
                                <div className={'d-flex justify-content-center mb-5'}>
                                    <img className={'logoTeam'} src={league.logo} alt=""/>
                                    <h1 className={'titleTeam align-self-center'}>{league.name}</h1>
                                </div>
                                :
                                <div className={'d-flex justify-content-center mb-5'}>
                                    <img className={'logoCalendar align-self-center'} src={team.logo} alt=""/>
                                    <h1 className={'titleTeam align-self-center'}>{team.name}</h1>
                                </div>
                        }

                        <div className={"CalendarMatches"}>

                            {
                                listMatches.map((item,index)=>(
                                    <div
                                        key={item.fixture.id}
                                        className={"container match"}
                                    >
                                        <div className={"row_calendar"}>
                                            <div className={"text-center"}>
                                                {item.teams.home.name}
                                            </div>
                                            <div  style={{textAlign:"center"}}>
                                                {item.league.name} - {item.league.season}
                                            </div>
                                            <div className={"text-center"}>
                                                {item.teams.away.name}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <img className={'emblem mr-1'} src={item.teams.home.logo} alt=""/>
                                            </div>
                                            <div className={"score"}>
                                                <div>
                                                    <div className={'text-center'}>Основное время:</div>
                                                    <div className={'score_main'}>
                                                        {item.goals.home} &#8212; {item.goals.away}
                                                    </div>
                                                </div>
                                                {item.score.extratime.home!==null ?
                                                    <div>
                                                        <span>Дополнительные время:</span>
                                                        <div className={'score_main'}>
                                                            {item.score.extratime.home} &#8212; {item.score.extratime.away}
                                                        </div>
                                                    </div> :''

                                                }

                                                {item.score.penalty.home!==null ?
                                                    <div>
                                                        <span className={'col sm-1'}>Пенальти:</span>
                                                        <div className={'score_main'}>
                                                            {item.score.penalty.home} &#8212; {item.score.penalty.away}
                                                        </div>
                                                    </div> :''

                                                }
                                            </div>
                                            <div>
                                                <img className={'emblem mr-1'} src={item.teams.away.logo} alt=""/>
                                            </div>
                                        </div>

                                        <div className={'info'}>
                                            <div className={'col sm-6'} >{
                                                new Date(item.fixture.date).toLocaleDateString().replace(/\//g,'-')+' '+
                                                new Date(item.fixture.date).toLocaleTimeString()
                                            }</div>
                                            <div className={'col sm-6'}>{status[item.fixture.status.long]}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }

        </div>
    );
};

export default Calendar;