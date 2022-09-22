const API_BASE_URL = ()=>  "http://localhost:8000";
//const API_BASE_URL = ()=>  "http://3.140.247.61";
const ACCESS_TOKEN =()=> sessionStorage.getItem('quadranttoken');
 export default {API_BASE_URL, ACCESS_TOKEN}