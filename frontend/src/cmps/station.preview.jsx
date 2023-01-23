// 

export function StationPreview({song}) {
     
    return (
        <article>
            <img src={song.imgUrl} alt="play list img"/>
            <div className="song-title">{song.title}</div>
            <div className="song-creator">{song.createdBy}</div>
        </article>
    )
}