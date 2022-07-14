import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { SubmitButtonProps } from "./SubmitButton.types";

export const SubmitButton: FC<SubmitButtonProps> = ({
  label,
  disabled,
  dataTestId,
  ...rest
}) => (
  <Button type="submit" disabled={disabled} data-testid={dataTestId} {...rest}>
    {label}
  </Button>
);
