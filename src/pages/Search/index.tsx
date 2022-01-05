import firebase from "../../util/firebaseSetup"
import 'firebase/compat/firestore';
import React, { useState } from "react";
import Image from '../../background_img.jpg'

const logUser = JSON.parse(sessionStorage.getItem('loggedUser')!)
var rightAns: [] = []
var nrOpt = 0
let gbArr: { userId: any; userName: any;}[] = []
const getAllUsers = async () => {
    const events = firebase.firestore().
                    collection('users').
                    get().
                    then((allUsers) => {   
                        allUsers.forEach((user) => {
                            let userData = user.data()
                            if (logUser) 
                                if (logUser.loggedId !== user.id)
                                    gbArr.push({ userId: user.id, userName: userData.username })
                        })
                    })
}
getAllUsers()

const SearchMod = () => {
    const [showU, updShowU] = useState(-1)
    const div_style = `
                        body {
                            background-color: lightgrey;
                        }

                        div {
                            width: 100%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }

                        button {
                            background-color: black;
                            color: white;
                            cursor: pointer;
                            width: 145px;
                            margin-top: 20px;
                            padding: 5px;
                            font-size: 25px;
                            border: none;
                            border-radius: 10px;
                            text-align: center;
                        }

                        a {
                            cursor: pointer;
                            margin-top: 10px;
                            font-size: 27px;
                            text-decoration: none;
                        }

                        a:hover {
                            color: red;
                        }

                        #showQuiz {
                            background-color: blue;
                            width: 35%;
                            margin-top: 30px;
                            border: 1px solid black;
                            border-radius: 30px;
                        }

                        #showQuiz > button {
                            width: 100px;
                        }
                        
                        label {
                            font-size: 25px;
                            margin-top: 10px;
                            color: white;
                        }
                
                        input[type="radio"] {
                            height: 20px;
                            width: 20px;
                            margin: 20px 10px 0 0;
                        }
                        
                        section {
                            display: flex;
                            justify-content: flex-start;
                            margin-left: 10px;
                            width: 100%;
                        }
    }`

    const showUsers = () => {updShowU(showU * (-1))}
    const handleQuizes = () => {
        const allButtons = document.getElementsByClassName('showQ')
        for(let i = 0; i < allButtons.length; i++) {
            allButtons[i].addEventListener('click', async () => {
                const events =  await firebase.firestore().
                                collection('quiz').
                                doc(gbArr[i].userId).
                                get().
                                then((allQuiz) => {   
                                    document.getElementById('showQuiz')!.innerHTML = ""
                                    let obj = allQuiz.data()!
                                    if (obj && logUser && logUser.loggedId !== gbArr[i].userId) {
                                        let qs = obj.questions!, as = obj.answers!, truth = obj.trustful!
                                        nrOpt = obj.nrOpt!
                                        rightAns = truth
                                        const lblq = document.createElement('label')
                                        lblq.style.marginLeft = "20px";
                                        lblq.innerHTML = "Quiz Name: " + obj.quizname.fontcolor("darkseagreen")
                                        document.getElementById('showQuiz')?.appendChild(lblq)
                                        for(let i = 0; i < qs.length; i++) {
                                            const lblq = document.createElement('label')
                                            lblq.innerHTML = qs[i]
                                            lblq.style.color = "gold"
                                            document.getElementById('showQuiz')?.appendChild(lblq)
                                            let j = i * nrOpt, jj = i * nrOpt + nrOpt;
                                            const ranStr = (Math.random() * 10).toString();
                                            while (j < jj) {
                                                let sect = document.createElement('section')
                                                let rbU = document.createElement("input");
                                                rbU.type = "radio"
                                                rbU.className = "trueAnsU"
                                                rbU.name = ranStr
                                                sect.appendChild(rbU);
                                                const lbla = document.createElement('label')
                                                lbla.innerHTML = as[j]
                                                lbla.style.textAlign = "center";
                                                lbla.style.color = "wheat"
                                                sect.appendChild(lbla)
                                                document.getElementById('showQuiz')?.appendChild(sect)
                                                j++;
                                            }
                                        }
                                        const sndBtn = document.createElement('button')
                                        sndBtn.innerHTML = "Check"
                                        sndBtn.onclick = () => {
                                            let rbs = document.querySelectorAll(".trueAnsU"), rbsArr = [], indexQuestion = 1, nr = 0
                                            for(let i = 0; i < rbs.length; i++) {
                                                let rbi = rbs[i] as HTMLInputElement;
                                                rbsArr.push(rbi.checked)
                                            }
                                            for (let i = 0; i < rbsArr.length; i+=nrOpt) {
                                                let ok = 0
                                                for (let j = i; j < i + nrOpt; j++) {
                                                    if (rbsArr[j] == rightAns[j])
                                                        ok++;
                                                }
                                                const lb = document.createElement('label')
                                                lb.innerHTML = `Question ${indexQuestion}`
                                                document.getElementById("showQuiz")!.appendChild(lb)
                                                const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
                                                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                                                if (ok == nrOpt) {
                                                    nr++;
                                                    svg.setAttributeNS(null, 'viewBox', "0 0 128 128");
                                                    svg.setAttributeNS(null, 'height', '128');
                                                    svg.setAttributeNS(null, 'width', '128');
                                                    svg.setAttributeNS(null, 'fill', 'green');                                   
                                                    path.setAttributeNS(null, 'd', "M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z");
                                                    svg.appendChild(path);
                                                    path.setAttributeNS(null, 'd', "M87.9,42.36,50.42,79.22,40.17,68.43a3,3,0,0,0-4.35,4.13l12.35,13a3,3,0,0,0,2.12.93h.05a3,3,0,0,0,2.1-.86l39.65-39a3,3,0,1,0-4.21-4.28Z")
                                                    svg.appendChild(path);
                                                }
                                                else {
                                                    svg.setAttributeNS(null, 'viewBox', "0 0 512 512");
                                                    svg.setAttributeNS(null, 'height', '160');
                                                    svg.setAttributeNS(null, 'width', '160');
                                                    svg.setAttributeNS(null, 'fill', 'red');       
                                                    path.setAttributeNS(null, 'd', "M255.997,460.351c112.685,0,204.355-91.668,204.355-204.348S368.682,51.648,255.997,51.648  c-112.68,0-204.348,91.676-204.348,204.355S143.317,460.351,255.997,460.351z M255.997,83.888  c94.906,0,172.123,77.209,172.123,172.115c0,94.898-77.217,172.117-172.123,172.117c-94.9,0-172.108-77.219-172.108-172.117  C83.888,161.097,161.096,83.888,255.997,83.888z");
                                                    svg.appendChild(path);
                                                    path.setAttributeNS(null, 'd', "M172.077,341.508c3.586,3.523,8.25,5.27,12.903,5.27c4.776,0,9.54-1.84,13.151-5.512l57.865-58.973l57.878,58.973  c3.609,3.672,8.375,5.512,13.146,5.512c4.658,0,9.316-1.746,12.902-5.27c7.264-7.125,7.369-18.793,0.242-26.051l-58.357-59.453  l58.357-59.461c7.127-7.258,7.021-18.92-0.242-26.047c-7.252-7.123-18.914-7.018-26.049,0.24l-57.878,58.971l-57.865-58.971  c-7.135-7.264-18.797-7.363-26.055-0.24c-7.258,7.127-7.369,18.789-0.236,26.047l58.351,59.461l-58.351,59.453  C164.708,322.715,164.819,334.383,172.077,341.508z")
                                                    svg.appendChild(path);
                                                }
                                                document.getElementById("showQuiz")!.appendChild(svg)
                                                indexQuestion++;
                                            }
                                            const lbb = document.createElement('label')
                                            lbb.innerHTML = `Your score: ${nr}`
                                            document.getElementById("showQuiz")!.appendChild(lbb)
                                            sndBtn.disabled = true
                                            setTimeout(() => {
                                                        document.getElementById('showQuiz')!.innerHTML = ""}, 
                                                        10000);

                                        };
                                        document.getElementById('showQuiz')?.appendChild(sndBtn)
                                    }
                                })
            })
        }
    }

    return (
        <>
        <style>
            {div_style}
        </style>
        <div id = "users">
            <button onClick = {showUsers}>Show users</button>
            {showU == 1 && gbArr.map((el: any) => { return (<a className = "showQ" onClick = {handleQuizes}>{el.userName}</a>)})}
        </div>
        <div id = "showQuiz" style={{ backgroundImage: `url(${Image})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'}}></div> 
        </>
    )
}

export default SearchMod;