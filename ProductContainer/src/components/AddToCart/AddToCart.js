import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles((theme) => ({
  parent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
    cursor: 'pointer',
    boxShadow: '0 0 11px rgba(33,33,33,.2)',
  },
  contained: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  outline: {
    padding: theme.spacing(0.9),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.secondary.main}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  boldText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  whiteText: {
    color: 'white',
  },
}));

export const AddToCart = React.memo(({ onClick, quantity, width = '100%' }) => {
  const classes = useStyles();

  const renderIncrement = () => (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        onClick(quantity, 'inc');
      }}
      className={classes.outline}
    >
      <AddIcon />
    </Box>
  );
  const renderText = (quantity) => (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        !quantity && onClick(quantity);
      }}
      className={classes.contained}
    >
      <Typography className={`${classes.boldText} ${classes.whiteText}`} variant="button">
        {!quantity ? 'Add To Cart' : quantity}
      </Typography>
    </Box>
  );

  const renderDecrement = () => (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        onClick(quantity, 'dec');
      }}
      className={classes.outline}
    >
      <RemoveIcon />
    </Box>
  );

  return (
    <Box width={width} className={classes.parent}>
      {quantity > 0 && renderIncrement()}
      {renderText(quantity)}
      {quantity > 0 && renderDecrement()}
    </Box>
  );
});

AddToCart.propTypes = {
  quantity: PropTypes.any,
  onClick: PropTypes.func.isRequired,
};
