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
            borderImage: "url(https://images.getbento.com/accounts/e8eee6aef7c2e8242e267a82a199ac35/media/images/19081ivory-borders.png) 70 70 round",
            borderWidth: "30px",
            borderStyle: "solid",
            width: "70%",
            padding: "2%"
        },
        drinkContainer: {
            textAlign: "center",
            marginTop: "20%"
        },
        drinkTitle: {
            fontWeight: "bold"
        },
        drinkDescription: {

        },
        drinkPrice: {

        }
    };

    const [activeCategory, setActiveCategory] = React.useState({ id: 1 });


    return (
        <Layout title="Itallap">
            <div style={classes.pageContainer}>
                <div style={classes.buttonContainer}>
                    {props.categories.map(category => {
                        if (category.id == activeCategory.id) {
                            return (<Button variant="outlined" style={classes.activeCategoryButton}>{category.title}</Button>)
                        } else {
                            return (<Button variant="outlined" onClick={() => setActiveCategory({ id: category.id })} style={classes.categoryButton}>{category.title}</Button>)
                        }
                    })}
                </div>
                <div style={classes.shortDesc}>
                    <h3>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat                    </h3>
                </div>
                <div style={classes.drinkListContainer}>
                    {props.drinks
                        .filter(drink => drink.categoryId === activeCategory.id)
                        .map(drink => {
                            return (
                                <div style={classes.drinkContainer}>
                                    <h2 style={classes.drinkTitle}>
                                        {drink.title}
                                    </h2>
                                    <h3 style={classes.drinkDescription}>
                                        {drink.description}
                                    </h3>
                                    <h3 style={classes.price}>
                                        {drink.price}
                                    </h3>
                                </div>
                            )
                        })}
                </div>
            </div>
        </Layout>
    )
}