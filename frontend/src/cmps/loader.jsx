import loader from '../assets/icons/loader.svg'

export function Loader() {
    return <section className="loader-container">
        <img className="loader" src={loader} />
    </section>
}