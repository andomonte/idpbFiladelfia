import Multer from 'multer';
import { google } from 'googleapis';
import nextConnect from 'next-connect';

const path = require('path');

const fs = require('fs');

/* const KEY_FILE_PATH = path.join('googleDrive.json');
const dirPath = path.join(__dirname, '../../../../public/file');
const dirPathGoogleDrive = path.join(
  __dirname,
  '../../../../public/file/googleDrive.json',
); */

const pagesDirectory = path.resolve(
  process.cwd(),
  'public/images/googleDrive.json',
);
// const pagesDirectory2 = path.resolve(process.cwd(), 'public/file');

const multer = Multer({
  storage: Multer.diskStorage({
    destination(req, file, callback) {
      callback(null, 'public/file');
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const authenticateGoogle = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: pagesDirectory,
    scopes: 'https://www.googleapis.com/auth/drive',
  });

  return auth;
};

const uploadToGoogleDrive = async (file, auth) => {
  const fileMetadata = {
    name: file.originalname,
    parents: ['1r0Igi4MUr2asI8FbbzOGXeq48Tr9OHWG'], // Change it according to your desired parent folder id
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveService = google.drive({ version: 'v3', auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id',
  });
  return response;
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, () => {
    console.log('file deleted');
  });
};

const handler = nextConnect()
  .use(multer.single('file'))
  .post(async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
      }
      const auth = authenticateGoogle();

      const response = await uploadToGoogleDrive(req.file, auth);
      deleteFile(req.file.path);

      res.status(200).send(response);
    } catch (err) {
      console.log('erro', err);
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};
export default handler;
