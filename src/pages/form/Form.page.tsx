import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { FormPageProps } from "./Form.types";

export const FormPage: FC<FormPageProps> = () => (
  <Box w="100vw" h="100vh">
    <Heading>Form Page</Heading>
  </Box>
);
