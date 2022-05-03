import React from 'react'
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Box, Typography, ListItemText } from "@mui/material";
import { styled } from '@mui/material/styles';
import Comment from './comment';
import FormComment from './form-comment';

const Tab = styled(TabUnstyled)`
  color: #000;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #fff;
  padding: 12px 16px;
  margin: 6px 20px 6px 0;
  border: 0.5px solid;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #000;
    color: #fff;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: #000;
    color: #fff;
  }
`;
const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-size: 16px;
`;
const TabsList = styled(TabsListUnstyled)`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: left;
`;

const Describe = ({ productName, productId, description, dimensions, reviews, weight, ratingProduct }) => {
  return (
    <Box sx={{ marginTop: '70px' }}>
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab>Mô tả sản phẩm</Tab>
          <Tab>Thông tin thêm</Tab>
          <Tab>Đánh giá</Tab>
        </TabsList>
        <Box sx={{ border: '1px solid #e0e0e0', padding: '40px 30px' }}>
          <TabPanel value={0}>
            <Typography variant='subtitle2' sx={{ margin: '15px 0' }} color='#000' >Paragraph Text</Typography>
            <Typography variant='caption'>{description}</Typography>
            <Typography variant='subtitle2' sx={{ margin: '15px 0' }} color='#000' >Unordered list</Typography>
            <Typography variant='caption' >
              <ListItemText primary={`+ Item 1`} />
              <ListItemText primary={`+ Item 1`} />
              <ListItemText primary={`+ Item 1`} />
              <ListItemText primary={`+ Item 1`} />
              <ListItemText primary={`+ Item 1`} />
              <ListItemText primary={`+ Item 1`} />
            </Typography>
            <Typography variant='subtitle2' sx={{ margin: '15px 0' }} color='#000' >Ordered list</Typography>
            <Typography variant='caption'>In cursus faucibus tortor eu vestibulum. Ut eget turpis ac justo porta varius. Donec vel felis ante, ac vehicula ipsum. Quisque sed diam metus. Quisque eget leo sit amet erat varius rutrum vitae dapibus lectus. Vivamus et sapien ante. Suspendisse potenti. Fusce in tellus est, ac consequat lacus. Nulla risus massa, commodo in imperdiet ut, ornare in leo. Duis pellentesque sagittis lorem, sed mollis lorem venenatis id.</Typography>
          </TabPanel>
          <TabPanel value={1}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ height: '40px' }}>
                <Typography variant='subtitle2' sx={{ border: '1px solid #e0e0e0', lineHeight: '40px', padding: '0 15px' }}>Cân Nặng</Typography>
                <Typography variant='subtitle2' sx={{ border: '1px solid #e0e0e0', lineHeight: '40px', padding: '0 15px'}}>Kích thước</Typography>
              </Box>
              <Box>
                <Typography variant='subtitle2' sx={{ border: '1px solid #e0e0e0', lineHeight: '40px', padding: '0 15px', width: '69vw' }}>{weight} kg</Typography>
                <Typography variant='subtitle2' sx={{ border: '1px solid #e0e0e0', lineHeight: '40px', padding: '0 15px', width: '69vw' }}>
                  {dimensions && (dimensions.split(',')[0] + ' x ' + dimensions.split(',')[1] + ' x ' + dimensions.split(',')[2])} cm
                </Typography>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={2}>
            <Typography variant='h6'>{reviews && reviews.length} bình luận cho sản phẩm {productName}</Typography>
            {reviews && reviews.map((review, index) => (
              <Comment
                key={index}
                userId={review.user}
                rating={review.rating}
                comment={review.comment}
                date={reviews.createdAt}
              />
            ))}
            <Typography variant='h5' sx={{ marginTop: '20px' }}>Thêm ý kiến của bạn</Typography>
            <FormComment productId={productId} ratingProduct={ratingProduct}/>
          </TabPanel>
        </Box>
      </TabsUnstyled>
    </Box>
  )
}
export default Describe
