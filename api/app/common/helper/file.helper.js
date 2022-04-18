import fs from "fs"
import path, {dirname, resolve} from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import "dotenv/config"

export function isBase64(base64 = "") {
  const regexTest =
    /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
  return regexTest.test(base64.split(";base64,").pop());
}

export function getExtensionFromBase64(base64 = '',extentions){
  if(!extentions || extentions.length === 0)
    extentions = ['.jpeg', '.jpg', '.png', '.gif', '.xls', '.xlsx', '.ods', '.mp3', '.mp4', '.doc', '.docx', '.odt', '.pdf', '.txt', '.ppt', '.pptx'];
  const extention = `${base64}`.substring(base64.indexOf('/') + 1, base64.indexOf(';base64'));
  if(extentions.includes('.' + extention))
    return extention;
  return null;
};

export function createGuid(){
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function saveImageBase64(base64){
  const buffer = Buffer.from( base64.split(';base64,').pop(), 'base64');
  const extention = getExtensionFromBase64(base64, ['.jpeg', '.jpg', '.png', '.gif'])
  if(!extention) return null
  const fileName = createGuid() +  "." + extention;
  const pathName = path.join(__dirname, "../../../public/upload/" + fileName)
  return new Promise((resolve, reject) => {
    fs.writeFile(pathName, buffer, (err) => {
      if (err) reject(err)
    });
    resolve(process.env.PRE_IMG + fileName)
  })
  
};
