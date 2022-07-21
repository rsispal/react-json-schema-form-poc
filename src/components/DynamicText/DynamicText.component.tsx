import { Box, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import { DynamicTextProps, TextItem, URLItem } from "./DynamicText.types";

export const DynamicText: FC<DynamicTextProps> = ({ data, dataTestId }) => {
  const renderItem = (item: TextItem | URLItem, key: number) => {
    switch (item.type) {
      case "text": {
        return item.value;
      }
      case "url": {
        return (
          <Link
            color="blue.500"
            key={key}
            as="a"
            target={item.target}
            href={item.url}
            display="inline"
          >
            {item.label}
          </Link>
        );
      }
    }
  };

  return (
    <Box data-testid={dataTestId}>
      {data.map((paragraph, key) => (
        <Text key={key} marginBottom={2}>
          {paragraph.content.map((item, key) => renderItem(item, key))}
        </Text>
      ))}
    </Box>
  );
};

export default DynamicText;
