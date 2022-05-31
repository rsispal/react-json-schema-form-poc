import { BadgeProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface PageLayoutProps {
  children: ReactElement | ReactElement[];
  title: string;
  badge?: BadgeProps;
  goBackRoute?: string;
}
