import { Input } from "@chakra-ui/react";
import { FC } from "react";
import { TextInputProps } from "./TextInput.types";

export const TextInput: FC<TextInputProps> = (props) => <Input {...props} />;
