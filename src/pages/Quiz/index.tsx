import firebase from "../../util/firebaseSetup"
import 'firebase/compat/firestore';
import {Link} from "react-router-dom";
import { useState } from "react";
import Image from '../../background_img.jpg'

var nrUserOpt = 0
const Quiz = () => {
    const div_style = `
        * {
            margin: 0;
            padding: 0;
        }

        :root {
            --widthQuestionDiv: 50%;
        }
          
        #width-menu {
            width: 100%;
            background-color: crimson;
            display: flex;
            justify-content: space-around;
        }

        #width-menu a {
            padding: 10px;
            font-size: 20px;
            text-decoration: none;
            color: white;
        }

        #width-menu a:hover {
            background-color: green;
        }

        #mainDiv {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
        }

        label {
            color: white;
            font-size: 25px;
            margin-top: 20px;
        }

        select {
            font-size: 25px;
            border: 2px solid black;
            border-radius: 20px;
            color: darkred;
            width: 60px;
            padding: 5px;
            margin-top: 20px;
            outline: none;
        }

        .question {
            margin-top: 30px;
            background-color: darkslategrey;
            width: 40%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .question > label {
            margin-top: 10px;
        }

        .allqs {
            margin-left: 35px;
        }

        section {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        input[type="radio"] {
            height: 20px;
            width: 20px;
            margin-right: 20px;
        }

        input {
            width: var(--widthQuestionDiv);
            margin-top: 20px;
            padding: 10px;
            outline: none;
            border: 1px solid black;
            border-radius: 5px;
        }

        #quizname {
            width: 25%;
        }

        button {
            margin-top: 30px;
            margin-bottom: 10px;
            background-color: black;
            color: white;
            cursor: pointer;
            width: fit-content;
            padding: 5px;
            font-size: 25px;
            border: none;
            border-radius: 12px;
        }
    `
    const [callQuiz, callQuizFunc] = useState(0)
    const logUser = JSON.parse(sessionStorage.getItem('loggedUser')!)
    const optList = ["What are your favourite pet?", "What are your best friend?", "What do you like to do in your leisure time?",
                    "Do you prefer pizza to pasta?", "What is your favourite sport?", "What is your favourite color?"]
  
    const handleQuizAdd = () => {
        if (callQuiz < 7)
        {
            callQuizFunc(callQuiz + 1) 
            const opt = document.getElementById("nrAns") as HTMLSelectElement;
            nrUserOpt = parseInt(opt.options[opt.selectedIndex].text)
            for (let i = 0; i < 3; i++) 
                opt[i].disabled = true;
            const newDiv = document.createElement('div')
            newDiv.className = "question"
            const inp = document.createElement('input')
            inp.className = "allqs"
            const dList = document.createElement('datalist')
            for(let i = 0; i < optList.length; i++) {
                let optD = document.createElement("option");
                optD.value = optList[i];
                dList.appendChild(optD);
            }
            dList.id = "qsLst"
            inp.setAttribute('list', 'qsLst');
            inp.appendChild(dList)
            const lbl = document.createElement('label')
            lbl.innerHTML = "Select a question"
            newDiv.appendChild(lbl)
            newDiv.appendChild(inp)
            const ranStr = (Math.random() * 10).toString();
            for(let i = 0; i < nrUserOpt; i++) {
                let rbU = document.createElement("input");
                rbU.type = "radio"
                rbU.className = "trueAnsU"
                rbU.name = ranStr
                newDiv.appendChild(rbU);
                let inpU = document.createElement("input");
                inpU.className = "ansU"
                let sect = document.createElement('section')
                sect.appendChild(rbU)
                sect.appendChild(inpU)
                newDiv.appendChild(sect);
            }
            const delBtn = document.createElement('button')
            delBtn.className = "removeBtn"
            delBtn.innerHTML = "Delete question"
            delBtn.onclick = () => {callQuizFunc(callQuiz => callQuiz - 1) 
                                    delBtn.parentElement!.remove()}
            newDiv.appendChild(delBtn)
            document.getElementById('mainDiv')!.insertAdjacentElement('beforeend', newDiv)
        }
        else alert("You reached the maximum number of questions per quiz!");
    }

    const saveQuizAns = () => {
        const qName = document.getElementById('quizname') as HTMLInputElement;
        if (qName.value !== '') {
            let inputs = document.querySelectorAll('.allqs'), answ = document.querySelectorAll('.ansU'), rbs = document.querySelectorAll('.trueAnsU')
            let questionArr = [], answerArr = [], rbsArr = []
            for(let i = 0; i < inputs.length; i++) {
                let checkRadioTick = 0, j = i * nrUserOpt, jj = i * nrUserOpt + nrUserOpt
                while (j < jj) {
                    let rbi = rbs[j] as HTMLInputElement;
                    checkRadioTick += Number(rbi.checked)
                    rbsArr.push(rbi.checked)
                    j++;
                }
                if (checkRadioTick == 0) {
                    alert('Please select all the correct answers!')
                    return;
                }
            }
            for(let i = 0; i < inputs.length; i++) {
                let inp = inputs[i] as HTMLInputElement;
                questionArr.push(inp.value)
                let j = i * nrUserOpt, jj = i * nrUserOpt + nrUserOpt;
                while (j < jj) {
                    let ans = answ[j] as HTMLInputElement;
                    answerArr.push(ans.value)
                    j++;
                }
            }
            firebase.firestore().
            collection("quiz").
            doc(logUser.loggedId).
            set({
                questions: questionArr,
                answers: answerArr,
                trustful: rbsArr,
                nrOpt: nrUserOpt,
                quizname: qName.value 
            }).then(() => alert("Quiz was succesfully saved!"))
            document.getElementById('svzqz')!.style.pointerEvents = "none"
        }
        else alert("Please name your quiz!")
    }

    return (
        <>
        <style>
            {div_style}
        </style> 
        <div id = "width-menu">
            <Link to = 'about'>Your profile</Link>
            <Link to = "/log-into">Login</Link>
            <Link id = "svzqz" to = '/quiz' onClick = {saveQuizAns}>Save quiz</Link>
        </div>
        <div id = "mainDiv" style={{ backgroundImage: `url(${Image})`,
                                     backgroundRepeat: 'no-repeat',
                                     backgroundSize: 'cover'}}>
        <input id = "quizname" type = "text" placeholder = "Your quiz name"></input>
        <label>Choose the number of answers</label>
        <select id = "nrAns">
            <option value="a1">2</option>
            <option value="a2">3</option>
            <option value="a3">4</option>
        </select>
        <button id = "adding" onClick={handleQuizAdd}>Add question</button>
        </div>
        </>
    );
}

export default Quiz;