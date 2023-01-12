import React, { Component } from 'react';

class Category extends Component {

  allGoods(type){
    this.props.OpenCategory()
    this.props.setFilter(type)
  }
  
  render() {
    return (
      <div className='category_list'>
        <ol>
          {this.props.categories.map((el) => (
            <li key={el.type_name} className='category' >
              {el.type_name}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Category;