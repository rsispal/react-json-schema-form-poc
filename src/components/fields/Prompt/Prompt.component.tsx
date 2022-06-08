import { FC } from "react";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { DynamicText } from "../../DynamicText";
import { PromptProps } from "./Prompt.types";

export const Prompt: FC<PromptProps> = ({
  prompt,
  onContinueClick,
  onEndFormClick,
  continueButtonLabel,
  endFormButtonLabel,
  showEndFormButton,
}) => (
  <>
    <Stack>
      <DynamicText data={prompt} />
      <HStack>
        <Button onClick={onContinueClick}>
          {continueButtonLabel ?? "Continue"}
        </Button>
        {showEndFormButton && (
          <Button onClick={onEndFormClick}>
            {endFormButtonLabel ?? "End Form"}
          </Button>
        )}
      </HStack>
    </Stack>
  </>
);
