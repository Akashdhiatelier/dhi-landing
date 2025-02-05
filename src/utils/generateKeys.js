const generateKey = (pre) => {
  let key = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" +
    String(pre);
  const charactersLength = characters.length;
  for (let i = 0; i < 32; i++) {
    key += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return key;
};

export default generateKey;
