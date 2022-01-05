import Writing from "../../components/Writing";
import firebase from "../../util/firebaseSetup"
import 'firebase/compat/firestore';
import {Redirect} from "react-router-dom";
import { useState } from "react";

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

const LoginMod = () => {
    const {values, emailInput, passInput} = Writing();
    const [redir, shouldRedirect] = useState(false)
    const handleAllInputs = () => { 
        let findedUser = gbArray.find(user => user.email === values.email && user.password === values.password)
        if (findedUser !== undefined)
        {
            sessionStorage.setItem('loggedUser', JSON.stringify({loggedId: findedUser.id, loggedName: findedUser.username}))
            shouldRedirect(true)
        } 
        else alert("Login failed. Please, check your credentials!")
    }

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

        #root > form  {
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


    return (
        <>
        <style>
            {div_style}
        </style>
        {redir ? <Redirect to = "/about"/> :  
                                            <form>
                                                <h2>Login</h2>
                                                <label>Email</label>
                                                <>
                                                    {emailInput}
                                                </>
                                                <label>Password</label>
                                                <>
                                                    {passInput}
                                                </>
                                                <button type="submit" onClick={handleAllInputs}>Login</button>
                                            </form>}</>
    );
}

export default LoginMod;