import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Card, CardTitle, CardBody, Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct, searchProduct } from '../../../../redux/productSlice'
import { getAllCategories } from '../../../../redux/categorySlice';
import Paginate from '../paginate/Paginate';
import './product.scss'

const Product = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchName, setSearchName] = useState(null)
  let listProduct = []
  let listCategory = []

  const dispatch = useDispatch()
  const { products, message, status } = useSelector((state) => state.products)
  const { categories } = useSelector((state) => state.categories)

  if(products.products){
    listProduct = products.products
  }
  if(categories.categories){
    listCategory = categories.categories
  }

  useEffect(() => {
    dispatch(getProducts({ page: currentPage+1, pageSize: 5 }))
    dispatch(getAllCategories())
  }, [currentPage, status === 'product deleted', (message === 'success')])

  const handleChangePage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }

  const renderCategory = (id) => {
    const result = listCategory.filter(category => (category._id === id))
    return(result[0] && result[0].name)
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }

  const handleSubmitSearch = () => {
    dispatch(searchProduct({ name: searchName, page: currentPage+1 }))
    setSearchName('')
  }

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <Row>
              <Col lg='4'>
                <i className="bi bi-card-text me-2"> </i>
                Danh sách sản phẩm
                <Link to='../product/trash'>
                  <Button className="btn" color="link">
                    Thùng rác
                  </Button>
                </Link>
              </Col>
              <Col lg='6'>
                <Row>
                  <Col lg='5'>
                    <Input
                      placeholder="Tên sản phẩm"
                      type="text"
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                  </Col>
                  <Col lg='1'>
                    <Button color='primary' onClick={handleSubmitSearch}>Lọc</Button>
                  </Col>
                </Row>
              </Col>
              <Col lg='2'>
                <Link to='../../admin/create-product'>
                  <Button className="btn" color="primary">
                    Thêm sản phẩm
                  </Button>
                </Link>
              </Col>
            </Row>
          </CardTitle>
          <CardBody className="">
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Anh</th>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Gía bán</th>
                  <th>Số lượng có</th>
                  <th>Bình luận</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listProduct.map((item, index) =>
                  <tr key={index} >
                    <th>{index+1}</th>
                    <td className='image-product'>
                      <img src={item.listImage[0]} alt='avtar'></img>
                    </td>
                    <td>{item.name}</td>
                    <td>{renderCategory(item.categoryId)}</td>
                    <td>{item.price}</td>
                    <td>{item.countInStock}</td>
                    <td>{item.numberOfReviews}</td>
                    <td>
                      <Link to={`../../admin/product/${item._id}`}>
                        <Button color='primary'>
                          <i className="bi bi-eye"></i>
                        </Button>
                      </Link>
                      <Link to={`../../admin/edit-product/${item._id}`}>
                        <Button color='success'>
                          <i className="bi bi-pencil"></i>
                        </Button>
                      </Link>
                      <Button color='danger' onClick={() => handleDelete(item._id)}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
          <Paginate
            handleChangePage={handleChangePage}
            currentPage={currentPage}
            pages={products.pages}
          />
        </Card>
      </Col>
    </Row>
  )
}
export default Product
