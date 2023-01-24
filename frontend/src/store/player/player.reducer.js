

export const SET_PLAYER = 'SET_PLAYER'
export const SET_SONG_ID = 'SET_SONG_ID'

const initialState = { //אם אני רוצה שכמה קומפוננטות ישתמשו במידע
    player: {},
    songId: null

    // const [state, setState] = useState({
    //     url: ['https://www.youtube.com/watch?v=QtXby3twMmI', 'https://www.youtube.com/watch?v=oUFJJNQGwhk'],
    //     pip: false,
    //     playing: true,
    //     controls: false,
    //     light: false,
    //     volume: 0.8,
    //     muted: false,
    //     duration: 0,
    //     loop: false
    // })
}

export function playerReducer(state = initialState, action){
    switch (action.type) {
        case SET_PLAYER:
            return {...state, player: action.player }
        case SET_SONG_ID:
            return {...state, songId: action.songId }
        default: 
            return { state }
    }
    default: //פעם ראשונה שיוצרים סטור ושעושים דיספרצ
        // if ()
        // return 
}