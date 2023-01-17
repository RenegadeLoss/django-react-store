
import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {Container,Row,Col,Carousel,Card,Button} from "react-bootstrap";

function About(props) {
  const [item, setItem] = useState({
    product: {}
  })

  const { id } = useParams()
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/get_item/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setItem({
            product: result.results[0]
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      )
  }, [id])
  return (
    <Container fluid>
      <Row xs={1} md={2} xl={2} ls={2} className="justify-content-center mx-auto">
        <Col className="d-flex justify-content-center">
          <Carousel slide={false} style={{width:'30rem'}}>
            <Carousel.Item>
              <img className='d-block w-100' src={item.product.image_1} alt='First'/>
              <Carousel.Caption>
                <h3>First image label</h3>
              </Carousel.Caption>
            </Carousel.Item>
            {item.product.image_2 &&(
            <Carousel.Item>
              <img className='d-block w-100' src={item.product.image_2} alt='Second'/>
              <Carousel.Caption>
                <h3>Second image label</h3>
              </Carousel.Caption>
            </Carousel.Item> )}
          </Carousel>
        </Col>
        <Col className="d-flex justify-content-center">
          <Card border="light">
            <Card.Body>
              <Card.Title>{item.product.title}</Card.Title>
              <Card.Text>{item.product.description}</Card.Text>
              <Button variant='outline-success' onClick={() => props.handleClick(item.product)}> В корзину </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default About
