import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), "data")

function readJson(fileName) {
  const file = path.join(dataDirectory, `${fileName}.json`)
  const rawData = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
  return JSON.parse(rawData);
}

export function getIndexData() {
  const indexData = readJson("indexData");
  return indexData;
}

export function getDrinkData() {
  const drinkData = readJson("drinkData");
  return drinkData;
}

export function getConf() {
  const config = readJson("conf");
  return config;
}


export function getPosts() {
  const posts = readJson("postsData");
  return posts;
}


export function getAlbums() {
  const posts = readJson("albumData");
  return posts;
}
