import fs from 'fs'
import path from 'path'
import { DrinkData, GalleryData, IndexData, PostsData } from '../types/dataTypes';

const dataDirectory:string = path.join(process.cwd(), "data")

function readJson(fileName:string):any {
  const filePath:string = path.join(dataDirectory, `${fileName}.json`)
  const rawData:string = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
  return JSON.parse(rawData);
}

export function getIndexData():IndexData {
  const indexData:IndexData = readJson("indexData");
  return indexData;
}

export function getDrinkData():DrinkData {
  const drinkData:DrinkData = readJson("drinkData");
  drinkData.drinks.forEach((drink, i) => drink.id = i);
  return drinkData;
}

export function getConf() {
  const config = readJson("conf");
  return config;
}


export function getPosts():PostsData {
  const posts:PostsData = readJson("postsData");
  return posts;
}


export function getAlbums():GalleryData {
  const galleryData:GalleryData = readJson("albumData");
  galleryData.albums.forEach((album, i) => album.id = i);
  var photoIdCounter:number = 0;
  galleryData.albums.forEach((album) => album.photos.forEach(photo => photo.id = ++photoIdCounter));
  return galleryData;
}
