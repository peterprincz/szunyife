import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { CardImageProperties } from '../types/dataTypes';

export default function CardImage({ className, title, image, textTitle, text }:CardImageProperties) {

    const classes = {
        card: {
            height: "100%",
            width:"100%",
            alignText:'center'
        },
        cardImage: {
            height: 800,
        }
    };
    return (
        <Card className={className} style={classes.card}>
            <CardActionArea>
                <CardMedia
                    style={classes.cardImage}
                    title={title}
                    image={image}
                >
                </CardMedia>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {textTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}

