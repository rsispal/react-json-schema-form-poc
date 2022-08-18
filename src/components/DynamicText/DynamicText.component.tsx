import { Box, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import { DynamicTextProps } from "./DynamicText.types";

export const DynamicText: FC<DynamicTextProps> = ({ data, dataTestId }) => (
  <Box data-testid={dataTestId}>
    {data.map((paragraph, key) => (
      <Text key={key} marginBottom={2}>
        {paragraph.content.map((item, key) => {
          switch (item.type) {
            case "text": {
              return item.value;
            }
            case "url": {
              return (
                <Link
                  style={{ display: "inline", color: "blue" }}
                  key={key}
                  target={item.target}
                  href={item.url}
                >
                  {item.label}
                </Link>
              );
            }
            default: {
              return null;
            }
          }
        })}
      </Text>
    ))}
  </Box>
);
