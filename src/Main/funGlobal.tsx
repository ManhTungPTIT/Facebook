import axios from "axios";

export function checkExpiresToken(day: string) {
  const dayExp = localStorage.getItem("expiresIn");
  if (day === dayExp) return true;
  else if (dayExp !== null && day < dayExp) return true;
  else return false;
}

export function covertDateToString(day: number) {
  const dayConvert = new Date(day);
  console.log(dayConvert.toString());
  return dayConvert.toString();
}

export function callAccessTokenNew() {
  const refreshToken = localStorage.getItem("refreshToken");
  const user = localStorage.getItem("user");
  const userObject = JSON.parse(user || "");
  const request = {
    refreshToken: refreshToken,
    userId: userObject.id,
  };
  console.log("run");
  axios
    .post(`http://localhost:8080/user/refreshToken`, request, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("acessToken", res.data.accessToken);
      localStorage.setItem("expiresIn", Date.now().toString());
      
    })
    .catch((err) => {
      console.log(err);
    });
}
