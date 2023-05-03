import { FC } from "react";
import { BrowserRouter as Router, Routes, Route, RouteProps } from "react-router-dom";

import { ROUTE__FORM, ROUTE__HOME, ROUTE__RISK_QUESTIONS, ROUTE__TESTBED } from "../constants/Routes.constants";

import { HomePage } from "./home";
import { RiskQuestionsPage } from "./risk-questions-page";
import { FormPage } from "./form";
import { TestBedPage } from "./testbed";

export interface ApplicationRouterProps {}

const routes: RouteProps[] = [
  {
    path: ROUTE__HOME,
    element: <HomePage />,
  },
  {
    path: ROUTE__RISK_QUESTIONS,
    element: <RiskQuestionsPage />,
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
