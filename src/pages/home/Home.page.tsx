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
    <Flex flexWrap="wrap" alignItems="flex-start" paddingTop={10}>
      <RouteCard
        title="[OPTION 1] Risk Form (React Final Form library)"
        description="The form is loaded with the version 2 risk questions and the QuestionForm uses react-final-form."
        link={Routes.ROUTE__FORM}
        audience="public"
      />

      <RouteCard
        title="[OPTION 2] Risk Form (rc-field-form library)"
        description="The form is loaded with the version 2 risk questions and the QuestionForm uses rc-field-form."
        link={Routes.ROUTE__FORM}
        audience="unavailable"
        disabled
      />

      <RouteCard
        title="[OPTION 3] Risk Form (react-jsonschema-form library)"
        description="The form is loaded with the version 2 risk questions and the QuestionForm uses react-jsonschema-form."
        link={Routes.ROUTE__FORM}
        audience="unavailable"
        disabled
      />
    </Flex>
    <Flex flexWrap="wrap" alignItems="flex-start" borderTop="1px solid #d8d8d8" marginTop={20} paddingTop={10}>
      <RouteCard
        title="Testbed"
        description="This testbed provides a basic implementation of the form with a basic schema. For development use only."
        link={Routes.ROUTE__TESTBED}
        audience="developer"
      />
    </Flex>
  </PageLayout>
);
