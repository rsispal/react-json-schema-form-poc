import { FC } from "react";
import { BrowserRouter as Router, Routes, Route, RouteProps } from "react-router-dom";

import { ROUTE__FORM, ROUTE__HOME, ROUTE__TESTBED } from "../constants/Routes.constants";

import { HomePage } from "./home";
import { FormPage } from "./form";
import { TestBedPage } from "./testbed";

export interface ApplicationRouterProps {}

const routes: RouteProps[] = [
  {
    path: ROUTE__HOME,
    element: <HomePage />,
  },
  {
    path: ROUTE__FORM,
    element: <FormPage />,
  },
  {
    path: ROUTE__TESTBED,
    element: <TestBedPage />,
  },
];
export const ApplicationRouter: FC<ApplicationRouterProps> = () => (
  <Router>
    <Routes>
      {routes.map((props, i) => (
        <Route key={i} {...props} />
      ))}
    </Routes>
  </Router>
);
