import Layout from '../components/layout'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Quote from '../components/quote'
import CardImage from '../components/cardImage';
import BackgroundVideo from '../components/backgroundVideo';
import Carousel from '../components/carousel';
import { getIndexData } from '../util/localDataReader'

import styles from './index.module.css'


export async function getStaticProps() {

  return {
    props: getIndexData()
  }
}

export default function Home({ video, introduction, cards, quotePart, photos }) {

  const classes = {
    titleContainer: {
      marginTop: "5%",
      fontFamily: "Raleway,sans-serif"
    },
    subTitleContainer: {
      marginTop: "5%"
    },
    cardsContainer: {
      marginTop: "5%",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    quoteContainer: {
      paddingTop: "5%",
      paddingBottom: "5%",
      textAlign: "center"
    },
    quotes: {
      display: "flex",
    },
    imageContainer: {
      marginTop: "5%",
      width: "100%"
    }
  };

  return (
    <Layout title="Kezdőlap">
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
      <Container fixed>
        <div style={classes.titleContainer}>
          <Typography align="center" variant="h3">
            {introduction.title}
          </Typography>
        </div>
        <div style={classes.subTitleContainer}>
          <Typography align="center" variant="h3">
            {introduction.subTitle}
          </Typography>
        </div>
      </Container>

      <div style={classes.cardsContainer} className={styles['flex-response-column']}>
        {cards.map(card => {
          return (
            <CardImage key={card.id}
              className={styles['responsiveCard']}
              image={card.image}
              title={card.title}
              textTitle={card.textTitle}
              text={card.text}>
            </CardImage>
          )
        })}

      </div>

      <div style={classes.quoteContainer}>
          <Typography align="center" variant="h3">
            {quotePart.text}
          </Typography>
        <div style={classes.quotes} className={styles['flex-response-column']}>
          {quotePart.quotes.map(quote => {
            return (
              <Quote key={quote.id} text={quote.text} author={quote.author} />
            )
          })}
        </div>
      </div>
      <div style={classes.imageContainer}>
        <Carousel photos={photos} />
      </div>
    </Layout>
  )
}