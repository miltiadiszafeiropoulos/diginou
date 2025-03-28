import React, { useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "flag-icons/css/flag-icons.min.css";
import { MenuContext } from "../context/MenuContext";
import { MdGTranslate } from "react-icons/md";
import {
  IconWrapper, // ensure you import IconWrapper from your styled components
} from "../components/styles/layouts/Header.styled";
import { AnimatedDropdownContent } from "./styles/DropdownLanguage.styled";

// Import the JSON with language details.
import languages from "../utils/Languages.json";

export function DropdownLanguages({ isSticky }) {
  const { menuInfo } = useContext(MenuContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentLanguage = searchParams.get("language");

  // Retrieve available languages from menuInfo.translations.
  // Fallback to the default language if translations are not available.
  const availableLanguages =
    menuInfo?.translations?.map((t) => t.language) || [menuInfo?.defaultLanguage];

  // Remove duplicates.
  const uniqueLanguages = Array.from(new Set(availableLanguages));

  const handleLanguageSelect = (language) => {
    // Update the language parameter in the URL.
    const params = new URLSearchParams(window.location.search);
    params.set("language", language);
    navigate({ search: params.toString() });
    // Optionally, trigger a re-fetch of the menu data here.
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconWrapper $isSticky={isSticky}>
          <MdGTranslate />
        </IconWrapper>
      </DropdownMenu.Trigger>
      <AnimatedDropdownContent>
        {uniqueLanguages.map((lang, index) => {
          const languageData = languages[lang];
          return (
            <DropdownMenu.Item
              key={`${lang}-${index}`}
              onSelect={() => handleLanguageSelect(lang)}
              style={{
                padding: "4px 8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                borderTop: index === 0 ? "none" : "1px solid #ccc", // Only add border if not the first item
              }}
            >
              <span
                className={`fi fi-${languageData ? languageData.flag : lang}`}
                style={{ marginRight: "8px" }}
              ></span>
              {languageData ? languageData.name : lang}
            </DropdownMenu.Item>
          );
        })}
      </AnimatedDropdownContent>
    </DropdownMenu.Root>
  );
}
