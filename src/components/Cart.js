import React, { Component } from 'react';
import { FaCartPlus } from "react-icons/fa";

export class Cart extends Component {
    constructor(props){
      super(props)
      this.state = {
        order: []
      }
    }
      
  render() {
    return (
      <div className='cart_js'>
        <FaCartPlus className='click' onClick={() => this.props.openCart()} />
      </div>
    )
  }
}

export default Cart