import { SearchContainer, InputContainer, SearchInput, SearchIcon } from './styles/Search.styled';
import { useTranslation } from "react-i18next";

export function Search({ searchTerm, setSearchTerm }) {
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchContainer>
      <InputContainer>
        <SearchInput
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={t("header.search")}
          type="search"
          id="Search"
          required
        />
        <SearchIcon />
      </InputContainer>
    </SearchContainer>
  );
}
