import { RadioProps, RadioGroupProps as ChakraRadioGroupProps } from "@chakra-ui/react";

type RadioButtonProps = RadioProps & { label: string };
export interface RadioGroupProps extends Omit<ChakraRadioGroupProps, "children"> {
  value?: string;
  onChange: (selected: string) => void;
  options: RadioButtonProps[];
}
