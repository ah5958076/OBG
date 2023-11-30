import { TYPE_SELECT } from '@/constants/interfaces'
import styles from "@/Components/Select/select.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function Select({options=[], title="", icon, name, required, onChnage, value=""}:TYPE_SELECT) {
    const [data, setData] = useState(value);

    const handleSelect = (e:any) => {
        if(onChnage)  onChnage.call(null,e);
        setData(e.target.value);
    }

    return (
        <div className={styles.input}>
            <select name={name} onChange={handleSelect} value={data} required={required?true:false}>
                <option key={-1} value="-" defaultChecked>-- Select --</option>
                {options.map((elem, index) => {
                    return <option key={index} value={Object.keys(elem)[0]}>{String(Object.values(elem)[0])}</option>
                })}
            </select>
            <div>
                {icon?<FontAwesomeIcon icon={icon} />:null}
                <span>{title}</span>
            </div>
        </div>
    )
}

export default Select;