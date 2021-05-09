import axios from "axios";
export const updateUser = {
  updateUser: function(user, id) {
    var postData = {
      email: user.email,
      username: user.username
    };

    let axiosConfig = {
      headers: {
        Authorization: `Bearer ${window.localStorage.accessToken}`
      }
    };
    axios
      .put(
        "http://localhost:9000/v1/phototheque/user/" + id,
        postData,
        axiosConfig
      )
      .then(function(response) {
        console.log(response);
        window.location = "/dashboard";
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
