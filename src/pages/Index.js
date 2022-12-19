import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Index extends Component {

  render() {
    return (
      <>
        <section className='index_page'>
            <div className='bg'>
                <img src={"/static/nike_1600x800.jpg"} alt='empty' className='index_image'></img>
                <h2> Franco create </h2>
            </div>
            <div className='categories'>
              {this.props.categories.map(el => (
                <Link to={`catalog/${el.slug}/1`} key={el.id} className='noneStyle' >
                  <div className='hover-span' onClick={() => this.props.setFilter(el) }> {el.type_name} </div>
                </Link>
              ))}

            </div>
        </section>
      </>
    )
  }
}

export default Index