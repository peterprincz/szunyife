import { EmblaOptionsType } from "embla-carousel-react"

export type IndexData = {
    video: {
        title: string,
        subTitle: string,
        videoSource: string
    },
    introduction: {
        title: string,
        subTitle: string
    },
    cards:
    {
        id: number,
        image: string,
        title: string,
        textTitle: string,
        text: string
    }[],
    quotePart: {
        text: string,
        quotes: Quote[]
    },
    photos: Photo[]
}

export type Quote = {
    id: number
    text: string
    author: string
}

export type Photo = {
    id: number,
    src: string
}

export type DrinkData = {
    categories: [{
        id: number,
        title: string
    }],
    drinks: {
        id: number,
        title: string,
        description: string,
        price: string,
        categoryId: number
    }[]
}

export type GalleryData = {
    albums:
    {
        id: number,
        title: string,
        desc: string,
        photos: Photo[]
    }[]
}

export type FeedData = {
    feedPosts:FeedPost[]
}

export type FeedPost = {
    createdAt: Date,
    authorId: number,
    images?:Photo[],
    content:string,
    comments: FeedComment[],
    likeUserIds:number[]
}

export type FeedComment = {
    createdAt: Date,
    authorId: number,
    image:Photo,
    content:string,
}

export type User = {
    id:number,
    username:string
    password:string
    name:string,
    reqDate: Date
}

export type PostsData = {
    posts:
    {
        id: number,
        date: Date,
        title: string,
        body: string,
        image: Photo
    }[]
}

export type AlbumProperties = {
    albumTitle: string,
    albumDesc: string,
    previewPhoto: Photo,
    photos: Photo[]
}

export type BackgroundVideoProperties = {
    videoSource: string,
    children: any[],
    blur: number
}

export type CardImageProperties = {
    children?: never[],
    title: string,
    image: string,
    textTitle: string,
    text: string
}

export type CarouselProperties = {
    photos: Photo[],
    options?: EmblaOptionsType
}

export type HeaderProperties = {
    title: string,
    drawerItems:
    {
        id: number,
        title: string,
        items: string[]
        url?: string
    }[],
    menus:
    {
        title: string,
        url: string
    }[]
}

export enum SocketEventType {
    CONNECTION = "CONNECTION",
    SONG_REQUEST = "SONG_REQUEST",
    SONG_ACCEPTED = "SONG_ACCEPTED",
    CHANGE_VOLUME = "CHANGE_VOLUME",
    HEARTHBEAT = "HEARTHBEAT",
    SUCCESSFULL_OPERATION = "SUCCESSFULL_OPERATION",
    ERROR = "ERROR",
    SPEECH = "SPEECH"
}

export enum SocketChannels {
    MACHINES = "MACHINES",
    CLIENTS = "CLIENTS"
}