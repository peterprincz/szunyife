import React from 'react';
import Layout from "components/layout";
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { getDrinkData } from 'lib/local-data-reader'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { DrinkData } from 'types/data-types'


export async function getStaticProps() {

    return {
        props: getDrinkData()
    }
}

export default function DrinkList({categories, drinks}:DrinkData) {

    const classes = {
        categoryButton: {
            width: "100%",
            color: "white",
            backgroundColor: "black",
            borderColor: "white"
        },
        activeCategoryButton: {
            width: "100%",
            color: "black",
            backgroundColor: "white",
            borderColor: "white"
        },
        drinkListContainer: {
            borderImage: "url(./drinkborder.png) 70 70 round",
            borderWidth: "30px",
            borderStyle: "solid",
            width: "80%",
            padding: "2%",
            margin:"auto",
        },
        drinkContainer: {
            textAlign: 'center' as const,
            marginTop: "5rem"
        }
    };

    const [activeCategory, setActiveCategory] = React.useState({ id: 1 });

    return (
        <Layout title="Itallap" marginTopDisabled={false}>
            <Typography variant="h1" align="center">
                ITALLAP
            </Typography>
            <Container fixed>
                <Grid container justifyContent="center">
                    {categories.map(category => {
                        const active = category.id == activeCategory.id
                        return (
                            <Grid item md={2} sm={12} xs={12} style={{ marginBottom: 10, marginLeft: 20, marginRight: 20 }}>
                                <Button key={category.id}
                                    variant="outlined"
                                    onClick={active ? () => { } : () => setActiveCategory({ id: category.id })}
                                    style={active ? classes.activeCategoryButton : classes.categoryButton}>
                                    {category.title}
                                </Button>
                            </Grid>)
                    })}
                </Grid>
            </Container>
            <Container fixed>
                <Typography align="center" variant="h3">
                    Ezekkel a finom italokkal v??runk!
                </Typography>
                <div style={classes.drinkListContainer}>
                    {drinks
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
            </Container>
        </Layout>
    )
}