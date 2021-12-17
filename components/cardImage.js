import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image'



export default function CardImage(props) {

    const classes = {
        card: {
            margin: "2%",
            height: "100%",
            width:"100%",
            textAlign:'center'
        },
        cardImage: {
            height: 800,
        }
    };
    return (
        <Card className={props.className} style={classes.card}>
            <CardActionArea>
                <CardMedia
                    style={classes.cardImage}
                    title={props.title}
                    image={props.image}
                >
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.textTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}

