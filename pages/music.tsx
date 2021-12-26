import React from 'react';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react'
import io from 'socket.io-client'
import Layout from 'components/layout';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Alert from '@material-ui/lab/Alert';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { TextField } from '@material-ui/core';
import { getConf } from 'lib/local-data-reader';
import { SocketEventType } from 'types/data-types';

export async function getStaticProps() {

    const serverConf = getConf().server;
    const serverUrl = `${serverConf.protocol}://${serverConf.domain}:${serverConf.port}` 
    return {
        props: {serverUrl: serverUrl}
    }
}

class Event {

    type:SocketEventType;
    data:any;

    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
}

export default function MusicClient(props) {

    const [socket, setSocket] = React.useState(null);

    const classes = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: "10%"
        },
        buttonContainer: {
            marginTop: "1%",
            display: 'flex',
            justifyContent: 'space-between'
        },
        card: {
            margin: "2%",
            width: 600,
        },
        cardImage: {
            height: 200,
            width: "100%"
        },
        input: {
            width: "100%"
        },
        speechInput: {
            width: "100%"
        },
        sendSongButton: {
            marginTop: "2%",
            marginBottom: "2%",
            width: "100%"
        },
        songTitle: {
            padding: 10,
            color:'white'
        },
        songTime: {
            color: 'white',
            textShadow: "rgb(63 81 181) 2px 2px"
        },
        whiteText: {
            color:'white'
        }
    };

    useEffect(() => {
        const newSocket = io(props.serverUrl, { query: 'type=client' });
        newSocket.on('connect', () => {
            console.log("connected to client socket route");
        })
        newSocket.on('disconnect', () => {
            console.log('disconnect from client socket route')
        })
        newSocket.on('message', data => {
            processMessage(data);
        })
        getPlayList();
        setSocket(newSocket);
        return () => {newSocket.close()};
    }, [setSocket])

    const [song, setSong] = React.useState({
        currentSongTitle: 'title',
        currentSongImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg',
        time: "4:20"
    });

    const [inputField, setInputField] = React.useState({
        value: ''
    });

    const [pin, setPin] = React.useState({
        accepted: false
    });


    const [status, setStatus] = React.useState({
        clients: 0,
        machines: 0
    });

    const handleInputChange = (e) => {
        setInputField({ value: e.target.value });
    };

    const handlePinChange = (e) => {
        const pin = e.target.value;
        if (pin === '537') {
            setPin({ accepted: true });
        } else {
            setPin({ accepted: false });
        }
    }

    const getPlayList = async () => {
        try {
            const response = await fetch(props.serverUrl + "/api/playList")
            const body = await response.json();
            if (body.length > 0) {
                const nextSong = body[body.length - 1];
                setSong({
                    currentSongImage: nextSong.image,
                    currentSongTitle: nextSong.title,
                    time: formatSeconds(nextSong.timeInSeconds)
                })
            }
        } catch(err){
            console.warn(err)
        }
    }

    const sendSong = () => {
        const sendSongEvent = new Event("SONG_REQUEST", { youtubeUrl: inputField.value });
        setInputField({ value: "" })
        sendMessage(sendSongEvent);
    }

    const changeVolume = (amount) => {
        const changeVolumeEvent = new Event("CHANGE_VOLUME", { amount: amount });
        sendMessage(changeVolumeEvent);
    }

    const processMessage = (event) => {
        console.log(`Received message: ${JSON.stringify(event)}`);
        if (event.type === 'SONG_ACCEPTED') {
            setTimeout(() => getPlayList(), 1000);
        }
        if (event.type === 'HEARTHBEAT') {
            setStatus(event.data)
            setTimeout(() => getPlayList(), 1000);
        }
    }

    const sendMessage = (event) => {
        console.log(`Sending message: ${JSON.stringify(event)}`);
        socket.emit("message", event);
    }

    const formatSeconds = (seconds) => {
        var date = new Date(0);
        date.setSeconds(Number(seconds));
        var timeString = date.toISOString().substr(14, 5);
        return timeString
    }

    /*text to speech*/
    const [speechInputField, setSpeechInputField] = React.useState("");
    const handlespeechInputChange = (e) => setSpeechInputField(e.target.value); 
    const speak = () =>{
        if(!speechInputField){
            console.warn("Invalid text to speech")
            return;
        }
        sendMessage(new Event('SPEECH', {text:speechInputField}))
        setSpeechInputField("");
    }

    return (
        <Layout title="zenegép" marginTopDisabled={true}>
            <div style={classes.container}>
                <Card style={classes.card}>
                    <CardActionArea>
                        <Typography style={classes.songTitle} align="center" variant="h5">
                            {status.machines > 0 ?
                                (pin.accepted ?
                                    <Alert variant="filled" severity="success">Laptop elérhető</Alert>
                                    :
                                    <Alert variant="filled" severity="warning">Hiányzó vagy hibás pin</Alert>)
                                :
                                <Alert variant="filled" severity="error">Laptop nem elérhető</Alert>
                            }
                        </Typography>
                        <Typography style={classes.songTitle} align="center" variant="h5">
                            {song.currentSongTitle}
                        </Typography>
                        <CardMedia
                            style={classes.cardImage}
                            image={song.currentSongImage}>
                            <Typography style={classes.songTime} align="right" variant="h4">
                                {song.time}
                            </Typography>
                        </CardMedia>
                        <CardContent>
                            <TextField style={classes.input} disabled={!pin.accepted} label="Youtube link" value={inputField.value} onChange={handleInputChange} />
                            <Button disabled={!pin.accepted} onClick={() => sendSong()} variant="contained" color="primary" style={classes.sendSongButton}>Beküldés</Button>
                            <Divider />
                            <div style={classes.buttonContainer}>
                                <Button disabled={!pin.accepted} onClick={() => changeVolume(5)} variant="contained" color="primary">+</Button>
                                <Typography style={classes.songTitle} align="center" variant="h6">
                                    Hangerő
                                </Typography>
                                <Button disabled={!pin.accepted} onClick={() => changeVolume(-5)} variant="contained" color="primary">-</Button>
                            </div>
                            <Divider />
                            <TextField style={classes.speechInput} disabled={!pin.accepted} label="Szöveg" onChange={handlespeechInputChange} value={speechInputField}/>
                            <Button disabled={!pin.accepted} style={classes.sendSongButton} onClick={() => speak()} variant="contained" color="primary">Speak</Button>
                        </CardContent>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>PIN Megadása</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextField style={classes.input} type="number" error={!pin.accepted} label="PIN" onChange={handlePinChange} />
                            </AccordionDetails>
                        </Accordion>
                    </CardActionArea>
                </Card>
            </div>
        </Layout>
    )
}