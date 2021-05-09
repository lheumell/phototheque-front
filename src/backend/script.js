export const script = {
  formatDate: function(date) {
    const newHour = date
      .slice(11, 16)
      .split(":")
      .join("h");

    const newDate = date
      .slice(0, 10)
      .split("-")
      .reverse()
      .join("-");

    return newDate + " à " + newHour;
  },
  getImageOfProduct() {
    return require(`/home/leo/Documents/Cours/Java/JEE/BanqueIMG/pourGIT/phototheque-front/src/assets/logo.png`);
  },
  // '/home/leo/Documents/Cours/Java/JEE/BanqueIMG/phototheque-api/PhotothequePictures/${filename}/${filename}.png`
};
