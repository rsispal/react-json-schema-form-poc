import { FC } from "react";
import { Badge, Box } from "@chakra-ui/react";
import { RouteCardProps } from "./RouteCard.types";
import { Link } from "react-router-dom";

const audienceColourMap = {
  developer: "purple",
  public: "teal",
  private: "blue",
  unavailable: "red",
};

export const RouteCard: FC<RouteCardProps> = ({ title, description, link, audience, disabled }) => {
  const renderCard = () => (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      height="200px"
      width="320px"
      boxShadow="xl"
      marginRight={4}
      opacity={disabled ? 0.5 : 1}
      _hover={disabled ? {} : { transform: "scale(1.02)", transition: "all 0.6s ease-in-out" }}>
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme={audienceColourMap[audience]}>
            {audience}
          </Badge>
        </Box>
        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={2}>
          {title}
        </Box>

        <Box as="span" color="gray.600" fontSize="sm">
          {description}
        </Box>
      </Box>
    </Box>
  );

  if (disabled) {
    return renderCard();
  }
  return <Link to={`${link}`}>{renderCard()}</Link>;
};
