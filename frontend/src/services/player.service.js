

export const playerService = {
    getSongs,
    getDefaultState
}

function getDefaultState(){
    return {
        pip: false,
        playing: false,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        duration: 0,
        loop: false
    }
}

function getSongs() {
    const songs = [
        {
            id: "s1001",
            title: "Cissy Strut",
            createdBy: "The Meters",
            url: "youtube/song.mp4",
            imgUrl: "data:image/jpeg;base64,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",
            addedBy: "{minimal-user}",
            addedAt: 162521765262,
            duration: ""
        },
        {
            id: "mUkfiLjooxs",
            title: "The JB's - Pass The Peas",
            createdBy: "The JB's",
            url: "youtube/song.mp4",
            imgUrl: "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
            addedBy: "{minimal-user}",
            addedAt: 162521755262,
            duration: ""
        },
        {
            id: "mUzeiLjo76s",
            title: "Crazy race",
            createdBy: "RH",
            url: "https://www.youtube.com/watch?v=v201PxvQ4qM&ab_channel=TheRHFactor-Topic",
            imgUrl: "rh.png",
            addedBy: "{minimal-user}",
            addedAt: 162521755262,
            duration: ""
        }
    ]
    return songs
}


