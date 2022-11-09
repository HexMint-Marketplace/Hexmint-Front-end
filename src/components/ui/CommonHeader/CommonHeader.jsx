import React from 'react'
import './commonHeader.css'
import {Container} from 'reactstrap'

function CommonHeader({title}) {
  return (
    <section className='common_header mt-5 '>
        <Container className='com_header_container'>
            <h1 data-testid = 'commonHeader_txt'>{title}</h1>
        </Container>
    </section>
  )
}

export default CommonHeader