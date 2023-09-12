
const getToken = () => {
  const userInfos = JSON.parse(localStorage.getItem("user"));
  return userInfos ? userInfos.token : null;
};
const getAdminInfos = async () => {
  const res = await fetch(`http://localhost:4000/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  
  const admin = await res.json()

  return admin
};

export {
    getAdminInfos,getToken
}
