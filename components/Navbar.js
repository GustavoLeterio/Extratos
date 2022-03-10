import styles from '../styles/Navbar.module.css'
import GainButton from '../public/GainButton'
import LossButton from '../public/LossButton'
import useTransaction from '../hooks/useTransaction'
import { forceReloadUtil } from "../utils/reloader"



export default function Home({ props }) {
    // async function apiConnection(e) {
    //     // e.preventDefault()
    //     const formData = {
    //         transactionType: "gain",
    //         value: 200.32,
    //         title: "teste",
    //         description: "teste",
    //         dateAndHour: "2022-02-20T20:16:00.000Z"
    //     };

    //     // const ala = {}
    //     // Array.from(e.currentTarget.elements).forEach(field => {
    //     //     if (!field.name) return;
    //     //     ala[field.name] = field.value;
    //     // });

    //     fetch('/api/extratos', {
    //         method: 'POST',
    //         body: JSON.stringify(formData)
    //     });

    //     // forceReloadUtil;

    // }

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li><button className={styles.button} onClick={apiConnection} alt="Create Gain" tabIndex={-1}>Create Gain<GainButton /></button></li>
                <li><button className={styles.button} alt="Create Loss" tabIndex={-1}>Create Loss<LossButton /></button></li>
            </ul>
        </nav>
    )
}
