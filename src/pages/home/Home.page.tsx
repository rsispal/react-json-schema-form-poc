/* Libraries */
import { FC } from "react";
import { Flex } from "@chakra-ui/react";

/* Components */
import { RouteCard } from "../../components/RouteCard";

/* Constants */
import { Routes } from "../../constants";

/* Layouts */
import { PageLayout } from "../../layout/page/Page.layout";

/* Types */
import { HomePageProps } from "./Home.types";

export const HomePage: FC<HomePageProps> = () => (
  <PageLayout title="Home">
    <Flex>
      <RouteCard
        title="Testbed"
        description="This testbed provides a basic implementation of the form with a basic schema. For development use only."
        link={Routes.ROUTE__TESTBED}
        audience="developer"
      />

      <RouteCard
        title="Risk Form (React Final Form library)"
        description="The form is loaded with the version 2 risk questions."
        link={Routes.ROUTE__FORM}
        audience="public"
      />

      <RouteCard
        title="Risk Form (rc-field-form library)"
        description="The form is loaded with the version 2 risk questions."
        link={Routes.ROUTE__FORM}
        audience="unavailable"
        disabled
      />
    </Flex>
  </PageLayout>
);
