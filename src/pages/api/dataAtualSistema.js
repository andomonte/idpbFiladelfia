const PegaData = async (req, res) => {
  const dataAtual = new Date();

  res.send(dataAtual);
  // console.log(error);
};
//= =========================================================================

export default PegaData;
