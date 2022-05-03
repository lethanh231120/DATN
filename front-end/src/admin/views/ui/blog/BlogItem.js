import React from 'react'
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardText, CardTitle, Button } from "reactstrap";
import './blog.scss'

const BlogItem = (props) => {
  const {image, title, content, id, color, handleDelete} = props

  return (
    <Card>
      <div className='image-blog'>
        <CardImg alt="Card image cap" src={image} />
      </div>
      <CardBody className="p-4">
        <CardTitle tag="h5">{title}</CardTitle>
        <CardText className="mt-3">{content}</CardText>
        <div className="button-group">
          <Link to={`${id}`}>
            <Button color={color}>Xem thêm</Button>
          </Link>
          <Button className="btn" color="danger" onClick={() => handleDelete(id)}>
            Xóa
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default BlogItem;
