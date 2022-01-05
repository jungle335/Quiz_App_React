import Writing from "../../components/Writing";
import firebase from "../../util/firebaseSetup"
import 'firebase/compat/firestore';
import React, { useState } from "react";

var gbArray: any[] = []
const getAllUsers = async () => {
    const events =  await firebase.firestore().
                    collection('users').
                    get().
                    then((allUsers) => {   
                        allUsers.forEach((user) => {
                            gbArray.push({ id: user.id, ...user.data() })
                        })
                    })
}
getAllUsers()

const RegisterMod = () => {
    const div_style = `
                        div {
                            width: 25%;
                            padding: 15px;
                            border: 1px solid black;
                            border-radius: 10px;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            background-color: burlywood;
                        }

                        #root > form {
                            display: flex;
                            flex-direction: column;
                        }

                        button {
                            background-color: black;
                            color: white;
                            cursor: pointer;
                            width: 90px;
                            margin: auto;
                            padding: 5px;
                            font-size: 20px;
                            border: none;
                            border-radius: 10px;
                            text-align: center;
                            box-shadow: 5px 10px 15px 0 grey;
                        }

                        button:hover {
                            color: red;
                        }

                        h2 {
                            color: darkslateblue;
                            text-align: center;
                        }

                        input {
                            border-top: none;
                            border-right: none;
                            border-bottom: red dotted;
                            border-right: none;
                            outline: none;
                            margin: 7px 7px 15px 7px;
                            padding: 5px;
                        }`

    const {values, emailInput, passInput, userInput} = Writing();
    
    const sendUserData = () => {
        let checkUserEmail = gbArray.find(user => user.email === values.email)
        if (checkUserEmail !== undefined) alert("This email is already used!")
        else if (values.email !== '' && values.password !== '' && values.user !== '') {
            firebase.firestore().
            collection("users").
            add({
                email: values.email, 
                password: values.password, 
                username: values.user
            }).then(() => alert('Account created!'))
            values.email = values.password = values.user = ''
        }
        else alert('Empty fields!')
    }

    return (
        <><style>
            {div_style}
        </style>
        <form>
            <h2>Create new account</h2>
            <label>Username</label>
            <>
                {userInput}
            </>
            <label>Email</label>
            <>
                {emailInput}
            </>
            <label>Password</label>
            <>
                {passInput}
            </>
            <button type="button" onClick={sendUserData}>Create</button>
        </form>
        </>
    )
}


export default RegisterMod;