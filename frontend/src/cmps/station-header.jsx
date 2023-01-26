import { useState } from "react"
// import { uploadService } from "../services/upload.service.js"
// import { utilService } from "../services/util.service.js" 

export function StationHeader({ station, playStation, handleChange, deleteStation, updateStation, saveChanges }) {

    // const [stationName, setStationName] = useState(null)
    // const [stationDescription, setStationDescription] = useState(null)
    // const [imgUrl, setImgUrl] = useState(null)
    // const [isEdit, setIsEdit] = useState(false)
    const [colorByImg, setImgAvgColor] = useState(null)


    function onPlay(ev) {
        ev.stopPropagation()
        playStation()
    }

    // function onChangeDescription({ target }) {
    //     const { value, name: field } = target
    //     setStationDescription(value)
    //     handleChange(field, value)
    // }

    // function onChangeName({ target }) {
    //     const { value, name: field } = target
    //     setStationName(value)
    //     handleChange(field, value)
    // }

    // function onOpenEditor(ev) {
    //     ev.stopPropagation()
    //     setIsEdit(true)
    // }

    // function onCloseEditor(ev) {
    //     ev.stopPropagation()
    //     setIsEdit(false)
    //     saveChanges()
    // }

    async function toggleLike() {
        console.log('toggled the like button')
        // Update user liked stations
    }

    // async function onUploadImg(ev) {
    //     const imgUrl = await onSelectImg(ev)
    //     handleChange(imgUrl)
    //     // handleChange("imgUrl", imgUrl)
    //     setImgUrl(imgUrl)
    // }

    // async function onSelectImg(ev) {
    //     try {
    //         const imgUrl = await uploadService.uploadImg(ev)
    //         station.imgUrl = imgUrl
    //         const color = await utilService.getAvgImgColor(imgUrl)
    //         setImgAvgColor(color)
    //         console.log('cloooooorrrrrr', color)
    //         return imgUrl
    //     } catch (err) {
    //         console.log('Cant set image', err)
    //     }
    // }

    function onDeleteStation(ev) {
        ev.stopPropagation()
        // setIsMenuOpen(false)
        // TODO: user needs to confirm delete
        deleteStation(station._id)
    }

    return (
        <section className="station-header">
            <div className="top-container">
                {station.songs.length > 0 || station.imgUrl ?
                    // <div className="img-container" onClick={onOpenEditor}>
                    //     <img src={station.imgUrl} alt="station image" />
                    // </div> 
                    <div className="img-container">
                        <img src={station.imgUrl} alt="station image" />
                    </div> 
                    :
                    <div className="img-container" >
                        <img src="../assets/img/add-station.jpg" alt="station image" />
                    </div>
                    // <div onClick={onOpenEditor} className="img-container">
                    //     <img src="../assets/img/add-station.jpg" alt="station image" />
                    //     <span>Upload Image</span>
                    // </div>
                }
                <div className="info-container">
                    <h2 className="title">PLAYLIST</h2>
                    <h1>{station.name}</h1>
                    <p className="station-description">
                        <span>{station.createdBy.fullname} ◽ </span>
                        {station.songs.length}
                        <span> 24 min 25 sec </span>
                    </p>
                </div>
            </div>
            <div className="details-controls">
                <button className="btn-play" onClick={(ev) => onPlay(ev)}>
                    <svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 uPxdw"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                        <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
                </button>
                <button className="btn-like" onClick={toggleLike}>
                    <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 uPxdw"><path d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"></path>
                        <path d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"></path></svg>
                </button>
                <button className="btn-options">
                    <svg role="img" height="32" width="32" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" className="Svg-sc-ytk21e-0 uPxdw"><path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                        <path d="M4.5 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm15 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
                </button>
                <button className="btn-delete-station" onClick={onDeleteStation}>X</button>
            </div>
            {/* {isEdit && <div className="station-editor-modal">
                <h2>Edit details</h2>
                <div className="station-edit-container">
                    <div className="input-img-container">
                        <img src="" alt="" />
                        <span>Upload Image</span>
                        <input type="file" onChange={onUploadImg} />
                    </div>
                    <div className="title-description">
                        <input
                            type="text"
                            name="name"
                            className="input-title"
                            placeholder="Playlist name"
                            value={station.name ? station.name : stationName}
                            onChange={onChangeName}
                        />
                        <textarea
                            name="description"
                            className="input-description"
                            placeholder="Add an optinal description"
                            value={station.description ? station.description : stationDescription}
                            onChange={onChangeDescription}
                        />
                        <button className="station-edit-modal-done-btn" onClick={onCloseEditor}>Done</button>
                    </div>
                </div>
            </div>
            } */}
        </section>
    )
}