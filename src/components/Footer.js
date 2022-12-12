import React, { Component } from 'react'

export class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
            <div className="footer-col"><span>©Franco Create</span></div>
            <div className="footer-col">
                <a href="https://vk.com/ne_veryu_v_anarhiyu">Написать письмо</a>
            </div>
        </div>
      </footer>
    )
  }
}

export default Footer