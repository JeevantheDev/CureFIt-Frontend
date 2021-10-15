import { Button, Container, Grid } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component
import Product from '../lib/Product/Product';
import { GlobalStyles } from '../lib/components/GlobalStyles/GlobalStyles';

const productList = [
  {
    product_image: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGO9rMjQhR758B0kg4_Ze_YPwIK0w2Kb_AeQ&usqp=CAU',
    ],
    stocks: 14,
    _id: '610d12b6af8e3b2a3074e1c7',
    product_title: 'Horlicks 2kg',
    product_category: 'Nutrition',
    product_price: '110 Rs.',
    product_desc: '2kg Junior Horlicks',
    user_id: '610cf5968d02a42414849931',
    created_at: '2021-08-06T10:45:10.624Z',
    __v: 0,
    slug: 'horlicks-2kg',
    user: {
      user_type: '2',
      _id: '610cf5968d02a42414849931',
      user_name: 'Basic Pharmcy',
      user_email: 'basic@gmail.com',
      created_at: '2021-08-06T08:40:54.206Z',
      avatar: 'http://www.gravatar.com/avatar/a364f0022a438eae37d5859a91a3aded',
      __v: 0,
      id: '610cf5968d02a42414849931',
    },
    reviews: [],
    id: '610d12b6af8e3b2a3074e1c7',
  },
];

const stories = storiesOf('Product', module);
const BASE_API = 'http://localhost:5000/.netlify/functions/server/dev/api/v1';

stories.add('App', () => {
  const [products, setProducts] = useState(productList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetchData();
  }, []);

  const fetchData = async () => {
    let res = await axios.get(`${BASE_API}/product`);
    setProducts(res.data.data);
    setLoading(false);
  };

  const onNavigateCard = (e) => {
    e.stopPropagation();
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {(loading || !products ? Array.from(new Array(5)) : products).map(
          (product, idx) => (
            <Grid key={product ? product.id : idx} item xs={12} md={3}>
              <Product onClickCard={onNavigateCard} product={product}>
                <Button
                  fullWidth
                  className={GlobalStyles().mt1}
                  color="secondary"
                  variant="contained"
                  size="medium"
                >
                  Add
                </Button>
              </Product>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
});
