import Layout from '../components/layout'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Quote from '../components/quote'
import CardImage from '../components/cardImage';
import BackgroundVideo from '../components/backgroundVideo';
import Carousel from '../components/carousel';
import { getIndexData } from '../util/localDataReader'
import Grid from '@material-ui/core/Grid';
import { GetStaticProps } from 'next';
import { IndexData } from '../types/dataTypes';


export const getStaticProps: GetStaticProps = async(context) => {

  return {
    props: getIndexData()
  }
}

export default function Home({ video, introduction, cards, quotePart, photos }:IndexData) {


  const classes: any = {
    titleContainer: {
      fontFamily: "Raleway,sans-serif"
    },
    sectionDivider: {
      marginTop: "8%",
    },
    photoContainer: {
      padding: 0,
      maxWidth: "100%"
    }
  };

  return (
    <Layout title="Kezdőlap" marginTopDisabled>
      <BackgroundVideo
        blur={2}
        videoSource={video.videoSource} >
        <Typography align="center" variant="h1">
          {video.title}
        </Typography>
        <Typography align="center" variant="h1">
          {video.subTitle}
        </Typography>
      </BackgroundVideo>
      <Container fixed style={classes.sectionDivider}>
        <div style={classes.titleContainer}>
          <Typography align="center" variant="h3">
            {introduction.title}
          </Typography>
        </div>
        <div style={classes.sectionDivider}>
          <Typography align="center" variant="h3">
            {introduction.subTitle}
          </Typography>
        </div>
      </Container>
      <Container fixed style={classes.sectionDivider}>
        <Grid container>
          {cards.map(card => {
            return (
              <Grid item key={card.id} md={4} sm={12} style={{width:"100%", padding: 20}}>
                <CardImage 
                  image={card.image}
                  title={card.title}
                  textTitle={card.textTitle}
                  text={card.text}>
                </CardImage>
              </Grid>
            )
          })}
        </Grid>
      </Container>
      <Container fixed style={classes.sectionDivider}>
        <Typography align="center" variant="h3">
          {quotePart.text}
        </Typography>
        <Grid container>
          {quotePart.quotes.map(quote => {
            return (
              <Grid  key={quote.id}  item md={4} sm={12} style={{width:"100%", padding: 20}}>
                <Quote text={quote.text} author={quote.author} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
      <Container style={{...classes.sectionDivider, ...classes.photoContainer}}>
        <Carousel photos={photos} />
      </Container>
    </Layout>
  )
}