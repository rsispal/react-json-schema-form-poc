import { FC } from "react";
import { Alert, Button, HStack, Stack } from "@chakra-ui/react";
import { DynamicText } from "../../DynamicText";
import { WarningProps } from "./Warning.types";

export const Warning: FC<WarningProps> = ({
  prompt,
  onContinueClick,
  onEndFormClick,
  continueButtonLabel,
  endFormButtonLabel,
  showEndFormButton,
}) => (
  <Alert status="warning">
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
  </Alert>
);
