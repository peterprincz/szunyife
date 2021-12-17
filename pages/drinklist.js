import React from 'react';
import Layout from "../components/layout";
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { getDrinkData } from '../util/localDataReader'

export async function getStaticProps() {

    return {
        props: getDrinkData()
    }
}

export default function DrinkList(props) {

    const classes = {
        pageContainer: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginLeft: "10%",
            marginRight: "10%"
        },
        buttonContainer: {
            display: "flex",
            marginTop: "5%",
            width: "60%",
            flexWrap: "wrap",
            justifyContent: "center"
        },
        categoryButton: {
            margin: "2%",
            minWidth: "20%",
            color: "white",
            backgroundColor: "black",
            borderColor: "white"
        },
        activeCategoryButton: {
            margin: "2%",
            minWidth: "20%",
            color: "black",
            backgroundColor: "white",
            borderColor: "white"
        },
        shortDesc: {
            textAlign: "center"
        },
        drinkListContainer: {
            borderImage: "url(./drinkborder.png) 70 70 round",
            borderWidth: "30px",
            borderStyle: "solid",
            width: "80%",
            padding: "2%"
        },
        drinkContainer: {
            textAlign: "center",
            marginTop: "5rem"
        }
    };

    const [activeCategory, setActiveCategory] = React.useState({ id: 1 });

    props.drinks.forEach((x, i) => x.id = i);
    return (
        <Layout title="Itallap">
            <Typography variant="h1" align="center">
                ITALLAP
            </Typography>
            <div style={classes.pageContainer}>
                <div style={classes.buttonContainer}>
                    {props.categories.map(category => {
                        if (category.id == activeCategory.id) {
                            return (<Button key={category.id} variant="outlined" style={classes.activeCategoryButton}>{category.title}</Button>)
                        } else {
                            return (<Button key={category.id} variant="outlined" onClick={() => setActiveCategory({ id: category.id })} style={classes.categoryButton}>{category.title}</Button>)
                        }
                    })}
                </div>
                <div style={classes.shortDesc}>
                    <Typography align="center" variant="h3">
                        Ezekkel a finom italokkal várunk!
                    </Typography>
                </div>
                <div style={classes.drinkListContainer}>
                    {props.drinks
                        .filter(drink => drink.categoryId === activeCategory.id)
                        .map(drink => {
                            return (
                                <React.Fragment key={drink.id}>
                                    <div key={drink.id} style={classes.drinkContainer}>
                                        <Typography variant="h3" style={{ wordWrap: 'break-word' }}>
                                            {drink.title}
                                        </Typography>
                                        <Typography variant="h4">
                                            {drink.description}
                                        </Typography>
                                        <Typography variant="h4">
                                            {drink.price}
                                        </Typography>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                </div>
            </div>
        </Layout>
    )
}