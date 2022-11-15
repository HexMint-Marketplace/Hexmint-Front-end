import jwtDecode from "jwt-decode";

const setAccessToken = (value) => {
  localStorage.setItem("token", value);
  console.log("token set in local storage");
};

const getAccessToken = () => {
  return localStorage.getItem("token");
};

const removeAccessToken = () => {
  localStorage.removeItem("token");
}

// const getAuth = () => {
//   const jwt = localStorage.getItem("AccessToken");

//   try {
//     const user = jwtDecode(jwt);
//     console.log("user :", user);
//     return user;
//   } catch (err) {
//     return null;
//   }
// }

export default {
  setAccessToken,
  getAccessToken,
  removeAccessToken,

};
