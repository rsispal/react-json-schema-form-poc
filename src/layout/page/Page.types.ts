import { BadgeProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface PageLayoutProps {
  children: ReactElement;
  title: string;
  badge?: BadgeProps;
}
