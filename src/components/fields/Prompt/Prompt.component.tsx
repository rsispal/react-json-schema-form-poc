import { FC } from "react";
import { Alert, Button, HStack, Stack } from "@chakra-ui/react";
import { DynamicText } from "../../DynamicText";
import { PromptProps } from "./Prompt.types";

export const Prompt: FC<PromptProps> = ({
  prompt,
  onContinueClick,
  onEndFormClick,
}) => (
  <>
    <Stack>
      <DynamicText data={prompt} />
      <HStack>
        <Button onClick={onContinueClick}>Ok, continue</Button>
        <Button onClick={onEndFormClick}>End Risk Questions</Button>
      </HStack>
    </Stack>
  </>
);
