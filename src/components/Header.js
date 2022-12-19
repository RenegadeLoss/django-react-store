import React, { Component } from 'react'
import Cart from './Cart'
import { Link } from 'react-router-dom'
import Category from './Category'
import MediaQuery from 'react-responsive'
import { FaCartPlus } from "react-icons/fa"

export class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      CartisActive: false,
      CategoryOpen: false,
    }
    this.handleClick = this.handleClick.bind(this)
    this.OpenCategory = this.OpenCategory.bind(this)
  }

  allGoods(type){
    this.OpenCategory()
    this.props.setFilter(type)
  }

  handleClick(){
    this.setState({
      CartisActive: !this.state.CartisActive,
      CategoryOpen: false
    })
  }

  OpenCategory(){
    this.setState({
      CategoryOpen: !this.state.CategoryOpen,
      CartisActive: false
    })
  }

  render() {
    return (
      <header className='header_js'>
        <Link to={`/`} className='noneStyle'> 
          <h1>Franco-create-team</h1>
        </Link>
        <nav className='nav_head'>
          <span className='categories' onClick={() => this.OpenCategory()}>Категории</span>
          <MediaQuery maxDeviceWidth={480}>
            {(matches) => {
              if(matches){
                return <Link to={'/order'} className='noneStyle'>
                  <div className='cart_js'>
                    <FaCartPlus />
                  </div>
                </Link>
              }
              else{
              return <Cart order={this.props.order} removeFromCart={this.props.removeFromCart} openCart={this.handleClick}/>
              }
            }}
          </MediaQuery>
        </nav>
        {this.state.CartisActive && (
          <div className='cart_list_item'>
            <ol>
              { this.props.order.map(el => (
                <li key={el.id} className='item_in_cart'>
                  {el.title},{el.type}
                  <div className='count_item'>Count: {el.count}</div>
                  <button className='del_from_Cart' onClick={() => this.props.removeFromCart(el.id)}>
                    delete this
                  </button>
                </li>
              ))
              }    
            </ol>
          </div>
        )}
        {this.state.CategoryOpen && (
          <div className='category_list'>
          <ol>
            {this.props.categories.map((el) => (
              <li key={el.id} className='category' onClick={() => this.allGoods(el)}>
                <Link to={`/catalog/${el.slug}/1`} className='noneStyle'>
                  {el.type_name}
                </Link>
              </li>
            ))}
          </ol>
        </div>
          
          // <Link to={`/catalog/${this.props.filter.slug}/1`} className='noneStyle' onClick={() => this.allGoods()}>
          //   <Category categories={this.props.categories} setFilter={this.props.setFilter} OpenCategory={this.OpenCategory} filter={this.props.filter}/>
          // </Link>
        )}
      </header>
    )
  }
}

export default Header