import { Typography, Button } from '@material-ui/core'
import Layout from 'components/layout'
import { withSessionSsr } from "lib/with-session";




export const getServerSideProps = withSessionSsr();

export default function Feed({user}) {
    return (
        <Layout title="Galléria" marginTopDisabled={false}>
            <div>
                <Typography variant="h1" align="center" gutterBottom>
                    Feed
                </Typography>
                {user ? 'logged in as ' + user.name : 'logged out'}
            </div>
        </Layout>
    )
}