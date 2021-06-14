const SET_LEAGUES="SET_LEAGUES";
const SET_LEAGUE="SET_LEAGUE";
const SET_LEAGUE_BY_TEAM="SET_LEAGUE_BY_TEAM";
const SET_TEAM="SET_TEAM";
const SET_TEAMS="SET_TEAMS";
const SET_MATCHES="SET_MATCHES";
const SET_LEAGUE_SEASONS = "SET_LEAGUE_SEASONS";
const SET_SEARCH_IS_EMPTY = "SET_SEARCH_IS_EMPTY";


const defaultState = {
    leagues: [],
    league: {
        name:'',
        logo:'',
        season:0,
        id:0,
        table:[]
    },
    seasons:[],
    teams:[],
    team:{},
    matches: [],
    dateMatch:[],
    searchIsEmpty:false

}

export default function appReducer(state=defaultState,action) {
    switch (action.type) {
        case SET_LEAGUES:
            return {
                ...state,
                leagues: action.payload
            }
        case SET_LEAGUE:
            return {
                ...state,
                league : {
                    name: action.payload.name,
                    season: action.payload.season,
                    logo: action.payload.logo,
                    id:action.payload.id,
                    table: action.payload.standings[0]
                },
            }
        case SET_LEAGUE_BY_TEAM:
            return {
                ...state,
                league : {
                    name: action.payload.name,
                    logo: action.payload.logo,
                    id:action.payload.id,
                },
            }
        case SET_LEAGUE_SEASONS:

            return {
                ...state,
                seasons: action.payload

            }
        case SET_MATCHES:
            return {
                ...state,
                dateMatch: [
                    action.dates[0],action.dates[1]
                ],
                matches: action.payload
            }
        case SET_TEAM:
            return {
                ...state,
                team: action.payload
            }
        case SET_TEAMS:
            return {
                ...state,
                teams: action.payload
            }
        case SET_SEARCH_IS_EMPTY:
            return {
                ...state,
                searchIsEmpty: action.payload
            }

        default:
            return state;
    }
}

export const setLeagues = (leagues) => ({type:SET_LEAGUES,payload:leagues})
export const setLeague = (league) => ({type:SET_LEAGUE,payload:league})
export const setMatches = (matches,dateRange) => ({type:SET_MATCHES,payload:matches,dates:dateRange})
export const setTeam = (team) => ({type:SET_TEAM,payload:team})
export const setTeams = (teams) => ({type:SET_TEAMS,payload:teams})
export const setSearchIsEmpty = (flag) => ({type:SET_SEARCH_IS_EMPTY,payload:flag})


