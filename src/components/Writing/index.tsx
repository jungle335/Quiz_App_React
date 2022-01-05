import React, { useState } from "react";

const Writing = () => {
    const [values, updateValues] = useState({
        email: '',
        password: '',
        user: '',
    })

    const handleChange = (code: number, e: React.ChangeEvent<HTMLInputElement>) => {
        switch(code)
        {
            case 1 : {
                updateValues({email: e.target.value, password: values.password, user: values.user})
                break;
            }
            case 2 : {
                updateValues({email: values.email, password: e.target.value, user: values.user})
                break;
            }
            case 3 : {
                updateValues({email: values.email, password: values.password, user: e.target.value})
                break;
            }
        }
    }

    const emailInput = <input type = "text" value = {values.email} onChange = {(e) => handleChange(1, e)}></input>
    const passInput = <input type = "password" value = {values.password} onChange = {(e) => handleChange(2, e)}></input>
    const userInput = <input type = "text" value = {values.user} onChange = {(e) => handleChange(3, e)}></input>

    return {values, emailInput, passInput, userInput};
}

export default Writing;