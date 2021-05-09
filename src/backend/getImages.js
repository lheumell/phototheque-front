import axios from "axios";
export const getImages = {
  getImages: function() {
    //   const params = 'grrr'
    // return params;
    axios
      .get("http://localhost:9000/v1/phototheque/images?is_published=true", {
        headers: {
          Authorization: `Bearer ${window.localStorage.accessToken}`
        }
      })
      .then(res => {
        console.log(res.data);
        const params = res.data[0].filename;
        console.log(params);

        return params;
      })
      .catch(error => {
        console.error(error);
      });
  }
};

// export { getImages };
