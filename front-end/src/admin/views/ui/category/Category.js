import React, { useState, useEffect } from 'react'
import { Row, Col, Table, Card, CardTitle, CardBody } from "reactstrap";
import { Form, Field } from "react-final-form";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";
import { del } from '../../../../api/BaseRequest';
import Paginate from '../paginate/Paginate';
import { postCategory, getCategories } from '../../../../redux/categorySlice';
import { putCategory, searchCategory } from '../../../../redux/categorySlice';

const validateForm = (values)  => {
  const errors = {};
  if (!values.name) {
    errors.name = "Vui lòng nhập tên danh mục";
  }
  return errors;
}

const Category = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [searchName, setSearchName] = useState(null)
  const [newCategory, setNewCategory] = useState('')
  const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [submitSearch, setSubmitSearch] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState()

  const dispatch = useDispatch()
  const { categories, status } = useSelector((state) => state.categories)
  let listCategory = []

  if(categories.categories){
    listCategory = categories.categories
  }

  useEffect(() => {
    if(submitSearch === false){
      dispatch(getCategories({ page: currentPage+1 }))
    }
  }, [currentPage, dispatch, isOpenCreate, isOpenEdit, id])

  useEffect(() => {
    (status === 'category created') && setIsOpenCreate(false)
  }, [status])

  const handleOpenCreate = () => {
    setIsOpenCreate(!isOpenCreate)
  }

  const handleEdit = (id) => {
    setId(id)
    setIsOpenEdit(true)
  }

  const handleChangePage = (e, index) => {
    e.preventDefault();
    setCurrentPage(index)
  }

  const onSubmit = (values) => {
    dispatch(postCategory(values))
    setNewCategory('')
  }

  const handleCancel = () => {
    setIsOpenCreate(!isOpenCreate)
  }

  const handleDelete = async(id) => {
    try{
      await del(`categories/${id}`)
      setId(id)
    }catch(error){
      error?.response?.data && setError(error.response.data.message)
      setOpen(true)
    }
  }

  const handleUpdateCategory = () => {
    dispatch(putCategory({ id: id, info: { name: newCategory }}))
    setIsOpenEdit(!isOpenEdit)
  }

  const updateCategory = (e) => {
    if (e.key === "Enter") {
      handleUpdateCategory();
    }
  };

  const handleSubmitSearch = () => {
    dispatch(searchCategory({ name: searchName, page: currentPage+1 }))
    setSubmitSearch(true)
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
                Danh sách danh mục sản phẩm
                <Link to='../../admin/category/trash'>
                  <Button className="btn" color="link">
                    Thùng rác
                  </Button>
                </Link>
              </Col>
              <Col lg='6'>
                <Row>
                  <Col lg='5'>
                    <Input
                      placeholder="Tên danh mục"
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
                <Button
                  color="primary"
                  onClick={handleOpenCreate}
                >
                  Thêm danh mục
                </Button>
                <Modal
                  isOpen={isOpenCreate}
                  toggle={handleOpenCreate}
                >
                  <ModalHeader toggle={handleOpenCreate}>
                    Thêm danh mục
                  </ModalHeader>
                  <ModalBody>
                    <Form
                      onSubmit={onSubmit}
                      validate={validateForm}
                      render={({ handleSubmit, values, submitting, validating }) => (
                        <form onSubmit={handleSubmit}>
                          <FormGroup>
                            <Label for="name">Tên danh mục</Label>
                            <Field name="name">
                              {({ input, meta }) => (
                                <div>
                                  <Input
                                    {...input}
                                    type="text"
                                    placeholder='Tên danh mục'
                                    invalid={meta.error && meta.touched}
                                  />
                                  {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                                </div>
                              )}
                            </Field>
                          </FormGroup>
                          <div className="button-group">
                            <Button type='submit' className="btn" color="primary">
                              Thêm
                            </Button>
                            <Button onClick={handleCancel} className="btn" color="danger">
                              Hủy Bỏ
                            </Button>
                          </div>
                        </form>
                      )}
                    />
                  </ModalBody>
                </Modal>
              </Col>
            </Row>
          </CardTitle>
          <CardBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên danh mục</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listCategory.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index+1}</th>
                    <td>{(isOpenEdit && id === item._id) ?
                      <Input
                        type="text"
                        placeholder={item.name}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onBlur={handleUpdateCategory}
                        onKeyPress={updateCategory}
                      />
                      : item.name}</td>
                    <td>
                      <Button onClick={() => handleEdit(item._id)} color="primary">
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button color='danger' onClick={() => handleDelete(item._id)}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
          <div>
            <Modal isOpen={open}>
              <ModalBody>{error}</ModalBody>
              <ModalFooter>
                <Button onClick={() => setOpen(!open)} color='primary'>
                  Đồng ý
                </Button>
              </ModalFooter>
            </Modal>
          </div>
          <Paginate
            handleChangePage={handleChangePage}
            currentPage={currentPage}
            pages={categories.pages}
          />
        </Card>
      </Col>
    </Row>
  )
}
export default Category
