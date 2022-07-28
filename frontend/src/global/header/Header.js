import React from 'react'
import useDeviceDetect from '../../hooks/useDeviceDetect'
import Desktop from './Desktop'
import Mobile from './Mobile'

function Header() {
  const {isMobile} = useDeviceDetect()
  return (
    isMobile ? (
      <Mobile/>
          ):(
      <Desktop/>
          )
  )
}

export default Header