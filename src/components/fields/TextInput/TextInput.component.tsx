import { Input } from "@chakra-ui/react";
import { FC } from "react";
import { TextInputProps } from "./TextInput.types";

export const TextInput: FC<TextInputProps> = ({ dataTestId, ...rest }) => (
  <Input data-testid={dataTestId} {...rest} />
);
