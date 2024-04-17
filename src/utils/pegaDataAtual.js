import axios from 'axios';

export default async function PegarData() {
  try {
    const url = `${window.location.origin}/api/dataAtualSistema`;
    const res = await axios.post(url);

    if (res.data && res.data.length) {
      return res.data;

      // setArray
    }
  } catch (err) {
    console.log(err);
    return err;
  }
}
