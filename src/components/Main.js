import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      curr_items: [],
    }
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    fetch(`http://127.0.0.1:8000/api/get_list/${this.props.filter}/1`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              items: result,
              currentItems: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
          }
        )
  }

  render() {
    return (
        <div>
          {console.log(this.props.pages)}
          <section className='main_section'>
            {this.props.items.map(item => (
              <div className="item_card" key={item.id}>
                <img src={item.image_1} alt='empty'></img>
                <div className='about_item'>
                  <h3 className='item_name'>{item.title}</h3> 
                  <p className='item_description'>{item.description}</p>
                  <p className='item_price'> {item.price}</p>
                  <Link to={`about/${item.id}`}> about </Link>
                  <button className="addtoCard" onClick={() => this.props.handleClick(item)}>Add</button>
                </div>
              </div>
            ))}
            <div> Pages:  { this.props.pages } </div>
          </section>
        </div>
    )
  }
}

export default Main