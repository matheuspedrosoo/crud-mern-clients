import React from 'react'
import logo from '../../assets/logo.png'
import './header.scss'

function Header() {
  return (
    <div className="topo">
      <img src={logo} alt="logo" />
      <h1>ADM</h1>
    </div>
  )
}

export default Header
