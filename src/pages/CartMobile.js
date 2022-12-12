import React from 'react'
import { useState, useEffect } from 'react'

export default function CartMobile(props) {
  const [price, setPrice] = useState(0)

  useEffect(() => {
    let res = 0
    for (const el of props.order) {
      res += Number(el.count)*Number(el.price)
    }
    setPrice(res)
  }, [price, props.order])

  return (
    <>
      <div className='order'>
        <ol>
          { props.order.map(el => (
            <li key={el.id} className='item_in_order'>
              <h3>{el.title}</h3>
              <div>
                {console.log(el.image)}
                <img src={el.image} alt='empty' className='mob_order_image'></img>
              </div>
              <div className='count_item'>Count: {el.count}</div>
              <button className='del_from_order' onClick={() => props.removeFromOrder(el.id)}>
                delete this
              </button>
              <button className='del_from_order' onClick={()=> props.addToOrder(el)}>
                Plus this
              </button>
              <div className='inAll'>
                {Number(el.count)*Number(el.price)} $
              </div>
            </li>
          ))
          }    
        </ol>
        <div>
          Итого: {price} $
        </div>
      </div>
    </>
  )
}
