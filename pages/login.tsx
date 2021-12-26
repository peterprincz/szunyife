import Router from 'next/router'
import { Typography, Button } from '@material-ui/core'
import Layout from 'components/layout'
import { withSessionSsr } from "lib/with-session";

const getLoginButtonMessage = () => {
    return {
        props: {
            text: "login"
        }
    }
}

export const getServerSideProps = withSessionSsr(getLoginButtonMessage);

export default function Login({user, text}) {

    const classes = {
        loginButton: {
            backgroundColor: "red",
            color: "white"
        }
    }

    const login = () => {
        fetch("api/auth/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName: "username", password: "pw" }),
        }).then(resp => Router.push("/feed"))
            .catch(console.error)
    }


    return (
        <Layout title="Bejelentkezés" marginTopDisabled={false}>
            <div>
                <Typography variant="h1" align="center" gutterBottom>
                    {text}
                </Typography>
                <Button style={classes.loginButton} onClick={() => login()}>Login</Button>
            </div>
        </Layout>
    )
}