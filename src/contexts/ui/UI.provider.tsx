import { ChakraProvider } from "@chakra-ui/react";
import { FC, ReactElement } from "react";

interface UIContextProviderProps {
  children?: ReactElement;
}
export const UIContextProvider: FC<UIContextProviderProps> = ({ children }) => <ChakraProvider>{children}</ChakraProvider>;
