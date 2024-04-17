import driveService from 'src/utils/driveService';

const fs = require('fs');

const uploadFile = async (req, res) => {
  // const image = req.file;
  const image = req.body;

  try {
    // as the file name stored is gibberish with no extension, that file is replaced by the original filename
    await fs.promises.rename(
      `${image.destination}/${image.filename}`,
      `${image.destination}/${image.originalname}`,
    );

    const metaData = {
      name: image.originalname.substring(
        0,
        image.originalname.lastIndexOf('.'),
      ),
      parents: [process.env.FOLDER_ID], // the ID of the folder you get from createFolder.js is used here
    };

    const media = {
      mimeType: image.mimeType,
      body: fs.createReadStream(`${image.destination}/${image.originalname}`), // the image sent through multer will be uploaded to Drive
    };

    // uploading the file
    const response = await driveService.files.create({
      resource: metaData,
      media,
      fields: 'id',
    });

    res.send(response);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

/* const getAllFiles = async (req, res) => {
  try {
    const q = `'${process.env.FOLDER_ID}' in parents`;
    const response = await driveService.files.list({
      q, // comment this if you want all possible files
      fields: 'files(id, name)',
    });
    res.send(response.data);
  } catch (err) {
    res.send(err);
  }
};

const deleteFile = async (req, res) => {
  const { fileId } = req.body; // the file to delete
  const response = await driveService.files.delete({
    fileId,
    parentId: `${process.env.FOLDER_ID}`,
  });
  res.send(response);
};

const updateFile = async (req, res) => {
  try {
    const image = req.file; // the file to replace with
    const { fileId } = req.body; // the file to be replaced
    await fs.promises.rename(
      `${image.destination}/${image.filename}`,
      `${image.destination}/${image.originalname}`,
    );
    const media = {
      mimeType: image.mimeType,
      body: fs.createReadStream(`${image.destination}/${image.originalname}`), // the image sent through multer will be uploaded to Drive
    };

    const response = await driveService.files.update({
      resource: { name: image.originalname },
      addParents: `${process.env.FOLDER_ID}`,
      fileId,
      media,
      fields: 'id',
    });

    res.send(response);
  } catch (err) {
    res.send(err);
  }
}; */
export default uploadFile;
