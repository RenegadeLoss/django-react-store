import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

function Main(props) {
  const [items, setItems] = useState({
    item: []
  })
  const {filter, page} = useParams()

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('effect in main:',filter)
    fetch(`http://127.0.0.1:8000/api/get_list/${filter}/${page}`)
        .then(res => res.json())
        .then(
          (result) => {
            setItems({
              item: result
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
        <div>
          <section className='main_section'>
            {items.item.map(el => (
              <div className="item_card" key={el.id}>
                <img src={el.image_1} alt='empty'></img>
                <div className='about_item'>
                  <h3 className='item_name'>{el.title}</h3> 
                  <p className='item_description'>{el.description}</p>
                  <p className='item_price'> {el.price}</p>
                  {console.log(el.id)}
                  <Link to={`/catalog/about/${el.id}`}> about </Link>
                  <button className="addtoCard" onClick={() => props.handleClick(el)}>Add</button>
                </div>
              </div>
            ))}
            <div> Pages:  { '' } </div>
          </section>
        </div>
    )
  }


export default Main