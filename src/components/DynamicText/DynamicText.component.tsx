import { Box, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import {
  DynamicTextParagraph,
  DynamicTextProps,
  TextItem,
  URLItem,
} from "./DynamicText.types";

export const DynamicText: FC<DynamicTextProps> = ({ data }) => {
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
    return null;
  };

  const renderParagraph = (paragraph: DynamicTextParagraph, key: number) => (
    <Text key={key} display="inline">
      {paragraph.content.map((item, key) => renderItem(item, key))}
    </Text>
  );

  return (
    <Box>
      {data.map((paragraph, key) => (
        <Text key={key} marginBottom={2}>
          {paragraph.content.map((item, key) => renderItem(item, key))}
        </Text>
      ))}
    </Box>
  );
};
