import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {get, saveLocal, showLeague} from "../../actions/app";
import Breadcrumbs from "../../utils/Breadcrumbs/Breadcrumbs";
import Preloader from "../../utils/Preloader/Preloader";
import './league.css';

const tableHead = {
    '№':'',
    '':'',
    "Команда":'',
    "Матчи":'',
    "И":"Игры",
    "В":"Выигрыши",
    "Н":"Ничьи",
    "П":"Поражения",
    "Г":"Голы",
    "О":"Очки"
}


const League = (props) => {

    const dispatch = useDispatch();
    let id = props.match.params.id;

    useEffect(()=>{
        dispatch(()=>showLeague(id));
    },[dispatch,id])

    let year = get('season');

    let league = useSelector(state=>state.app.league);

    const breadCrumbs = [
        {
            title:'Список Лиг',
            path:'/',
            className:''
        },
        {
            title:league.name,
            path:`/league/${league.id}`,
            className:'active'
        }
    ];

    return (
        <div>
            <Breadcrumbs items={breadCrumbs} />
            {
               league.name ?
                    <div>
                        <div className={'d-flex justify-content-center mb-5'}>
                            <img className={'logoLeague'} src={league.logo} alt=""/>
                            <h1 className={'titleLeague align-self-center'}>{league.name}  - {league.season}</h1>
                        </div>
                        <table className={'standings'}>
                            <tbody className={'standings_body'}>
                            <tr>
                                {Object.keys(tableHead).map((item,index)=>{
                                    return <td key={index} title={tableHead[item]}>{item}</td>
                                }) }
                            </tr>
                            {league.table.map((item)=>{
                                return <tr key={item.team.id}>
                                    <td>{item.rank}</td>
                                    <td>
                                        <img className={'img_league'} src={item.team.logo} alt=""/>
                                    </td>
                                     <td>
                                         <a onClick={()=>{
                                             saveLocal('team',item.team)
                                         }} href={`/calendar/team/${item.team.id}?season=${year}`}>{item.team.name}</a>
                                     </td>
                                    <td>{item.form}</td>
                                    <td>{item.all.played}</td>
                                    <td>{item.all.win}</td>
                                    <td>{item.all.draw}</td>
                                    <td>{item.all.lose}</td>
                                    <td>{item.all.goals.for}-{item.all.goals.against}</td>
                                    <td>{item.points}</td>

                                </tr>
                            })}
                            </tbody>

                        </table>
                    </div>
                    :
                <Preloader/>
            }

        </div>
    );
};

export default League;