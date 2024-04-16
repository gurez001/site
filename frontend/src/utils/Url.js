function client_url() {
  return 'http://localhost:8000';
}
function server_url() {
  // return 'http://localhost:8000';
  return process.env.NODE_ENV === 'production' ? 'http://164.52.192.47:8000' : 'http://localhost:8000';
  // return 'https://new-live-gurez.onrender.com' 
  // return 'https://new-live-git-main-gurez001s-projects.vercel.app' 
  // return 'http://localhost:3000';
}

export {client_url,server_url};
