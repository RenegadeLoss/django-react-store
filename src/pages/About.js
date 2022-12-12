
import React, { useState, useEffect} from 'react';
import { useParams } from "react-router-dom";


function About(props) {
  const [item, setItem] = useState({
    product: {}
  })

  const { id } = useParams()
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/get_item/${id}`)
      .then(res => res.json())
      .then(
        (result) => {
          setItem({
            product: result[0]
          })
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
        }
      )
  }, [id])
  return (
    <>
    <div>
      <section className='about_section'>
        <div className='item_name'>
          <h2 >{item.product.title}</h2> 
        </div>
        <div className="item_card" key={item.product.id}>
          <img src={item.product.image_1} alt='empty'></img>
          <div className='about_item'>
            <p className='item_description'>{item.product.description}</p>
            <p className='item_price'> {item.product.price}</p>
          </div>
          <button className="addtoCard" onClick={() => props.handleClick(item.product)}>Add</button>
        </div>
      </section>
    </div>
  </>
  )
}

export default About

// export function withRouter(Children){
//   return(props)=>{

//      const match  = {params: useParams()};
//      return <Children {...props}  match = {match}/>
//  }
// }

// class About extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {
//       item: {}
//     }
//   }
//   componentDidMount(){
//     console.log(typeof(this.props.match.params.id))
//     fetch(`http://127.0.0.1:8000/api/get_item/${this.props.match.params.id}`)
//       .then(res => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             item: result[0]
//           })
//         },
//         // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//         }
//       )
//   }

//   render() {
//     return (
    //   <>
    //   <div>
    //     <section className='main_section'>
    //         <div className="item_card" key={this.state.item.id}>
    //             <img src={this.state.item.image_1} alt='empty'></img>
    //             <div className='about_item'>
    //               <h3 className='item_name'>{this.state.item.title}</h3> 
    //               <p className='item_description'>{this.state.item.description}</p>
    //               <p className='item_price'> {this.state.item.price}</p>
    //             </div>
    //           <button className="addtoCard" onClick={this.props.handleClick(this.state.item)}>Add</button>
    //         </div>
    //     </section>
    //   </div>
    // </>
//     )
//   }
// }

// export default withRouter(About);