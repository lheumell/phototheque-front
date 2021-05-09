import axios from "axios";
export const deleteUser = {
  deleteUser: function(id) {
    axios
      .delete("http://localhost:9000/v1/phototheque/user/" + id, {
        headers: {
          Authorization: `Bearer ${window.localStorage.accessToken}`
        }
      })
      .then(res => {
        console.log(res.data);
        console.log("User has been deleted");
        window.location = "/dashboard";
      })
      .catch(error => {
        console.error(error);
      });
  }
};
