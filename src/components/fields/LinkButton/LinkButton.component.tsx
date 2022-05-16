import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { LinkButtonProps } from "./LinkButton.types";

export const LinkButton: FC<LinkButtonProps> = ({ label, url, target, disabled }) => (
  <Button as="a" href={url} target={target} disabled={disabled}>
    {label}
  </Button>
);
