import React from 'react'
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';

import axios from 'axios';

function Result() {

  const [val, setVal] = useState([]);
  const [getval, setgetVal] = useState([]);
  const [isUpdate,setIsupdate] = useState(false);
  const [search,setSearch] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setVal((prevVal) => ({
      ...prevVal, [name]: value
    }))
  }

  useEffect(() => {
    getData();
  }, [])

  const handleUpdate = (id) => {
    axios.get(`http://localhost:5000/singleresult?id=${id}`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      setIsupdate(true);
      setVal(response.data.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  const getData = () => {
    axios.get('http://localhost:5000/getresult')
      .then(function (response) {
        // handle success
        console.log(response.data);
        setgetVal(response.data.data)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const handleSubmit = () => {
    if(isUpdate)
    {
        axios.put('http://localhost:5000/updateresult', {
          id:val._id,
          rollno: val.rollno,
          name: val.name,
          guj: val.guj,
          eng: val.eng,
          maths: val.maths,
          sci: val.sci,
          ss: val.ss
        })
          .then(function (response) {
            // handle success
            console.log(response.data);
            if(response.data.status === "Update Student Result Successfully")
            {
              val.rollno = '';
              val.name = '';
              val.guj = '';
              val.eng = '';
              val.maths = '';
              val.sci = '';
              val.ss = '';
            }
            setIsupdate(false)
            getData();
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
    }
    else
    {
      axios.post('http://localhost:5000/addresult', {
        rollno: val.rollno,
        name: val.name,
        guj: val.guj,
        eng: val.eng,
        maths: val.maths,
        sci: val.sci,
        ss: val.ss
      })
        .then(function (response) {
          // handle success
          console.log(response.data);
          getData()
          if (response.data.status === 'Add Student Result Successfully') {
            val.rollno = '';
            val.name = '';
            val.guj = '';
            val.eng = '';
            val.maths = '';
            val.sci = '';
            val.ss = '';
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    

  }

  const handleSearch = (e) => {
   
    axios.get(`http://localhost:5000/searchresult?search=${e.target.value}`)
    .then(function (response) {
      // handle success
      console.log(response.data);
      setgetVal(response.data.data)

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/deleteresult/${id}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        getData();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  return (
    <>
      <Container>
        <Row>
          <Col sm={12} md={10} className='m-auto mt-5 shadow-lg p-3 mb-2 bg-body rounded backs'>
            <div>
              <Row>
                <Col sm={12} md={12} className='text-center pb-3 pt-2 '>
                  <h2 style={{color:'blue', fontWeight:'bolder'}}>Student Result</h2>
                </Col>
                <Col sm={12} md={12} className='ps-5 text-left'>
                  <Form>
                    <Form.Group className="mb-3 d-flex">
                      <Form.Label style={{ width: '140px', color:'white',fontWeight:'bold' }}>Roll No: </Form.Label>
                      <Form.Control type="number" name='rollno' className='ml-2 w-25' placeholder="Enter roll no" value={val.rollno} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex">
                      <Form.Label style={{ width: '140px', color:'white',fontWeight:'bold' }}>Student Name: </Form.Label>
                      <Form.Control type="text" name='name' className='ml-2 w-25' placeholder="Enter Name" value={val.name} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex">
                      <Form.Label style={{ width: '140px', color:'white',fontWeight:'bold' }}>Gujrati: </Form.Label>
                      <Form.Control type="number" name='guj' className='ml-2 w-25' placeholder="Enter Marks" value={val.guj} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex">
                      <Form.Label style={{ width: '140px', color:'white',fontWeight:'bold' }}>English: </Form.Label>
                      <Form.Control type="number" name='eng' className='ml-2 w-25' placeholder="Enter Marks" value={val.eng} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex">
                      <Form.Label style={{ width: '140px', color:'white',fontWeight:'bold' }}>Maths: </Form.Label>
                      <Form.Control type="number" name='maths' className='ml-2 w-25' placeholder="Enter Marks" value={val.maths} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex">
                      <Form.Label style={{ width: '140px', color:'white',fontWeight:'bold' }}>Science: </Form.Label>
                      <Form.Control type="number" name='sci' className='ml-2 w-25' placeholder="Enter Marks" value={val.sci} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-0 d-flex">
                      <Form.Label style={{ width: '140px', color:'white',fontWeight:'bold' }}>S.S.: </Form.Label>
                      <Form.Control type="number" name='ss' className='ml-2 w-25' placeholder="Enter Marks" value={val.ss} onChange={handleChange} />
                    </Form.Group>
                  </Form>
                </Col>
                <Col sm={12} md={12} className='p-3 text-center'>
                  <Button variant="primary" className='mt-3' onClick={handleSubmit}>Submit</Button>
                </Col>
                <Col sm={12} md={11}  >
                  <div className='d-flex justify-content-end'>
                <Form.Control type="text" name='search' className='ml-auto mb-3' style={{width:'170px', backgroundColor:'transparent', color:'blue',fontWeight:'bold', border:'2px solid blue'}} placeholder="Search....." onChange={(e) => handleSearch(e)} />
                </div>
                </Col>
                <Col sm={12} md={12} className='text-center pb-3  pt-0'>
                  <h3 style={{color:'blue', fontWeight:'bolder'}}>Student Result List</h3>
                </Col>
                <Col sm={12} md={12} className='m-auto' style={{height:'300px'}}>
                  <Table striped bordered hover responsive >
                    <thead>
                      <tr>
                        <th>Roll No. </th>
                        <th>Name </th>
                        <th>Guj.</th>
                        <th>Eng.</th>
                        <th>Maths</th>
                        <th>Science</th>
                        <th>S.S.</th>
                        <th>Total</th>
                        <th>Per.</th>
                        <th>Grade</th>
                        <th>Max</th>
                        <th>Min</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        getval?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item.rollno}</td>
                              <td>{item.name}</td>
                              <td>{item.guj}</td>
                              <td>{item.eng}</td>
                              <td>{item.maths}</td>
                              <td>{item.sci}</td>
                              <td>{item.ss}</td>
                              <td>{item.total}</td>
                              <td>{item.per}</td>
                              <td>{item.grade}</td>
                              <td>{item.max}</td>
                              <td>{item.min}</td>
                              {/* <td> <Button variant="primary" onClick={() => naviget(`/updateresult/${item._id}`)}>Update</Button></td> */}
                              <td> <Button variant="primary" onClick={() => handleUpdate(item._id)}>Update</Button></td>
                              <td> <Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button></td>
                            </tr>
                          )
                        })

                      }
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );

}

export default Result
