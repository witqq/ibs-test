import Axios, {AxiosRequestConfig} from "axios";
import {appStore} from "../app";
import {API_PATH} from "../../share/constants";
import {Claim} from "../../share/data/interfaces/claim";

Axios.defaults.baseURL = API_PATH;

Axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.config.silent) {
    return Promise.reject(error);
  }
  const message = error.response.data && error.response.data.message;
  if (message) {
    appStore.snackBarStore.setMessage(message);
  }
  else if (error.message) {
    appStore.snackBarStore.setMessage(error.message);
  }
  return Promise.reject(error);
});

export interface WithMessage {
  message: string
}

export interface WithEmail {
  email: string;
}

export interface MyRequestConfig {
  silent?: boolean;
}

export class Api {

  private static post<T>(url: string, args): Promise<T> {
    return Axios.post(url, args).then(res => res.data);
  }

  private static Get<T>(url: string, myConfig?: MyRequestConfig): Promise<T> {
    return Axios.get(url, myConfig as AxiosRequestConfig).then(res => res.data)
  }


  private static put<T>(url: string, args): Promise<T> {
    return Axios.put(url, args).then(res => res.data);
  }


  public static test() {
    return this.Get<WithMessage>("test");
  }

  public static getClaims() {
    return this.Get<Array<Claim>>("claims");
  }

  public static saveClaim(claim: Claim) {
    if (!claim.id){
      return this.post<Claim>("claim", claim);
    }
    return this.put<Claim>(`claim/${claim.id}`, claim);
  }
}