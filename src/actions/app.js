import axios from "axios";
import saveToLocalStorage, {store} from "../reducers";
import {setLeague, setLeagues, setMatches, setSearchIsEmpty, setTeams} from "../reducers/appReducer";
import {defaultSeasons} from "../components/Navbar/Navbar";


const seasons = defaultSeasons;

export const startApp = async () => {
    try {
        let search = get('search');
        const response = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/leagues`, {
            headers: {
                'X-RapidAPI-Key': 'eccc5e78e9msh2b281a57631d872p1469a5jsn044fd343be0f',
            }
        });

        let result = select(response.data.response);

        if (search) {
            searchLeagues(result, search);
        } else {
            store.dispatch(setLeagues(result))
        }

    } catch (e) {
        console.log(e.response);
    }


}


export const showLeague = async (id) => {
    try {
        let year = get('season');
        let search = get('search');
        const response = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/standings?season=${year}&league=${id}`, {
            headers: {
                'X-RapidAPI-Key': 'eccc5e78e9msh2b281a57631d872p1469a5jsn044fd343be0f',
            }
        });
        let result = response.data.response[0].league;
        if (search) {
            searchTeam(result.standings[0], search);
        }
        store.dispatch(setLeague(result));

    } catch (e) {
        console.log(e.response);
    }

}


export const showCalendar = async (type, id) => {
    try {
        let year = get('season');
        let date = [get('from'), get('to')];
        const response = await axios.get(`https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${year}&${type}=${id}${!date[0] || !date[1] ? '' : `&from=${date[0]}&to=${date[1]}`}`, {
            headers: {
                'X-RapidAPI-Key': 'eccc5e78e9msh2b281a57631d872p1469a5jsn044fd343be0f',
            }
        });
        let dateRange = selectDate(response.data.response)
        store.dispatch(setMatches(response.data.response, dateRange));

    } catch (e) {
        console.log(e.response);
    }

}

const selectDate = (response) => {
    let arr = [];
    response.map((item) => {
        return arr.push(new Date(item.fixture.date));
    })
    let maxDate = new Date(Math.max.apply(null, arr)).toLocaleDateString().replace(/\//g, '-');
    let minDate = new Date(Math.min.apply(null, arr)).toLocaleDateString().replace(/\//g, '-');
    return [minDate, maxDate];
}

const searchLeagues = (result, req) => {
    let leagues = result;

    let regExp = new RegExp(req.toLowerCase());

    let newLeagues = leagues.filter(checkName);

    function checkName(item) {
        return regExp.test(item.league.name.toLowerCase()) === true || regExp.test(item.country.name.toLowerCase()) === true;
    }

    if (newLeagues.length === 0) store.dispatch(setSearchIsEmpty(true));
    store.dispatch(setLeagues(newLeagues));
}

export const searchTeam = (result, req) => {
    let teams = result;
    let regExp = new RegExp(req.toLowerCase());
    let newLeagues = teams.filter(checkNameTeam);

    function checkNameTeam(item) {
        return regExp.test(item.team.name.toLowerCase()) === true;
    }

    if (newLeagues.length === 0) store.dispatch(setSearchIsEmpty(true));
    return store.dispatch(setTeams(newLeagues));
}


const select = (data) => {
    let arr = [];
    Object.keys(data).forEach((item) => {
        if (data[item].seasons.length >= 11 && data[item].seasons.every(checkAllSeasons)) arr.push(data[item]);
    })

    function checkAllSeasons(item) {
        return item.coverage.standings === true && seasons.includes(item.year) === true;
    }

    return arr;
}


export const get = (name) => {
    var params = window
        .location
        .search
        .replaceAll(/[+|?]/g, '')
        .split('&')
        .reduce(
            function (p, e) {
                var a = e.split('=');
                p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            {}
        );

    switch (name) {
        case 'season':
            if (!params[name]) params[name] = '2010';
            break;
        case 'from':
            if (!params[name] || get('change') === 'true') {
                params[name] = formattedDate(store.getState().app.dateMatch[0]);
            }
            break;
        case 'to':
            if (!params[name] || get('change') === 'true') {
                params[name] = formattedDate(store.getState().app.dateMatch[1]);
            }
            break;
        default:
            break;

    }
    return params[name];


}


export const formattedDate = (str) => {
    if (str) {
        return str.split('.').reverse().join('-');
    }
}

export const saveLocal = (name, data) => {
    saveToLocalStorage(name, data)
}
