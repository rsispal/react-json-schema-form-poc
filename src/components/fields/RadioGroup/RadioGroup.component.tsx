import { RadioGroup as ChakraRadioGroup, Radio, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { RadioGroupProps } from "./RadioGroup.types";

export const RadioGroup: FC<RadioGroupProps> = ({ options, ...rest }) => (
  <ChakraRadioGroup {...rest}>
    <Stack>
      {options.map(({ label, ...rest }, i) => (
        <Radio key={i} {...rest}>
          {label}
        </Radio>
      ))}
    </Stack>
  </ChakraRadioGroup>
);
