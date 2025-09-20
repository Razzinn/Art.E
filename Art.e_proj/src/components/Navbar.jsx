import React from 'react'
import './Navbar.css'

const Logo = () => (
  <div className="logo" aria-label="Creo logo">
    <span className="logo-text">CRE</span>
    <span className="logo-emoji" role="img" aria-label="smile">😊</span>
  </div>
)

const Burger = () => (
  <button className="burger" aria-label="Menu">
    <span/>
    <span/>
    <span/>
  </button>
)

const CartIcon = () => (
  <button className="cart" aria-label="Carrello" title="Carrello">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="M1 1h3l3.6 10.59a2 2 0 0 0 1.9 1.41h8.5a2 2 0 0 0 1.94-1.52L23 6H6"/>
    </svg>
  </button>
)

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="left">
          <Logo />
          <Burger />
          <a href="#" className="categories">Categorie</a>
        </div>

        <form className="search" role="search" onSubmit={(e)=>e.preventDefault()}>
          <select aria-label="Categoria">
            <option value="all">All</option>
            <option value="prodotti">Prodotti</option>
            <option value="servizi">Servizi</option>
          </select>
          <input type="search" placeholder="Cerca su Creo" aria-label="Cerca su Creo"/>
          <button className="btn" type="submit">Cerca</button>
        </form>

        <div className="right">
          <CartIcon />
        </div>
      </div>
      <div className="nav-accent"/>
    </header>
  )
}
