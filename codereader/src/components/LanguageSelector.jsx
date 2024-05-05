import React from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  MenuItemOption,
  MenuOptionGroup
} from "@chakra-ui/react";

export const LANGUAGE_VERSIONS = {
  java: "15.0.2",
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  csharp: "6.12.0",
  php: "8.2.3",
};

const LanguageSelector = ({ language, onSelect }) => {
  return (
    < Box ml={2} mb={4} className="language_selector">
      <Text mb={2} fontSize="20px" color="white">
        Language:
      </Text>
<Menu closeOnSelect={false} className="element-on-top">
        <MenuButton as={Button}  colorScheme="blue">
        {language}<i className="fa-solid fa-chevron-down"></i></MenuButton>
        

        <MenuList bg="grey" minWidth='100px'>
          {Object.entries(LANGUAGE_VERSIONS).map(([lang, version]) => (
            <MenuItemOption
              key={lang}
              onClick={() => onSelect(lang)}
              bg={lang === language ? "gray.900" : "gray.900"}
              _hover={{
                bg: "gray.900",
              }}
            >
              {lang}
              <Text as="span" color="gray.600" fontSize="sm" ml={2}>
                ({version})
              </Text>
            </MenuItemOption>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
