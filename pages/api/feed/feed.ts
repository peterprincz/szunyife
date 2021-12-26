import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'types/data-types';
import { withSessionRoute } from 'lib/with-session';



export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user: User = req.session.user;
        if(user){
            res.status(200).json({message:"logged_in"});
        } else {
            res.status(400).json({message:"logged_out"});
        }
    } catch (error) {
        res.status(500).json({message:"error"});
    }
}