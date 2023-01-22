import { useNavigate } from "react-router-dom";

import { saveStation } from '../store/station/station.actions'
import { Station } from "./station";

export function CreateStation() {
    const navigate = useNavigate()

    async function onSaveStation(station) {
        try {
            if(!station.name) station.name = 'My Playlist'
            await saveStation(station)
            navigate('/')
        } catch (err) {
            console.log('cannot save station', err)
            throw err
        }
    }

    return (
        <section className="create-station">
            <Station saveStation={onSaveStation} />
        </section>
    )
}