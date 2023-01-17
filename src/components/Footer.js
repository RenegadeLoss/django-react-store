import React, { Component } from 'react'
import {FaInstagram, FaTwitter, FaGithub, FaVk} from 'react-icons/fa'

export class Footer extends Component {
  render() {
    return (
    <footer className="text-center bg-dark text-white">
      <div className='container p-4'>
        <section className="mb-4">  
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FaVk />
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FaTwitter />
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FaInstagram />
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <FaGithub />
            </a>
        </section>
      </div>
      <div className="text-center p-4" style={{'background-color': 'rgba(0, 0, 0, 0.2)'}}>
        © 2022 Copyright:
        <a className="text-reset fw-bold" href="#">Franco</a>
      </div>
    </footer>
    )
  }
}

export default Footer