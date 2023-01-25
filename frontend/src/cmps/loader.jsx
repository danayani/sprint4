import loader from '../assets/icons/loader.svg'

export function Loader() {
    return <section class="loader-container">
        <img class="loader" src={loader} />
    </section>
}