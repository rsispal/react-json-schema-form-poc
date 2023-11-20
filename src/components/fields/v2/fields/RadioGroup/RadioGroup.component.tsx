import {
  RadioGroup as ChakraRadioGroup,
  Radio,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { RadioGroupProps } from "./RadioGroup.types";

export const RadioGroup: FC<RadioGroupProps> = ({
  options,
  dataTestId,
  ...rest
}) => (
  <ChakraRadioGroup data-testid={dataTestId} {...rest}>
    <Stack>
      {options.map(({ label, ...rest }, i) => (
        <Radio key={i} {...rest}>
          <Text fontWeight={600}>{label}</Text>
        </Radio>
      ))}
    </Stack>
  </ChakraRadioGroup>
);
