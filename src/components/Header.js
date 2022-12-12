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
          <span className='categorys' onClick={() => this.OpenCategory()}>Категории</span>
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
          <Link to={`/catalog/${this.props.filter}/1`} className='noneStyle'>
            <Category categorys={this.props.categorys} setFilter={this.props.setFilter} OpenCategory={this.OpenCategory} filter={this.props.filter}/>
          </Link>
        )}
      </header>
    )
  }
}

export default Header