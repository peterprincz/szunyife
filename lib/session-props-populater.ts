import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

export default async function defaultSessionPropsPopulater<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
    context: GetServerSidePropsContext, 
    extraHandler?: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>) {
    var ssrProps:any = {}
    if(extraHandler){
        ssrProps = await extraHandler(context);
    }
    ssrProps.props = ssrProps.props ? ssrProps.props : {}
    //User is not logged in
    if(!context.req.session || !context.req.session.user){
        ssrProps.props.user = null;
        //redirect to login if not already on login page
        if(context.resolvedUrl !== "/login"){
            ssrProps.redirect = {
                destination: '/login',
                permanent: false
            }
        } else {
            ssrProps.redirect = {
                destination: '/feed',
                permanent: false
            }
        }
        return ssrProps;
    }
    ssrProps.props.user = context.req.session.user;
    return ssrProps;
}