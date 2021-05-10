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
  getImageOfProduct(filename) {
    return require(`${process.env.VUE_APP_PATH_IMAGES}/${filename}/${filename}.png`);
  },
  // /home/leo/Documents/Cours/Java/JEE/BanqueIMG/phototheque-api/src/main/resources/ProcessedPictures/${filename}/${filename}.png
  // '/home/leo/Documents/Cours/Java/JEE/BanqueIMG/phototheque-api/PhotothequePictures/${filename}/${filename}.png`
};
