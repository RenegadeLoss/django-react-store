import React, { Component } from 'react'
import Cart from './Cart'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { FaCartPlus } from "react-icons/fa"
import { Container, Navbar, Nav, NavDropdown, NavItem } from 'react-bootstrap'

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
      <header className='header'>
        <Container>
          <Navbar>
            <Container fluid>
              <Navbar.Brand><Link to={`/`} className='noneStyle'> Franco-create-team </Link> </Navbar.Brand>
              <Nav 
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll>
                <NavDropdown title='Категории'>
                {this.props.categories.map((el) => (
                <NavDropdown.Item key={el.id} className='category' onClick={() => this.allGoods(el)}>
                  <Link to={`/catalog/${el.slug}/1`} className='noneStyle'>
                    {el.type_name}
                  </Link>
                </NavDropdown.Item>
              ))}
                </NavDropdown>
                <Nav.Link href={'/order'}> Корзина </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </Container>
        {/* <nav className='nav_head'>
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
                  <img src={el.image_1} alt='empty' className='cart_item_image'></img>
                  <h3>{el.title}</h3>
                  <p>{el.price}</p>
                  <div className='count_item'>Count: {el.count}</div>
                  <button className='del_from_Cart' onClick={() => this.props.removeFromCart(el.id)}>
                    delete this
                  </button>
                </li>
              ))
              }    
            </ol>
            <Link to={'/order'} className='noneStyle'>К покупкам.</Link>
          </div>
        )}
        
          
          
        )} */}
      </header>
    )
  }
}

export default Header