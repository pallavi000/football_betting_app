import React from 'react'
import useDeviceDetect from '../../hooks/useDeviceDetect'
import Desktop from './Desktop'
import Mobile from './Mobile'

function Home() {
    const {isMobile} = useDeviceDetect()
  return (
    isMobile ? (
        <Mobile/>
            ):(
        <Desktop/>
            )
  )
}

export default Home