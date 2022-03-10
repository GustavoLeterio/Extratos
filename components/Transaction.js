import styles from '../styles/Transaction.module.css'
import CancelButton from '../public/CancelButton'
import EditButton from '../public/EditButton'
import ConfirmButton from '../public/ConfirmButton'
import { useState } from 'react';
import { mask } from 'remask'

export default function Transaction(props) {
    const [form, setForm] = useState(false);
    const [valueBorderColor, setValueBorderColor] = useState("#FFFFFF55");
    const [centsBorderColor, setCentsBorderColor] = useState("#FFFFFF55");
    const [valueSize, setValueSize] = useState(Math.ceil(Math.log10(parseInt(props.data.value) + 1)));
    const [titleSize, setTitleSize] = useState(props.data.title.length);
    const [descriptionSize, setDescriptionSize] = useState(props.data.description != undefined ? props.data.description.length : 13);
    const [valueMask, setValueMask] = useState("");
    const [centValueMask, setCentValueMask] = useState("");

    function Connector(index, maxLength) {
        if (index >= 0 && index < --maxLength) {
            return <div className={styles.connector} style={{ backgroundColor: colorHandler() }} />
        } else {
            return false;
        }
    }

    function colorHandler() {
        if (props.data.transactionType == "gain") {
            return "var(--gain-color)";
        } else {
            return "var(--loss-color)";
        }
    }

    function getDate(unFormatedDate) {
        if (unFormatedDate != null) {
            const date = new Date(unFormatedDate);
            const formatedDate = date.toISOString().split("Z").join("");
            const localeFormatedDate = date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes();
            return { localeFormatedDate, formatedDate }
        };
        return "";
    }
    function dataExist(data, ifRetun, elseReturn) {
        if (data != null) {
            return ifRetun;
        } else {
            return elseReturn;
        }
    }

    function resetForm() {
        setForm(false);
        setValueSize(Math.ceil(Math.log10(parseInt(props.data.value) + 1)));
        setTitleSize(props.data.title.length);
        console.log(props.data.description)
        if (props.data.description != undefined) setDescriptionSize(props.data.description.length);
        setValueMask("");
        setCentValueMask("")
    }

    function onChangeValue(ev) {
        setValueMask(mask(ev.target.value, ["9", "99", "999", "9999", "99999", "999999", "9999999", "99999999", "99999999"]))
        setValueSize(ev.target.value.length);
        if (ev.target.value.length > 8) {
            setValueSize(8);
            ev.target.classList.add(styles.invalid);
            setTimeout(() => ev.target.classList.remove(styles.invalid), 2000);
        }
        if (ev.target.value < 0 || ev.target.value == "") {
            setValueSize(Math.ceil(Math.log10(parseInt(props.data.value) + 1)));
        }
        ev.target.value = parseInt(ev.target.value);
        console.log(focus)
    }

    function onChangeValueCents(ev) {
        setCentValueMask(mask(ev.target.value, ["99"]))
        if (ev.target.value.length > 2) {
            ev.target.classList.add(styles.invalid);
            setTimeout(() => ev.target.classList.remove(styles.invalid), 1000);
        }
        ev.target.value = parseInt(ev.target.value);
    }

    function onChangeTitle(ev) {
        setTitleSize(ev.target.value.length)
        if (ev.target.value.length >= 25) {
            ev.target.classList.add(styles.invalid);
            setTimeout(() => ev.target.classList.remove(styles.invalid), 1000);
        }
        if (ev.target.value.length == 0) {
            setTitleSize(ev.target.placeholder.length)
        }
        console.log(focus)
    }
    function onChangeDescription(ev) {
        setDescriptionSize(ev.target.value.length)
        if (ev.target.value.length >= 21) {
            ev.target.classList.add(styles.invalid);
            setTimeout(() => ev.target.classList.remove(styles.invalid), 1000);
        }
        if (ev.target.value.length == 0) {
            setDescriptionSize(ev.target.placeholder.length)
        }
    }
    function onClickDate(ev) {
        ev.target.type = "datetime-local"
    }
    function onBlurtDate(ev) {
        ev.target.type = "text"
    }

    if (!form) {
        return (
            <article className={styles.transactionWrapper}>
                <section className={styles.transactionBox} key={props.data._id}>
                    <div className={styles.valueLine}>
                        <button className={styles.manipulationButton} alt="Delete Transaction" onClick={() => console.log("Delete")} tabIndex={-1}>
                            Delete Button
                            <CancelButton />
                        </button>
                        <span className={styles.transactionValue} style={{ color: colorHandler() }}>
                            {props.data.transactionType != "gain" ? "-" : ""}
                            R$
                            {props.data.value.toFixed(2)}
                        </span>
                        <button className={styles.manipulationButton} alt="Edit Transaction" onClick={() => setForm(true)} tabIndex={-1}>
                            Edit Button
                            <EditButton />
                        </button>
                    </div>
                    <span className={styles.transactionTitle}>
                        {props.data.title}
                    </span>
                    <span className={styles.transactionDescription}>
                        {dataExist(props.data.description, props.data.description, "Sem Descrição")}
                    </span>
                    <span className={styles.transactionDateAndHour}>
                        {dataExist(props.data.description, getDate(props.data.dateAndHour).localeFormatedDate, "Sem Data")}
                    </span>
                </section >
                {Connector(props.index, props.length, props.nextMod)}
            </article >
        );
    } else {
        return (
            <article className={styles.transactionWrapper}>
                <form className={styles.transactionBox} key={props.data._id}>
                    <div className={styles.valueLine} style={{ color: colorHandler() }}>
                        <button
                            className={styles.manipulationButton}
                            alt="Cancel Transaction"
                            onClick={() => resetForm()}
                            tabIndex={1}
                        >
                            Cancel Button<CancelButton />
                        </button>
                        <span className={styles.transactionValue} >
                            {props.data.transactionType != "gain" ? "-" : ""}
                            R$
                        </span>
                        <input
                            className={styles.inputValue}
                            alt={"Insert Value"}
                            type={"number"}
                            value={valueMask}
                            placeholder={parseInt(props.data.value)}
                            onFocus={() => setValueBorderColor(colorHandler())}
                            onBlur={() => setValueBorderColor("#FFFFFF55")}
                            onChange={onChangeValue}
                            style={{ color: colorHandler(), maxWidth: "calc(8rem*" + (0.4625 * valueSize) + ")", borderColor: valueBorderColor }}
                            tabIndex={2}
                            required
                        />
                        <span className={styles.transactionValue} >.</span>
                        <input
                            className={styles.inputValue}
                            alt={"Insert Cents"}
                            type={"number"}
                            value={centValueMask}
                            placeholder={(
                                parseInt(props.data.value) - parseFloat(props.data.value) == 0 ?
                                    "00"
                                    : Math.round(100 * (parseFloat(props.data.value) - parseInt(props.data.value)))
                            )}
                            onFocus={() => setCentsBorderColor(colorHandler())}
                            onBlur={() => setCentsBorderColor("#FFFFFF55")}
                            onChange={onChangeValueCents}
                            style={{ color: colorHandler(), width: "calc(8rem*" + (0.4625 * 2) + ")", borderColor: centsBorderColor }}
                            tabIndex={3}
                            required
                        />
                        <button
                            className={styles.manipulationButton}
                            type={"submit"}
                            name={"submit"}
                            alt={"Edit Transaction"}
                            tabIndex={7}
                            >
                            Accept Button
                            <ConfirmButton />
                        </button>
                    </div>
                    <input
                        className={styles.inputTitle}
                        type={"text"}
                        name={"title"}
                        placeholder={props.data.title}
                        maxlength={"25"}
                        onChange={onChangeTitle}
                        style={{ maxWidth: "calc(6rem*" + (0.4625 * titleSize) + ")" }}
                        autoComplete="off"
                        tabIndex={4}
                        required
                    />
                    <input
                        className={styles.inputDescription}
                        type="text"
                        name="description"
                        placeholder={dataExist(props.data.description, props.data.description, "Insira sua descrição")}
                        maxLength="51"
                        onChange={onChangeDescription}
                        style={{ width: "calc(3rem*" + (0.4625 * descriptionSize) + ")" }}
                        autoComplete="off"
                        tabIndex={5}
                    />
                    <input
                        className={styles.inputDateAndHour}
                        type={props.data.dateAndHour != undefined ? "text" : "datetime-local"}
                        name="dateAndHour"
                        onBlur={(ev) => onBlurtDate(ev)}
                        onFocus={(ev) => onClickDate(ev)}
                        placeholder={props.data.dateAndHour != undefined ? getDate(props.data.dateAndHour).localeFormatedDate : undefined}
                        autoComplete="off"
                        tabIndex={6}
                    />
                </form >
                <div className={styles.connector} style={{ backgroundColor: 'var(--accent-color)' }} />
            </article >
        );
    }
}
