import { FC } from "react";
import { Button, HStack, Stack } from "@chakra-ui/react";
import { DynamicText } from "../../../../DynamicText";
import { PromptProps } from "./Prompt.types";

export const Prompt: FC<PromptProps> = ({
  prompt,
  onContinueClick,
  onEndFormClick,
  continueButtonLabel,
  endFormButtonLabel,
  showEndFormButton,
  dataTestId,
  isAcknowledged,
  ...rest
}) => (
  <Stack data-testid={dataTestId}>
    <DynamicText data={prompt} />
    <HStack>
      <Button onClick={onContinueClick} data-testid={"acknowledge-button"}>
        {continueButtonLabel ?? "Continue"}
      </Button>
      {showEndFormButton && (
        <Button onClick={onEndFormClick} data-testid={"end-form-button"}>
          {endFormButtonLabel ?? "End Form"}
        </Button>
      )}
    </HStack>
  </Stack>
);
