import { Box, Link, Text } from "@chakra-ui/react";
import { FC } from "react";
import { DynamicTextProps, TextItem, URLItem } from "./DynamicText.types";

export const DynamicText: FC<DynamicTextProps> = ({ data }) => {
  const renderItem = (item: TextItem | URLItem, key: number) => {
    switch (item.type) {
      case "text": {
        return (
          <Text key={key} display="inline">
            {item.value}
          </Text>
        );
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

  return <Box>{data.map((item, i) => renderItem(item, i))}</Box>;
};
