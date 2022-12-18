import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import About from "./pages/About";
import Index from "./pages/Index";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CartMobile from "./pages/CartMobile";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = JSON.parse(window.sessionStorage.getItem('state')) || {
      items :
      [
        {
        id: 1,
        title: 'item_name',
        type: 'item_type',
        price: 100,
      },
      {
        id: 2,
        title: 'item_name_2',
        type: 'item_type_2',
        price: 101,
      },
      {
        id: 3,
        title: 'item_name_3',
        type: 'item_type_3',
        price: 102,
      },
      {
        id: 4,
        title: 'item_name_4',
        type: 'item_type_4',
        price: 103,
      },
      {
        id: 5,
        title: 'item_name_5',
        type: 'item_type_5',
        price: 104,
      },
      {
        id: 6,
        title: 'item_name_6',
        type: 'item_type_6',
        price: 105,
      },
      ],
    }
    this.state ={
      currentItems: this.state.items,
      order: [],
      categorys: [],
      filter: 'all',
      pages: {},
    }
    this.handleClick = this.handleClick.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.setFilter = this.setFilter.bind(this)
  }

  

  componentDidMount(){
    if (this.state.filter) {
    fetch(`http://127.0.0.1:8000/api/get_list/${this.state.filter}/1`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result,
            currentItems: result
          });
        },
        (error) => {
        }
      )
    }

    fetch("http://127.0.0.1:8000/api/get_categories/")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          categorys: result
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
      }
    }
    if(need_add) {
      this.setState({
        order: [...this.state.order, {id: item.id, title: item.title, type: item.type, price: item.price, count: 1, image: item.image_1}]  
    })}
    else {this.setState({
      order: new_order
    })}
    window.sessionStorage.setItem('state', JSON.stringify(this.state))
  }

  removeFromCart(id){
    const new_order = this.state.order.slice()
    for (let i = 0; i < new_order.length; i++) {
      if(id === new_order[i].id){
        if(new_order[i].count > 1){
          new_order[i].count -= 1
        }
        else{
          new_order.splice(i,1)
        }
      }
      
    }
    this.setState({
      order: new_order
    })
    window.sessionStorage.setItem('state', JSON.stringify(this.state))
  }

  setFilter(category){
    fetch(`http://127.0.0.1:8000/api/get_pages/${category}`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              filter: category.slug,
              pages: result[-1]
            });
          },
          (error) => {
          }
        )
    fetch(`http://127.0.0.1:8000/api/get_list/${category.slug}/1`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              currentItems: result,
            });
          },
          (error) => {
          }
        )
  }
  
  render() {
    return (
      <BrowserRouter>
        <Header order={this.state.order} removeFromCart={this.removeFromCart} categorys={this.state.categorys} setFilter={this.setFilter} filter={this.state.filter}/>
         <Routes>
          <Route path="/" element={<Index categories={this.state.categorys} setFilter={this.setFilter} filter={this.state.filter} />}/>
          <Route path="catalog/:filter/:page" element={<Main items={this.state.currentItems} handleClick={this.handleClick}/>} filter={this.state.filter} pages={this.state.pages}/>
          <Route path="catalog/about/:id" element={<About handleClick={this.handleClick}/>}/>
          <Route path="order/" element={<CartMobile order={this.state.order} removeFromOrder={this.removeFromCart} addToOrder={this.handleClick}/>} />
          <Route path="*" element={<Navigate to='catalog/' replace/>} />
         </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
