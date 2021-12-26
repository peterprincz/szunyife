import type { NextApiRequest, NextApiResponse } from 'next'
import authService from 'lib/auth-service';
import { withSessionRoute } from 'lib/with-session'
import { User } from 'types/data-types';

export default withSessionRoute(loginRoute)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = await req.body
    try {
        const user: User = authService.authenticate(username, password)
        req.session.user = user
        await req.session.save()
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message })
    }
}