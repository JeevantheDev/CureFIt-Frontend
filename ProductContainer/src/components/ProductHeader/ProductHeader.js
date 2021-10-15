import { Box, Button, Container } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useRef, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  search: {
    width: '70ch',
    [theme.breakpoints.down('md')]: {
      width: 'auto',
    },
  },
  margin: {
    marginRight: theme.spacing(1),
  },
  rightSideFilter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginLeft: 'auto',
  },
}));

export const ProductHeader = ({ history }) => {
  const classes = useStyles();

  const [search, setSearch] = useState('');

  const inputSearch = useRef(null);

  const handleSearchField = (event) => {
    setSearch(event.target.value);
  };

  const handleKeyEnter = (event) => {
    event.preventDefault();
    if (event.key !== 'Enter') return;
    // if (document.activeElement === inputSearch.current) {
    //   setPublicFilterQuery({
    //     ...publicFilterQuery,
    //     search: search,
    //   });
    // } else if (document.activeElement === inputLocation.current) {
    //   setPublicFilterQuery({
    //     ...publicFilterQuery,
    //     location: location.trim(),
    //   });
    // }
  };

  return (
    <Container>
      <Box my={2} mx={1} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <TextField
          inputRef={inputSearch}
          className={[classes.margin, classes.search]}
          size="small"
          variant="outlined"
          color="secondary"
          placeholder="search medicines, health products"
          value={search}
          onChange={handleSearchField}
          onKeyUp={handleKeyEnter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="secondary" />
              </InputAdornment>
            ),
          }}
        />
        <Button startIcon={<ShoppingCartIcon />} size="large" color="primary" variant="contained">
          View Cart
        </Button>
      </Box>
    </Container>
  );
};
