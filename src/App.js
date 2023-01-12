import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./pages/About";
import Index from "./pages/Index";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Cart from "./pages/Cart";


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      order: JSON.parse(localStorage.getItem('order')) || [],
      filter: 'all',
      categories: [],
    }
    this.handleClick = this.handleClick.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.setFilter = this.setFilter.bind(this)
  }

  setState(state){
    if ('order' in state){
      localStorage.setItem('order', JSON.stringify(state.order))}
    super.setState(state)
  }
  

  componentDidMount(){
    fetch("http://127.0.0.1:8000/api/get_categories/")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          categories: result.results
        });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
      }
    )
  }

  handleClick(item){
    const new_order = this.state.order.slice()
    var need_add = true
    for (let i = 0; i < new_order.length; i++) {
      if(new_order[i].id === item.id){
        new_order[i].count += 1
        need_add = !need_add
        break
      }
    }
    if(need_add) {
      this.setState({
        order: [...this.state.order, {id: item.id, title: item.title, type: item.type, price: item.price, count: 1, image: item.image_1}]  
    })}
    else {this.setState({
      order: new_order.slice()
    })}
  }

  removeFromCart(id){
    const new_order = this.state.order.slice()
    for (let i = 0; i < new_order.length; i++) {
      if(id === new_order[i].id){
        if(new_order[i].count > 1){
          new_order[i].count -= 1
          break
        }
        else{
          new_order.splice(i,1)
        }
      }
      
    }
    this.setState({
      order: new_order.slice()
    })
  }

  setFilter(category){
    if (category !== 'undefined'){
    fetch(`http://127.0.0.1:8000/api/get_list/${category.slug}?page=1`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              currentItems: result.results,
            });
          },
          (error) => {
          }
        )
  }}
  
  render() {
    return (
      <BrowserRouter>
        <Header order={this.state.order} removeFromCart={this.removeFromCart} categories={this.state.categories} setFilter={this.setFilter} filter={this.state.filter}/>
         <Routes>
          <Route path="/" element={<Index categories={this.state.categories} setFilter={this.setFilter} filter={this.state.filter} />}/>
          <Route path="catalog/:filter/:page" element={<Main  handleClick={this.handleClick}/>}  />
          <Route path="catalog/about/:id" element={<About handleClick={this.handleClick}/>}/>
          <Route path="order/" element={<Cart order={this.state.order} removeFromOrder={this.removeFromCart} addToOrder={this.handleClick}/>} />
          <Route path="*" element={<Navigate to='catalog/' replace/>} />
         </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
