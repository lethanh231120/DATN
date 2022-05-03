import React from 'react'
import { Avatar, Typography, Paper, Rating, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link } from 'react-router-dom'

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'left',
  color: '#000',
  boxShadow: 'none',
  height: '150px',
  padding: '10px 0',
}));

const ProductRated = ({ id, name, price, rating, image }) => {
  return (
    <Link to={`../../product/${id}`}>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <Item>
            <Avatar
              variant='square'
              sx={{ width: '100%', height: '100%', objectFit: 'cover', marginBottom: ' 40px' }}
              src={image[0]}
            />
          </Item>
        </Grid>
        <Grid item xs={7}>
          <Item>
            <Typography variant='caption'>{name}</Typography>
            <Typography variant='subtitle2'>
              <Rating name="size-small" readOnly defaultValue={rating} size="small" />
            </Typography>
            <Typography variant='caption' color='red'>${price}</Typography>
          </Item>
        </Grid>
      </Grid>
    </Link>
  )
}
export default ProductRated
