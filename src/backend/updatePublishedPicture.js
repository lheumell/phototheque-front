import axios from "axios";
export const updatePublishedPicture = {
  updatePublishedPicture: function(param, id) {
    var postData = {
      isPublished: param
    };

    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.accessToken}`
      }
    };
    axios
      .patch(
        "http://localhost:9000/v1/phototheque/image/update/" + id,
        postData,
        axiosConfig
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
