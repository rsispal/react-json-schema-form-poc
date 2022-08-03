import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { NextQuestionButtonProps } from "./NextQuestionButton.types";

export const NextQuestionButton: FC<NextQuestionButtonProps> = ({
  label,
  disabled,
  onClickCallback,
  dataTestId,
  ...rest
}) => (
  <Button
    as="a"
    disabled={disabled}
    width={"fit-content"}
    onClick={disabled ? undefined : onClickCallback}
    textTransform="uppercase"
    data-testid={dataTestId}
    {...rest}
  >
    {label}
  </Button>
);
