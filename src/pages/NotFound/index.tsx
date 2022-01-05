import Image from '../../pages/NotFound/404_error.jpg'

const NotFound = () => {
    const div_style = `
        #messages {
            background-color: lightgray;
            text-align: center;
        }

        h1 {
            margin-top: 100px; 
            text-align: center;
            color: red;
        }

        p {
            font-size: 25px;
            text-align: center;
        }

        #photo {
            width:  400px; 
            height: 400px; 
            margin: auto;
        }
        
    `
    return (
            <>
            <style>
                {div_style}
            </style>
            <h1>Not Found</h1>
            <p>The page you are looking for doesn't exist</p>
            <div id = "photo" style={{ backgroundImage: `url(${Image})`,
                                       backgroundRepeat: 'no-repeat',
                                       backgroundSize: 'cover'}}>
            </div></>)
}

export default NotFound;