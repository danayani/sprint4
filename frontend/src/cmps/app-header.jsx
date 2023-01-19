// navigate arrows + user options
//TODO : add link to about page
//acording to the url (page) the headder change
import left from '../assets/icons/left.png';
import right from '../assets/icons/right.png';
import {useNavigate} from "react-router-dom";
export function AppHeader() {
    const navigate = useNavigate()

    function onGo(diff) {
        navigate(diff)
    }
    return (
        <div className="top-bar-container">
            <header className="app-header">
                <button className="go-btn" onClick={()=>onGo(-1)}>
                    <img className='btn-icon' src={left} />
                </button>
                <button className="go-btn" onClick={()=>onGo(1)}>
                    <img className='btn-icon' src={right} />
                </button>
            </header>

        </div>
    )
}