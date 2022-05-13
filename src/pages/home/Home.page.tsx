import { Button, Flex, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../constants";
import { HomePageProps } from "./Home.types";

export const HomePage: FC<HomePageProps> = () => {
  const navigate = useNavigate();

  return (
    <Flex w="100vw" h="100vh" flex={1} flexDirection="column" padding={4}>
      <Heading>Home Page</Heading>
      <Flex>
        <Button size="lg" marginTop={20} onClick={() => navigate(Routes.ROUTE__FORM)}>
          Go to form
        </Button>
      </Flex>
    </Flex>
  );
};
