const handler = async (req, res) => {
  //  let respPagamento;
  // res.status(200).send('OK');

  const { musicas } = req.body;
  const hora = new Date().getHours();

  let chave = process.env.YOUTUBE_API_KEY2;
  if (hora >= 20 && hora < 4) chave = process.env.YOUTUBE_API_KEY;
  if (hora >= 4 && hora < 8) chave = process.env.YOUTUBE_API_KEY3;
  if (hora >= 8 && hora < 12) chave = process.env.YOUTUBE_API_KEY4;
  if (hora >= 12 && hora < 16) chave = process.env.YOUTUBE_API_KEY5;
  if (musicas) {
    try {
      const YOUTUBE_PLAYLIST_ITEMS_API =
        'https://www.googleapis.com/youtube/v3/search';

      const result = await fetch(
        `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=2&index=1&key=${chave}&type=video&q=${musicas}`,
      );
      const data = await result.json();
      res.status(200).send(data);
    } catch (errors) {
      console.log(errors);
      res.status(400).send('vou criar o banco');
    }
  }
};
//= =========================================================================

export default handler;
