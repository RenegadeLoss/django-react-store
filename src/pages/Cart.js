import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Alert, Image, Button, ButtonGroup, Stack } from 'react-bootstrap'

export default function Cart(props) {
  const [price, setPrice] = useState(0)

  useEffect(() => {
    let res = 0
    for (const el of props.order) {
      res += Number(el.count)*Number(el.price)
    }
    setPrice(res)
  }, [price, props.order])

  return (
    <Container fluid>
        { props.order.map(el => (
          <Stack direction='horizontal' gap={3} key={el.id} >
            <Container style={{'width':'16rem'}} >
              <Image fluid variant='top' src={el.image} alt='empty'/>
            </Container>
            <Container>
              <h3>{el.title}</h3>
              <p>Количество в корзине: {el.count}</p>
              <p>Стоимость {Number(el.count)*Number(el.price)} р. </p>
            </Container>
            <div className="vr" />
            <Container>
              <ButtonGroup>
                <Button variant='secondary' onClick={() => props.removeFromOrder(el.id)}>
                  delete this
                </Button>
                <Button variant='secondary' onClick={()=> props.addToOrder(el)}>
                  Plus this
                </Button>
              </ButtonGroup>
            </Container>  
          </Stack>
          ))
        }
        <Alert variant='info' >
          <p>Сумма заказа: {price} р. </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button disabled variant='secondary'>
              Купить
            </Button>
          </div>
        </Alert>    
    </Container>
  )
}
