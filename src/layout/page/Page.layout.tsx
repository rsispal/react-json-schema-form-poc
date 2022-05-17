import { FC } from "react";
import { Badge, Flex, Heading } from "@chakra-ui/react";
import { PageLayoutProps } from "./Page.types";

export const PageLayout: FC<PageLayoutProps> = ({ title, children, badge }) => (
  <Flex w="100vw" h="100vh" flex={1} flexDirection="column" padding={4}>
    <Heading marginRight={4}>
      {title}
      {badge && <Badge {...badge} />}
    </Heading>
    <Flex paddingTop={8} flex={1} flexDirection="column">
      {children}
    </Flex>
  </Flex>
);
