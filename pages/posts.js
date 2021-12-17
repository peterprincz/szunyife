import React from 'react';
import Layout from "../components/layout";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { getPosts } from '../util/localDataReader'

export async function getStaticProps() {

    return {
        props: { posts: getPosts() }
    }
}

export default function Posts(props) {

    const classes = {
        postMedia: {
            height: 250
        },
        postHeader: {
            borderBottom: "1px solid white",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20
        },
        postBottom: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end"
        }
    }

    return (
        <Layout title="Hírek">
            <Container fixed>
                <Typography variant="h1" align="center">
                    HÍREK
                </Typography>
                <Grid container justifyContent="center">
                    {props.posts.map(post => {
                        return (
                            <Grid xs={12} item key={post.id} style={{ marginBottom: 50}}>
                                <Card style={{ height: "100%" }}>
                                    <CardMedia
                                        style={classes.postMedia}
                                        image={post.image.src}
                                        alt="post media"
                                    />
                                    <CardContent style={classes.cardContent}>
                                        <div style={classes.postHeader}>
                                            <Typography align="center" variant="h6" style={{ width: "100%" }}>
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
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>

            </Container>
        </Layout >
    )

}