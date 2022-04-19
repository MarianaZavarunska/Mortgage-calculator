import axios from "axios";

import { mainBackURL } from "../constants/urls";

const axiosTemplate = axios.create({
  withCredentials: true,
  baseURL: mainBackURL,
});

export default axiosTemplate;
