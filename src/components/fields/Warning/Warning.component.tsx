import { FC } from "react";
import { Alert, Button, HStack, Stack } from "@chakra-ui/react";
import { DynamicText } from "../../DynamicText";
import { WarningProps } from "./Warning.types";

export const Warning: FC<WarningProps> = ({
  prompt,
  onContinueClick,
  onEndFormClick,
}) => (
  <Alert status="warning">
    <Stack>
      <DynamicText data={prompt} />
      <HStack>
        <Button onClick={onContinueClick}>Ok, continue</Button>
        <Button onClick={onEndFormClick}>End Risk Questions</Button>
      </HStack>
    </Stack>
  </Alert>
);
