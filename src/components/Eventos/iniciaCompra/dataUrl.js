// To convert dataUrl (which we get from our blob) to a a file object
export default function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n > 0) {
    u8arr[n] = bstr.charCodeAt(n);
    n -= 1;
  }

  return new File([u8arr], filename, { type: mime });
}
