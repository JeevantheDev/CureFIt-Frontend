import { Box, Container } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Search from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CheckoutContext } from '../../screens/checkoutScreen/context/checkout.context';
import { useHistory } from 'react-router-dom';
import { PRODUCT_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import { ProductContext } from '../../screens/productScreen/context/product.context';
import { PRODUCT_CATEGORIES } from '../../app/entity/constant';

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
  badge: {
    right: 0,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export const ProductHeader = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    filterState: [filterQuery, setFilterQuery],
  } = useContext(ProductContext);
  const {
    cartState: [cart],
  } = useContext(CheckoutContext);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    setCategory(filterQuery.category || 'all');
  }, [filterQuery]);

  const inputSearch = useRef(null);

  const handleSearchField = (event) => {
    setSearch(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    setFilterQuery({
      ...filterQuery,
      category: event.target.value !== 'all' ? event.target.value : '',
    });
    history.push(PRODUCT_APPLICATION_URL.PRODUCT_LIST_ALL);
  };

  const handleKeyEnter = (event) => {
    event.preventDefault();
    if (event.key !== 'Enter') return;
    if (document.activeElement === inputSearch.current) {
      setFilterQuery({
        ...filterQuery,
        search: search,
      });
      history.push(PRODUCT_APPLICATION_URL.PRODUCT_LIST_ALL);
    }
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
        <Box className={classes.rightSideFilter}>
          <TextField
            className={`${classes.menu} ${classes.margin}`}
            size="small"
            variant="outlined"
            color="secondary"
            select
            value={category}
            onChange={handleChangeCategory}
          >
            <MenuItem style={{ backgroundColor: '#fff' }} value={'all'}>
              By Category
            </MenuItem>
            {PRODUCT_CATEGORIES.map((category) => (
              <MenuItem style={{ backgroundColor: '#fff' }} key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            history.push(PRODUCT_APPLICATION_URL.PRODUCT_CHECKOUT_CART);
          }}
          color="primary"
          size="large"
          aria-label="cart"
        >
          <Badge className={classes.badge} badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>
    </Container>
  );
};
