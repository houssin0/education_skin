import { TextField, Autocomplete } from "@mui/material";
import { FC } from "react";
import SearchIcon from '@mui/icons-material/Search';

interface Image {
  id: string;
  title: string;
  description: string;
  publisher: string;
  img: string;
  date: string;
  diseaseTitle: string;
}

interface Props {
  images: Image[];
  onSearch: (searchTerm: string) => void;
}

const SearchInput: FC<Props> = ({ images, onSearch }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onSearch(value); // Pass the search term to the parent component
  };

  return (
    <Autocomplete
      options={images}
      getOptionLabel={(image) => image.title}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          placeholder="Search image..."
          style={{ minWidth: 200 }}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          onChange={handleInputChange}
        />
      )}
    />
  );
};

export default SearchInput;
