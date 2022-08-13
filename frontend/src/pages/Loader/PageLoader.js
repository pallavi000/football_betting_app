import React from 'react'
import { Bars } from 'react-loader-spinner'

function PageLoader() {
  return (
    <div className='page-loader-container'>
        <Bars color="#00BFFF" height={80} width={80} />
    </div>
  )
}

export default PageLoader