import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Category extends Component {

  allGoods(type){
    this.props.OpenCategory()
    this.props.setFilter(type)
  }
  
  render() {
    return (
      <div className='category_list'>
        <ol>
          <li className='category' onClick={() => this.allGoods('all')}> All </li>
          {this.props.categorys.map((el) => (
            <li key={el.type_name} className='category' onClick={() => this.allGoods(el.type_name)}>
              {el.type_name}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Category;