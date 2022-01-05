import React from 'react'
import { Link } from "react-router-dom";

const Design = () => {
    const design_style = `
                body {
                    background-color: lightgray;
                }

                div {
                    width: 40%;
                    height: 45%;
                    padding: 15px;
                    border: 1px solid black;
                    border-radius: 10px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: burlywood;
                    text-align: center;
                    animation-name: change_bgd;
                    animation-duration: 15s;
                    animation-iteration-count: infinite;
                }

                @keyframes change_bgd {
                    0%   {background-color: rgb(63, 144, 200);}
                    25%  {background-color: rgb(255, 190, 94);}
                    50%  {background-color: rgb(195, 130, 94);}
                    100% {background-color: rgb(144, 195, 139);}
                }

                a {
                    text-decoration: none;
                    font-size: 35px;
                    display: block;
                    margin-top: 75px;
                }

                a:hover {
                    color: red;
                }`
    return (
        <><style>
            {design_style}
        </style>
        <Link to='/log-into'>Login</Link>
        <Link to='/new-acc'>Create an account</Link>
        </>)
}

export default Design;