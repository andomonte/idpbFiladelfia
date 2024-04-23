import React from 'react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import PrintIcon from '@material-ui/icons/Print';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Box, Button } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
// import PesquisaCPF from 'src/components/Evento/iniciarCompa/pesquisaCPF';
import { withStyles } from '@material-ui/core/styles';
import TamanhoJanela from 'src/utils/getSize';
import { useRouter } from 'next/router';
import PesquisaCPF from 'src/components/Eventos/iniciaCompra/ticket';

const janela = TamanhoJanela();
// import Drawer from '@material-ui/core/Drawer';
/* import {
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share'; */

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#1a237e'),
    backgroundColor: '#1a237e',
    '&:hover': {
      backgroundColor: '#1a237e',
    },
  },
}))(Button);

function GeneratePdf({ html, cpf }) {
  const [openTicket] = React.useState(false);
  const router = useRouter();
  // const [openDrawer, setOpenDrawer] = React.useState(false);

  /* const convertDivToPng = async (div) => {
    const data = await toJpeg(div, {
      cacheBust: true,
      canvasWidth: janela.width + 100,
      canvasHeight: janela.height + 300,
    });
    return data;
  }; */
  const gerarTicket = () => {
    router.push({
      pathname: './meuTicket',
      query: {
        cpf,
      },
    });
    // setOpenTicket(true);
  };
  const generateImage = async () => {
    //  setOpenDrawer(true);
    try {
      const data = await toPng(html.current, { quality: 0.95 }); // await convertDivToPng(html.current);
      if (data) {
        const link = document.createElement('a');
        link.href = data;
        link.download = 'comprovante-Convencao.jpeg';
        link.click();
      }
    } catch (error) {
      console.log(error, 'ini error sertifikat');
    }
  };

  const generatePdf = async () => {
    const image = await toPng(html.current, { quality: 0.95 });
    // const image = document.getElementById('image').getAttribute('src');
    // const JsPDF = jsPDF();
    const doc = new jsPDF();

    doc.addImage(image, 'JPEG', 5, 22, 80, 120);
    doc.save();
  };

  //= ==============================================================
  // imprimir
  const handlePrint = useReactToPrint({
    content: () => html.current,
  });
  //= ==================================================================

  //= ==============================================================
  // Baixar PDF

  //= ==================================================================

  return (
    <Box width="100%">
      {!openTicket ? (
        <Box width="100%">
          <Box width="100%" display="flex" justifyContent="center">
            <Box
              mt={janela.height > 600 ? 0 : 0}
              height="100%"
              display="flex"
              width="100%"
              bgcolor="white"
              justifyContent="center"
            >
              <Box>
                <IconButton
                  onClick={generatePdf}
                  style={{ color: '#780208' }}
                  aria-label="add to shopping cart"
                >
                  <PictureAsPdfIcon />
                </IconButton>
              </Box>

              <Box ml={6}>
                <IconButton
                  onClick={handlePrint}
                  color="secondary"
                  aria-label="add to shopping cart"
                >
                  <PrintIcon />
                </IconButton>
              </Box>

              <Box ml={6}>
                <IconButton
                  onClick={generateImage}
                  color="primary"
                  aria-label="add to shopping cart"
                >
                  <ImageIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box
            mt={janela.height > 600 ? 2 : 0}
            ml={janela.height > 600 ? 0 : 0}
            width="100%"
          >
            <Box mt={5} display="flex" justifyContent="center">
              <ColorButton
                style={{
                  borderRadius: 16,
                  background: '#ffdd55',
                  color: 'black',
                  fontFamily: 'Fugaz One',
                }}
                variant="contained"
                value="value"
                onClick={gerarTicket}
              >
                Gerar Credencial
              </ColorButton>
            </Box>
          </Box>
        </Box>
      ) : (
        <PesquisaCPF cpf={cpf} />
      )}
    </Box>
  );
}

export default GeneratePdf;
