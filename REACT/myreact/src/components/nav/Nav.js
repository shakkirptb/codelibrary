import React from 'react';
import './Nav.scss';

function Nav() {
  let appTitle = "My App"
  return (
      <header  className="Nav">
        <div class="container">
          <a  class="logo">{appTitle}</a>
          <nav>
            <ul>
              <li><a >Home</a></li>
              <li><a >About</a></li>
              <li><a >Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
  );
}

export default Nav;
