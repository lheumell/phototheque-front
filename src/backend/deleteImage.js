import axios from "axios";
export const deleteImage = {
  deleteImage: function(id) {
    axios
      .delete("http://localhost:9000/v1/phototheque/image/" + id, {
        headers: {
          Authorization: `Bearer ${window.localStorage.accessToken}`
        }
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
