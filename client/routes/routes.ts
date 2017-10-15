import {RouteProps} from "react-router";
import {Home} from "./home/home";
import {SecondRoute} from "./second-route/second-route";

export interface AppRoute extends RouteProps {
  key: string;
}

export type Routes = Array<AppRoute>;

export const AppRoutes: Routes = [
  {
    key: "secondRoute",
    path: "/secondRoute",
    component: SecondRoute
  },
  {
    path: "/",
    component: Home,
    key: "home",
    exact: true
  }
];