import React from 'react';
import Layout from "../components/layout";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import { getPosts } from '../util/localDataReader'

export async function getStaticProps() {

    return {
        props: { posts: getPosts() }
    }
}

export default function Posts(props) {

    const classes = {
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        postContainer: {
            margin: "2%",
            width: "80%"
        },
        postMedia: {
            height: 250
        },
        postHeader: {
            borderBottom: "1px solid white",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20
        },
        postTitle: {
            fontSize: 24,
            fontWeight: "bold"
        },
        postBottom: {
            display:"flex",
            justifyContent: "flex-end"
        }
    }

    return (
        <Layout title="Hírek">
            <div style={classes.container}>
                <Typography variant="h1">
                    HÍREK
                </Typography>
                {props.posts.map(post => {
                    return (
                        <div key={post.id} style={classes.postContainer}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        style={classes.postMedia}
                                        image={post.image.src}
                                        alt="green iguana"
                                    />
                                    <CardContent style={classes.cardContent}>
                                        <div style={classes.postHeader}>
                                            <Typography align="center" variant="h6">
                                                {post.title}
                                            </Typography>
                                        </div>
                                        <div style={classes.postBody}>
                                            <Typography variant="body1">
                                                {post.body}
                                            </Typography>
                                        </div>
                                        <div style={classes.postBottom}>
                                            <Typography variant="overline">
                                                {post.date}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </Layout >
    )

}