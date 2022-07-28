import React, { useState } from 'react'
import visa from '../../../images/visa.png'
import stripe from '../../../images/stripe.png'
import master from '../../../images/master.png'
import lock from '../../../images/lock.png'
import { addBalance } from './Action'
import { useNavigate } from 'react-router-dom'

function Desktop() {
  const[isLoading,setIsLoading] = useState(false)
  const [amount,setAmount] = useState(0)
  const navigate= useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setIsLoading(true)
    const data={
      balance:Number(amount)
    }
    await addBalance(data)
    setIsLoading(false)
    navigate('/success')
  }
  return (
    <div className='add-card-section'>
        <div className='add-card-title'>How would you like to add balance?</div>
        <div className='add-card-form'>
            <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className='col'>
                    <label>Amount</label>
                    <input className='form-control' type="number" placeholder='Amount' onChange={(e)=>setAmount(e.target.value)}  required></input>
                    </div>
                    <div className='add-card-title mt-5'>Payment method</div>
                    <div className='payment-method-section'>
                      <div className='d-flex justify-content-between align-items-center'>
                      <div class="form-group form-check">
                          <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                          <label class="form-check-label" for="exampleCheck1">Check me out</label>
                      </div>

                      <div className='d-flex align-items-center'>
                        <div className='payment-card-holder'>
                          <img src={visa} className="img-fluid"/>
                        </div>
                        <div className='payment-card-holder'>
                          <img src={stripe} className="img-fluid"/>
                        </div>
                        <div className='payment-card-holder'>
                          <img src={master} className="img-fluid"/>
                        </div>
                      </div>
                      </div>
                      <div className='form-group row'>
                      <div className='col'>
                       <label>Name on Card</label>
                        <input className='form-control'type="text"  ></input>
                      </div>
                    <div className='col'>
                      <label>Expiry</label>
                      <input className='form-control' name="away_team" type="date"></input>
                    </div>
                  </div>

                  <div className='form-group row'>
                      <div className='col'>
                       <label>Card Number</label>
                        <input className='form-control'type="text" placeholder='4141 4141 4141 4141'  ></input>
                      </div>
                    <div className='col'>
                      <label>CCV</label>
                      <input className='form-control' name="away_team" type="password" ></input>
                    </div>
                  </div>
                    </div>

                    <div className='d-flex justify-content-between align-items-center mt-4'>
                      <img src={lock} className="img-fluid"></img>
                      <div className='lock-text'>We protect your payment information using encryption to provide bank-level security.</div>
                    </div>
                    


                   

            {isLoading?(
              <button className='btn-add-card'>Paying.. <i class="fa-solid fa-arrow-right"></i></button>
            ):(
              <button className='btn-add-card'>Pay<i class="fa-solid fa-arrow-right"></i></button>
            )}
            </form>
        </div>
    </div>
  )
}

export default Desktop