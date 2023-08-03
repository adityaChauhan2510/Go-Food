import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';


export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3' style={{ color: 'green' }}>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

     let totalPrice = data.reduce((total, food) => total + food.price, 0)
      return (
     <div>

  //     {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' style={{ color: 'green' }}>#</th>
              <th scope='col' style={{ color: 'green' }}>Name</th>
              <th scope='col' style={{ color: 'green' }}>Quantity</th>
              <th scope='col' style={{ color: 'green' }}>Option</th>
              <th scope='col' style={{ color: 'green' }}>Amount</th>
              <th scope='col' style={{ color: 'green' }}></th>
            </tr>
          </thead>
          { <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' style={{ color: 'white' }}>{index + 1}</th>
                <td style={{ color: 'white' }}>{food.name}</td>
                <td style={{ color: 'white'}}>{food.qty}</td>
                <td style={{ color: 'white'}}>{food.size}</td>
                <td style={{ color: 'white'}}>{food.price}</td>
                <td ><button type="button" className="btn p-0" style={{ color: 'red' }}><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
              </tr>
            ))}
          </tbody> }
        </table>
        <div><h1 className='fs-2' style={{ color: 'white' }}>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}