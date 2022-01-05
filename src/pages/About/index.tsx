import React, { useEffect, useState } from 'react'
import firebase from "../../util/firebaseSetup"
import 'firebase/compat/firestore';
import { Redirect } from 'react-router-dom';
import Writing from '../../components/Writing';
import Image from '../../background_img.jpg'

const About = () => {    
    const div_style = `
                        body {
                            background-color: lightgrey;
                        }

                        button {
                            background-color: black;
                            color: white;
                            cursor: pointer;
                            width: fit-content;
                            padding: 5px;
                            font-size: 20px;
                            border: none;
                            border-radius: 12px;
                            margin-top: 10px; 
                        }

                        section {
                            width: 50%;
                            height: 100%;
                            overflow-x: hidden;
                            position: fixed;
                            top: 0;
                        }

                        #left {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            align-items: center;
                            left: 0;
                        }

                        #editInputs {
                            display: flex;
                            flex-direction: column;
                            width: 250px;
                            border: 2px solid black;
                            border-radius: 10px;
                            background-color: gray;
                        }

                        #buttons {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }

                        input {
                            border-top: none;
                            border-right: none;
                            border-bottom: red dotted;
                            border-right: none;
                            outline: none;
                            margin: 7px 7px 15px 7px;
                            padding: 5px;
                        }

                        #right {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            right: 0;
                            background-color: lightgrey;
                        }

                        #left > h2 {
                            color: white;
                            margin-top: 150px;
                        }
                        
                        #right > button {
                            margin-top: 50px;
                        }

                        #right > div {
                            display: flex;
                            flex-direction: column;
                            border: 1px solid black;
                            margin-top: 100px;
                            width: 50%;
                            font-size: 25px; 
                            background-color: darkslategrey;
                            color: white;
                        }
    `
    const [flag, updateFlag] = useState(false)
    const [logout, out] = useState(false)
    const [quizVal, changeQuizVal] = useState(false)
    const [goUser, changeGoUser] = useState(false)
    const [editTimes, updateEditTimes] = useState(-1)
    const [showQ, changeShowVal] = useState(-1)
    const {values, emailInput, passInput, userInput} = Writing();
    const delBtn = document.getElementById('delQ') as HTMLButtonElement;
    let logUser = JSON.parse(sessionStorage.getItem('loggedUser')!)
    
    const editAcc = () => {
        updateEditTimes(editTimes * (-1));
        if (editTimes == 1 && values.email && values.password && values.user)
        {
            firebase.firestore().
            collection("users").
            doc(logUser.loggedId).
            update({
                email: values.email,
                password: values.password,
                username: values.user
            }).then(() => alert("Your account was succesfully edited!"));
            values.email = values.password = values.user = ''
        }
    }

    const deleteAcc = () => {
        if (window.confirm("Are you sure you want to delete your account?")) {
            firebase.firestore().
            collection("users").
            doc(logUser.loggedId).
            delete().
            then(() => alert("Your account was deleted!"));
            updateFlag(true)
        }
    }


    const goToQuiz = () => {changeQuizVal(true)}
    const goToUsers = () => {changeGoUser(true)}

    const showMyQuiz = async () => {
        changeShowVal(showQ * (-1))
        document.getElementById('showQuiz')!.innerHTML = ""
        if (showQ == 1 && !delBtn.disabled) {
            const events =  await firebase.firestore().
                            collection('quiz').
                            doc(logUser.loggedId).
                            get().
                            then((allQuiz) => {   
                                let obj = allQuiz.data()!
                                if (obj !== undefined) {
                                    let qs = obj.questions!, as = obj.answers!
                                    const lblq = document.createElement('label')
                                    lblq.style.marginLeft = "20px";
                                    lblq.innerHTML = "Quiz Name: " + obj.quizname.fontcolor("darkseagreen")
                                    document.getElementById('showQuiz')?.appendChild(lblq)
                                    for(let i = 0; i < qs.length; i++) {
                                        const lblq = document.createElement('label')
                                        lblq.innerHTML = qs[i]
                                        lblq.style.marginLeft = "20px";
                                        lblq.style.color = "gold"
                                        document.getElementById('showQuiz')?.appendChild(lblq)
                                        let j = i * obj.nrOpt, jj = i * obj.nrOpt + obj.nrOpt;
                                        while (j < jj) {
                                            const lbla = document.createElement('label')
                                            lbla.innerHTML = as[j]
                                            lbla.style.textAlign = "center";
                                            lbla.style.color = "wheat"
                                            document.getElementById('showQuiz')?.appendChild(lbla)
                                            j++;
                                        }
                                    }
                                }
                            })
        }
    }

    const delMyQuiz = () => {
        if (window.confirm("Are you sure you want to delete your quiz?")) {
            firebase.firestore().
            collection("quiz").
            doc(logUser.loggedId).
            delete().
            then(() => alert("Your quiz was deleted!"));
            delBtn.disabled = true;   
            document.getElementById('showQuiz')!.innerHTML = ""
        }
    }

    const logOut = () => { out(true); logUser = {} ; sessionStorage.clear(); }
    
    useEffect(()=>{
        if (window.sessionStorage) {
            if (!sessionStorage.getItem('reload')) {
                sessionStorage['reload'] = true;
                window.location.reload();
            } else sessionStorage.removeItem('reload');
        }}, [])
    
    return (
        <>
        <style>
            {div_style}
        </style>
        <div>
            {flag && <Redirect to = "/new-acc"/>}
            {logout && <Redirect to = '/about'/>}
            <section id = "left" style={{ backgroundImage: `url(${Image})`,
                                          backgroundRepeat: 'no-repeat',
                                          backgroundSize: 'cover'}}>
                {logUser !== null ? <h2>Your name: {logUser.loggedName}</h2> : <h2>Logged out</h2>}
                {!logout && editTimes == 1 && <div id = "editInputs">
                                        <label>Email</label>
                                        {emailInput}
                                        <label>Password</label>
                                        {passInput}
                                        <label>Username</label>
                                        {userInput}
                                    </div>}
                {!logout && <div id = "buttons">
                            {quizVal && <Redirect to = "quiz"/>}
                            {goUser && <Redirect to = "/search"/>}
                            <button onClick={goToQuiz}>Create quiz</button>
                            <button onClick={goToUsers}>Show users</button>
                            <button onClick={editAcc}>Edit account</button>
                            <button onClick={deleteAcc}>Delete account</button>
                            <button onClick={logOut}>Log out</button>
                </div>}
            </section>
            {!logout && <section id = "right">
                        <button id = "getqz" onClick = {showMyQuiz}>Show Quiz</button>
                        <button id = "delQ" onClick = {delMyQuiz}>Delete Quiz</button>
                        <div id = "showQuiz"> </div>
            </section>}
        </div></>
        )
}

export default About;