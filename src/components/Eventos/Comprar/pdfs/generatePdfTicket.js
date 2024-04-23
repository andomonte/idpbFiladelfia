import React from 'react';
import { jsPDF, HTMLOptionImage } from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import PrintIcon from '@material-ui/icons/Print';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { Box, Button } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import { withStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import TamanhoJanela from 'src/utils/getSize';

const janela = TamanhoJanela();

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#1a237e'),
    backgroundColor: '#1a237e',
    '&:hover': {
      backgroundColor: '#1a237e',
    },
  },
}))(Button);

function GeneratePdf({ html }) {
  const router = useRouter();

  const handleClose = () => {
    router.push({
      pathname: './',
    });
  };
  const generateImage = async () => {
    //  setOpenDrawer(true);
    try {
      const data = await toJpeg(html.current, { quality: 0.95 }); // await convertDivToPng(html.current);
      if (data) {
        const link = document.createElement('a');
        link.href = data;
        link.download = 'Ticket-Convencao.jpeg';
        link.click();
      }
    } catch (error) {
      console.log(error, 'ini error sertifikat');
    }
  };

  const generatePdf = async () => {
    const image = await toPng(html.current, { quality: 0.95 });

    const doc = new jsPDF();

    doc.addImage(image, 'JPEG', 5, 22, 80, 160);
    doc.save('TicketGobal');
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
    <Box bg="#fafa">
      <Box display="flex" justifyContent="center">
        <Box
          mt={janela.height < 600 ? -8 : -10}
          display="flex"
          width="100%"
          justifyContent="center"
        >
          <Box>
            <IconButton
              onClick={generatePdf}
              style={{ color: '#780208' }}
              //              color="secondary"
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
        mt={janela.height < 600 ? -3 : -3}
        display="flex"
        width="100%"
        justifyContent="center"
      >
        <Box>
          <ColorButton
            style={{ borderRadius: 16 }}
            variant="contained"
            value="value"
            onClick={handleClose}
          >
            FECHAR
          </ColorButton>
        </Box>
      </Box>
      <Box mt={2} />
    </Box>
  );
}

export default GeneratePdf;
