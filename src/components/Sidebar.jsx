import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'

import { logo } from '../assets'
import { links } from '../assets/constants'

const NavLinks = ({ handleClick }) => (
  <div className='mt-10'>
    {links.map((link) => (
      <NavLink
        key={link.name}
        className='flex flex-row items-center justify-start my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
        to={link.to}
        onClick={() => handleClick && handleClick()}
      >
        <link.icon className='w-6 h-6 mr-2' />
        {link.name}
      </NavLink>
    ))}
  </div>
)

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <div className='hidden flex-col w-[240px] py-10 px-4 bg-[#191624] md:flex'>
        <img alt='logo' className='object-contain w-full h-14' src={logo} />
        <NavLinks />
      </div>

      <div className='absolute block md:hidden top-6 right-3'>
        {mobileMenuOpen ? (
          <RiCloseLine
            className='w-6 h-6 mr-2 text-white'
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className='w-6 h-6 mr-2 text-white'
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <img alt='logo' className='object-contain w-full h-14' src={logo} />
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  )
}

export default Sidebar
