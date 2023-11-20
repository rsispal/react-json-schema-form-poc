import { FC } from "react";
import { Text } from "@chakra-ui/react";
import { DynamicText } from "components/DynamicText";
import { SectionBlockProps } from "./SectionBlock.types";

export const SectionBlock: FC<SectionBlockProps> = ({
  title,
  description,
  dataTestId,
}) => (
  <div data-testid={dataTestId}>
    <Text fontSize="lg" fontWeight={600}>
      {title}
    </Text>
    {description && <DynamicText data={description} />}
  </div>
);
