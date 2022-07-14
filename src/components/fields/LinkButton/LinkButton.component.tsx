import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { LinkButtonProps } from "./LinkButton.types";

export const LinkButton: FC<LinkButtonProps> = ({
  label,
  url,
  target,
  disabled,
  onClickCallback,
  dataTestId,
  ...rest
}) => (
  <Button
    as="a"
    href={url}
    target={target}
    disabled={disabled}
    width={"fit-content"}
    onClick={() => onClickCallback(url)}
    textTransform="uppercase"
    data-testid={dataTestId}
    {...rest}
  >
    {label}
  </Button>
);
