import { TYPE_INPUT } from '@/constants/interfaces'
import styles from "@/Components/Input/input.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'

function Input({type="text", title="", icon, name, required, onChnage, value=""}:TYPE_INPUT) {
    const [data, setData] = useState(value);

    const handleInput = (e:any) => {
        if(onChnage)  onChnage.call(null,e);
        setData(e.target.value);
    }

    return (
        <div className={styles.input}>
            <input type={type} name={name} required={required?true:false} onChange={handleInput} value={data} />
            <div>
                {icon?<FontAwesomeIcon icon={icon} />:null}
                <span>{title}</span>
            </div>
        </div>
    )
}

export default Input;