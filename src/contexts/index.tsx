import { FC, ReactElement } from "react";
import { UIContextProvider } from "./ui";

export interface ProvidersProps {
  children?: ReactElement;
}

export const Providers: FC<ProvidersProps> = ({ children }) => <UIContextProvider>{children}</UIContextProvider>;
