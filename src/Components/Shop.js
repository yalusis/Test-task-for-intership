import React from "react";
import { Card, Breadcrumb, BreadcrumbItem, CardImg, CardTitle, CardBody, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const Shop = (props) => {
if(props.info == null){
    return <div></div>
} else {

let shops = props.info.stateData.map((shop) => {
    return (
    <div key={shop.id} className="col-12 col-md-5 m-1" >
        <Card className="company" onClick={() => props.set(shop.dish)}>
            <p>{shop.name}</p>
        </Card>
    </div>
    );
})

function makeDish(dishes) {
if(dishes == null){
  return <div></div>
    }
else {
 const cards = dishes.stateCompany.map((card) => {
    return (
        <div key={card.id}  className="col-12 col-md-12 m-1">
            <Card>
           <CardImg width="100%" src={card.image} alt={card.name} />
           <CardBody>
           <CardTitle><h4>{card.name}</h4></CardTitle>
           <Button className="button" onClick={() => addDishestoCard(card, props.setcart )}>Add to Cart</Button>
           </CardBody>
            </Card>
        </div>
    )
    })
return cards
}
}

const addDishestoCard = (card, setcart) => {
    let agree = window.confirm("Додати " + card.name + " до кошика?");
    if (agree) {
        setcart(card)
    }
}

const odd = (dishes) => {
    const callDish = makeDish(dishes)
    const arr = Array.from(callDish)
    const result = arr.filter(dish => Number(dish.key) % 2 === 0)
    return result
}

const even = (dishes) => {
    const callDish = makeDish(dishes)
    const arr = Array.from(callDish)
    const result = arr.filter(dish => Number(dish.key) % 2 === 1)
    return result
}

return (
    <div className="container">
        <div className="row">
                <Breadcrumb className="BreadcrumbItem">
                    <BreadcrumbItem active>Shops</BreadcrumbItem>
                    <BreadcrumbItem><Link to="/cart">Shopping Cart</Link></BreadcrumbItem>
                </Breadcrumb>
    </div>
    <div className="row align-items-start">
                <div className="col-12 col-md m-10">
                <Card className="allcompany">
                  <div id='shops'><strong>Shops</strong></div>
                  { shops }
                  </Card>
                </div>
                <div className="col-12 col-md m-10">
                    <Card>
                    <div className="row align-items-start">
                    <div className="col-12 col-md m-1">
                        { even(props.state) }
                    </div>
                    <div className="col-12 col-md m-1">
                        { odd(props.state) }
                    </div>
                    </div>
                    </Card>
                </div> 
     </div>
    </div>
)
}
}

export default Shop;