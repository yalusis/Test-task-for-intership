import { Routes, Route, Navigate} from 'react-router-dom';
import CartShop from './Card';
import Shop from './Shop';
import { useEffect, useState } from 'react';
import { baseUrl } from '../baseUrl';

const Main = () => {

const [stateData, setData] = useState(null)
const [stateCompany, set_stateCompany] = useState(null)
const [state_cart, set_cart] = useState([])
let copy = Object.assign([], state_cart);

useEffect(() => {
  fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then((response) => setData({stateData : response}));
}, [])


return(
    <div>
      <Routes>
        <Route index element={<Shop info={stateData} state={stateCompany} 
        set={(dish) => set_stateCompany({stateCompany : dish})} 
        setcart={(dish) => {
          copy.push(dish)
          set_cart(copy)
        }}/>}/>
        <Route path='/cart' element={<CartShop state={state_cart} set={set_cart}/>}/>
        <Route path='*'  element={ <Navigate to="" replace/> } />
      </Routes>
    </div>
)
}

export default Main;