import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Carousel, Row, Col, Button} from 'react-bootstrap';

export class Index extends Component {

  render() {
    return (
      <>
        <Carousel variant="dark" slide={false} interval={10000} style={{width:'100%'}} className='index'>
          <Carousel.Item>
            <img src={"/static/nike_1600x800.jpg"} style={{width:'100%'}} alt='empty' className='index_image'></img>
            <Carousel.Caption>
              <h5>Franco create</h5>
              <p>Не соглашайся на меньшее, выбирай Franco</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Row xs={2} md={6} lg xl className="justify-content-center">
          {this.props.categories.map(el => (
            <Col className="d-flex justify-content-center">
              <Link to={`catalog/${el.slug}/1`} key={el.id} className='noneStyle' >
                <Button variant='secondary' onClick={() => this.props.setFilter(el) }> {el.type_name}</Button>
              </Link>
            </Col>
          ))}
        </Row>
      </>
    )
  }
}

export default Index