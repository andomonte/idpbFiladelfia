import nc from 'next-connect';
// import connectToDatabase from 'src/utils/mongodb';
import upload from 'src/utils/upload';

const handler = nc()
  .use(upload.single('file'))
  .post((req, res) => {
    res.json({ Arquivo: 'Arquivado com sucesso' });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
