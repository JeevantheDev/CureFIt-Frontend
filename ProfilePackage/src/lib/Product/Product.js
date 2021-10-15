import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import { GlobalStyles } from '../components/GlobalStyles/GlobalStyles';
import { Loading as ProductLoading } from '../components/Loading/Loading';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  productParent: {
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    transiton: 'all 0.3s ease',

    '&:hover': { boxShadow: '0 0 11px rgba(33,33,33,.2)' },
  },

  productImage: {
    width: '100%',
    height: '12rem',
    objectFit: 'contain',
  },
}));

const Product = (props) => {
  const { product, onClickCard, children } = props;
  const classes = useStyles();
  const globalClasses = GlobalStyles();

  return (
    <>
      <Box
        onClick={onClickCard}
        variant="outlined"
        className={`${classes.productParent}`}
      >
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            {product ? (
              <Avatar
                variant="square"
                className={classes.productImage}
                src={product.product_image[0] || ''}
              />
            ) : (
              <div className={globalClasses.alignCenter}>
                <Skeleton variant="circle" width={200} height={200} />
              </div>
            )}
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            className={`${globalClasses.flexColumnCenter}`}
          >
            <Box mx={2} display="flex" flexDirection="column">
              <Typography
                variant="caption"
                color="textSecondary"
                style={{ letterSpacing: '0.07em' }}
              >
                {product ? (
                  product.product_category
                ) : (
                  <Skeleton width="30%" height="120%" variant="text" />
                )}
              </Typography>
              <Typography color="textPrimary" variant="h6" gutterBottom>
                {product ? (
                  product.product_title
                ) : (
                  <Skeleton width="80%" height="100%" variant="text" />
                )}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold' }}
                color="textSecondary"
                gutterBottom
              >
                {product ? (
                  product.product_price
                ) : (
                  <Skeleton width="60%" height="100%" variant="text" />
                )}
              </Typography>
              {product && product.reviews.length > 0 && (
                <Box display="flex" alignItems="center">
                  <Chip
                    className={globalClasses.greenBackground}
                    label={product.average_rating || 0.0}
                    icon={<StarIcon style={{ color: '#fff' }} />}
                  />
                </Box>
              )}
              {product && <div className={globalClasses.mb1}>{children}</div>}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Product.propTypes = {
  product: PropTypes.any,
  children: PropTypes.node.isRequired,
  onClickCard: PropTypes.func,
};

export default React.memo(Product);
