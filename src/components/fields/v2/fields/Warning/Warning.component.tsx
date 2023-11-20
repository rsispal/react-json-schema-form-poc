import { FC } from "react";
import { Alert, Button, HStack, Stack } from "@chakra-ui/react";
import { DynamicText } from "../../../../DynamicText";
import { WarningProps } from "./Warning.types";

export const Warning: FC<WarningProps> = ({
  prompt,
  onContinueClick,
  onEndFormClick,
  continueButtonLabel,
  endFormButtonLabel,
  showEndFormButton,
  dataTestId,
  ...rest
}) => (
  <Alert status="warning" data-testid={dataTestId}>
    <Stack>
      <DynamicText data={prompt} dataTestId="warning-text" />
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
  </Alert>
);
