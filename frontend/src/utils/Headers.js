import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' });
function get_method() {
  const config = {
    withCredentials: true,
    "Authorization": "Bearer " + cookies.get('tdoken'),
    "Cookie": cookies.get('tdoken'),
  };
  return config;
}
function others_method() {

  const config = {
    withCredentials: true,

    headers: {
      "Authorization": "Bearer " + cookies.get('tdoken'),
      "Content-Type": "application/json",
      "Cookie": cookies.get('tdoken'),
    },
  };
  return config;
}
function others_multiform_method() {
  const config = {
    withCredentials: true,

    headers: {
      "Authorization": "Bearer " + cookies.get('tdoken'),
      "Content-Type": "multipart/form-data",
      "Cookie": cookies.get('tdoken'),
    },
  };
  return config;
}

export { get_method, others_method, others_multiform_method };
