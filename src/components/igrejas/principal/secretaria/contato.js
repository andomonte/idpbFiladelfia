import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { Box, Typography } from '@material-ui/core';
import SvgIcon from '@mui/material/SvgIcon';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import Avatar from '@mui/material/Avatar';
// import { useRouter } from 'next/router';
import corIgreja from 'src/utils/coresIgreja';
import { FaFacebook, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  img: {
    maxWidth: '1110px',
    maxHeight: '544px',
    width: '100%',
    height: 'auto',
  },
}));

const contato = ({ userIgrejas }) => {
  const classes = useStyles();
  // somente letras  const zapOnlyLetters = userIgrejas[0].contatoWhatsApp.replace(/[^a-z]+/gi, '').split('');
  const zapOnlyNumber = userIgrejas[0].contatoWhatsApp.replace(/\D/g, '');
  const whatsApp = `https://wa.me/55${zapOnlyNumber}`;

  const telSecretaria = `tel:${userIgrejas[0].foneSecretaria}`;
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      minHeight={570}
      minWidth={300}
      bgcolor={corIgreja.principal}
      height="calc(100vh - 56px)"
    >
      <Box
        mt={0.5}
        width="96%"
        height="97%"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        borderRadius={16}
        ml={0}
        bgcolor="#fafafa"
      >
        <Hidden smDown>
          <Box display="flex" justifyContent="center">
            <Box
              mt={5}
              ml={2}
              sx={{
                fontSize: '22px',
                color: '#000',
                fontFamily: 'Arial Black',
                fontWeight: 'bold',
              }}
            >
              Nossos Contatos:
            </Box>
          </Box>
          <Box flexDirection="column" display="flex" justifyContent="center">
            <Box
              display="flex"
              mt={5}
              ml={10}
              sx={{ color: '#000', fontSize: '22px' }}
            >
              <Box>
                <Avatar style={{ background: '#b91030' }}>
                  <SvgIcon sx={{ color: '#fff' }}>
                    <CallIcon />
                  </SvgIcon>
                </Avatar>
              </Box>
              <Box ml={2} mt={-0.8}>
                Secretaria
                <Typography
                  variant="body1"
                  display="block"
                  gutterBottom
                  align="left"
                  className={classes.caption}
                >
                  <a href={telSecretaria}>{userIgrejas[0].foneSecretaria}</a>

                  {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                   */}
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              mt={5}
              ml={10}
              sx={{ color: '#000', fontSize: '22px' }}
            >
              <Box>
                <FaWhatsapp size={40} color="green" />
              </Box>

              <Box ml={2} mt={-0.7}>
                WhatsApp
                <Typography
                  variant="body1"
                  display="block"
                  gutterBottom
                  align="left"
                  className={classes.caption}
                >
                  <a href={whatsApp}>{userIgrejas[0].contatoWhatsApp}</a>
                  {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                   */}
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              mt={5}
              ml={10}
              sx={{ color: '#000', fontSize: '22px' }}
            >
              <Box>
                <FaFacebook size={40} color="blue" />
              </Box>
              {userIgrejas[0].faceBook ? (
                <Box ml={2} mt={-0.7}>
                  FaceBook
                  <Typography
                    variant="body1"
                    display="block"
                    gutterBottom
                    align="left"
                    className={classes.caption}
                  >
                    <a href={userIgrejas[0].faceBook}>ir para a página</a>
                    {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                     */}
                  </Typography>
                </Box>
              ) : null}
            </Box>
            <Box
              display="flex"
              mt={5}
              ml={10}
              sx={{ color: '#000', fontSize: '22px' }}
            >
              <Box>
                <FaYoutube size={40} color="red" />
              </Box>
              {userIgrejas[0].faceBook ? (
                <Box ml={2} mt={-0.7}>
                  You Tube
                  <Typography
                    variant="body1"
                    display="block"
                    gutterBottom
                    align="left"
                    className={classes.caption}
                  >
                    <a href={userIgrejas[0].youTube}>ir para o Canal</a>
                    {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                     */}
                  </Typography>
                </Box>
              ) : null}
            </Box>
            <Box
              display="flex"
              mt={5}
              ml={10}
              sx={{ color: '#000', fontSize: '22px' }}
            >
              <Box>
                <img
                  src="/images/instagram.svg"
                  height={25}
                  width={25}
                  alt="brasil"
                />
              </Box>
              {userIgrejas[0].faceBook ? (
                <Box ml={2} mt={-0.7}>
                  Instagram
                  <Typography
                    variant="body1"
                    display="block"
                    gutterBottom
                    align="left"
                    className={classes.caption}
                  >
                    <a href={userIgrejas[0].youTube}>ir para o Pagina</a>
                    {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                     */}
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Hidden>
        <Hidden smUp>
          <Box display="flex" justifyContent="center">
            <Box
              mt={5}
              ml={2}
              sx={{
                fontSize: '22px',
                color: '#000',
                fontFamily: 'Arial Black',
                fontWeight: 'bold',
              }}
            >
              Nossos Contatos:
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Box
              display="flex"
              justifyContent="start"
              ml={10}
              mt={5}
              sx={{ color: '#000', fontSize: '22px' }}
            >
              <Box>
                <Avatar style={{ background: '#b91030' }}>
                  <SvgIcon sx={{ color: '#fff' }}>
                    <CallIcon />
                  </SvgIcon>
                </Avatar>
              </Box>
              <Box ml={2} mt={-0.8}>
                Secretaria
                <Typography
                  variant="body1"
                  display="block"
                  gutterBottom
                  align="left"
                  className={classes.caption}
                >
                  <a href={telSecretaria}>{userIgrejas[0].foneSecretaria}</a>

                  {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                   */}
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="start"
              ml={10}
              mt={5}
              sx={{ color: '#000', fontSize: '22px' }}
            >
              <Box>
                <Box>
                  <FaWhatsapp size={40} color="green" />
                </Box>
              </Box>

              <Box ml={2} mt={-0.7}>
                WhatsApp
                <Typography
                  variant="body1"
                  display="block"
                  gutterBottom
                  align="left"
                  className={classes.caption}
                >
                  <a href={whatsApp}>{userIgrejas[0].contatoWhatsApp}</a>
                  {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                   */}
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              justifyContent="start"
              ml={10}
              mt={5}
              sx={{ color: '#000', fontSize: '22px' }}
            >
              <Box>
                <FaFacebook size={40} color="blue" />
              </Box>
              {userIgrejas[0].faceBook ? (
                <Box ml={2} mt={-0.7}>
                  FaceBook
                  <Typography
                    variant="body1"
                    display="block"
                    gutterBottom
                    align="left"
                    className={classes.caption}
                  >
                    <a href={userIgrejas[0].faceBook}>ir para a página</a>
                    {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                     */}
                  </Typography>
                </Box>
              ) : null}
            </Box>
            <Box
              display="flex"
              mt={5}
              ml={10}
              sx={{ color: '#000', fontSize: '22px' }}
            >
              <Box>
                <FaYoutube size={40} color="red" />
              </Box>
              {userIgrejas[0].faceBook ? (
                <Box ml={2} mt={-0.7}>
                  You Tube
                  <Typography
                    variant="body1"
                    display="block"
                    gutterBottom
                    align="left"
                    className={classes.caption}
                  >
                    <a href={userIgrejas[0].youTube}>ir para o Canal</a>
                    {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                     */}
                  </Typography>
                </Box>
              ) : null}
            </Box>
            <Box
              display="flex"
              mt={5}
              ml={10}
              sx={{ color: '#000', fontSize: '22px' }}
            >
              <Box>
                <img
                  src="/images/instagram.svg"
                  height={25}
                  width={25}
                  alt="brasil"
                />
              </Box>
              {userIgrejas[0].faceBook ? (
                <Box ml={2} mt={-0.7}>
                  Instagram
                  <Typography
                    variant="body1"
                    display="block"
                    gutterBottom
                    align="left"
                    className={classes.caption}
                  >
                    <a href={userIgrejas[0].youTube}>ir para o Pagina</a>
                    {/*                 {userIgrejas[0].foneSecretaria ?? userIgrejas[0].foneSecretaria}
                     */}
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Hidden>
      </Box>
    </Box>
  );
};

export default contato;
