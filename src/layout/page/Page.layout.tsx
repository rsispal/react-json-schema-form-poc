import { FC } from "react";
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { PageLayoutProps } from "./Page.types";
import { Link } from "react-router-dom";

export const PageLayout: FC<PageLayoutProps> = ({
  title,
  children,
  badge,
  goBackRoute,
}) => (
  <Flex
    w="100vw"
    minH="100vh"
    h="max-content"
    flex={1}
    flexDirection="column"
    bg={useColorModeValue("gray.100", "gray.900")}
  >
    <Box bg={useColorModeValue("white", "gray.700")} px={4}>
      <Flex h={16} alignItems={"center"}>
        {goBackRoute && (
          <Box>
            <Link to={goBackRoute}>
              <IconButton
                size={"lg"}
                icon={<ChevronLeftIcon />}
                aria-label={"Back"}
              />
            </Link>
          </Box>
        )}
        <HStack spacing={8} alignItems={"center"}>
          <Heading marginRight={4}>
            {title}
            {badge && <Badge {...badge} />}
          </Heading>
        </HStack>
      </Flex>
    </Box>
    <Flex flex={1} flexDirection="column" padding={4} paddingTop={8}>
      {children}
    </Flex>
  </Flex>
);
