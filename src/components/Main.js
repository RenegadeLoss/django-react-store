import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Row, Col, Card, Button, Pagination } from 'react-bootstrap';

function Main(props) {
  const [items, setItems] = useState({
    item: [],
    next_page: '',
    previous_page: '',
    count: '',
  })
  const {filter, page} = useParams()

  let list_pages = []


  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://127.0.0.1:8000/api/get_list/${filter}?page=${page}`)
        .then(res => res.json())
        .then(
          (result) => {
            setItems({
              item: result.results,
              next_page: result.next,
              previous_page: result.previous,
              last_page: Math.ceil(Number(result.count)/8),
            });
            
          },
            
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
          }
        )
  }, [filter,page])


    return (
    <>
      <Container fluid>
         <Row xs={1} md={2} lg={3} xl={4} className="justify-content-center mx-auto">
          {items.item.map( item => (
            <Col key={item.id} xs md lg="3" className="d-flex justify-content-center">
              <Card border="dark" style={{ width: '18rem' }}>
                <Card.Img className="rounded" variant='bottom' src={item.image_1} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Link to={`/catalog/about/${item.id}`}><Button variant='outline-dark' className='about'> Подробнее </Button></Link>
                  <Button variant='outline-success' onClick={() => props.handleClick(item)} className='add-to-cart'>В корзину</Button>
                  <Card.Text>Цена: {item.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Pagination className="d-flex justify-content-center">
          {(Number(page) !== 1 ) && (Number(page) !== 2) && (
              <Pagination.Item href={`/catalog/${filter}/1`}> 1 </Pagination.Item>
          )}
          {items.previous_page && (
            <Pagination.Prev href={`/catalog/${filter}/${Number(page)-1}`}> {Number(page)-1} </Pagination.Prev>
          )}
          <Pagination.Item active>{page}</Pagination.Item>
          {items.next_page && (<Pagination.Next href={`/catalog/${filter}/${Number(page)+1}`}> {Number(page)+1}</Pagination.Next>)}

        </Pagination>
      </Container>      
    </>
    )
  }


export default Main