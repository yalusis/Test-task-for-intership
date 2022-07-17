import React from "react";
import {Card, Breadcrumb, BreadcrumbItem, Form,  FormGroup, Label, Input, Col, FormFeedback, CardImg, CardBody, CardText, CardTitle, Button} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useState } from "react";

const CartShop = (props) => {
    const [state, setState] = useState({ name: '', email: '', phone: '', adress: '' })
    const [mistake, setMistake] = useState({ phone: false, email: false})

    function handleInputChange(event) { 
        const target = event.target;
        setState({ ...state, [target.name]: target.value});
    }

    function handleInput(event) {
    const target = event.target
        const newState = props.state.map(obj => {
            if (props.state.indexOf(obj) === Number(target.id)) {
              if(target.value === "-1") {
               alert("Не може бути від'ємне число!")
              }else {
               return {...obj, amount: target.value};
              }
            }

            return obj;
          });
      
          props.set(newState);
    }

    function handleBlurd(event) {
        setMistake({ ...mistake, [event.target.name]: true});
    }

    function submitClick(event) {
    const price = totalPrice()
    const set_dish = []
    for(let i = 0; i < props.state.length; i++) {
       set_dish.push({[i] : props.state[i].name, amount : props.state[i].amount })
    }
    alert('Info about user: ' + JSON.stringify(state) + '. Info about set dishes: ' + JSON.stringify(set_dish) + '. Total price of all purchases: ' + JSON.stringify(price) + '$');
    event.preventDefault();
    }

    function validate( phone, email) {
        const errors = {
            phone: '',
            email: '',
            name: '',
            adress: ''
        };

        const reg = /^\d+$/;
        if (mistake.phone && !reg.test(phone))
            errors.phone = 'Tel. number should contain only numbers';
  
        if (mistake.phone && phone.length < 3)
            errors.phone += " AND tel. number should be >= 3 characters";    
        else if(mistake.phone && phone.length > 10)
           errors.phone += " AND tel. number should be <= 10 characters"

        if(mistake.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';      

        return errors;
    }

    const errors = validate(state.phone, state.email);

    let copy = Object.assign([], props.state);

    const makeSetDish = props.state.map((dish) => {
    const index = props.state.indexOf(dish)
        return (
            <div key={index} className="col-12 col-md-10 m-5" >
            <Card>
            <CardImg  src={dish.image} alt={dish.name} />
               <CardBody>
                <CardTitle><h4>{dish.name}</h4></CardTitle>
                <CardText>{dish.price}$</CardText>
                <Input className="input" type="number" id={index} name="amount" value={dish.amount} onChange={ handleInput } />
                <Button className="button" onClick={()  => {copy.splice(props.state.indexOf(dish), 1); 
                    props.set(copy);}}>Delete dish</Button>
               </CardBody>
         </Card>
         </div>
        );
    });

    const totalPrice = () => {
        let sum = 0;
         props.state.forEach((dish) => {
            const price = dish.amount * dish.price;
            sum += price;       
        })
        return sum
    }

    return (
        <div className="container">
        <div className="row">
                <Breadcrumb className="BreadcrumbItem">
                    <BreadcrumbItem><Link to="/">Shops</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Shopping Cart</BreadcrumbItem>
                </Breadcrumb>
    </div>
    <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                  <Card>
                        <Form >
                            <FormGroup row className="inputsbox">
                                <Label className="label" htmlFor="Name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Input className="inputs" type="text" id="name" name="name"
                                        placeholder="Name" 
                                        value={state.name}
                                        valid={errors.name === ''}
                                        invalid={errors.name !== ''}
                                        onChange={handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row className="inputsbox">
                                <Label className="label" htmlFor="Email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input className="inputs" type="email" id="email" name="email"
                                        placeholder="Email" 
                                        value={state.email}
                                        valid={errors.email === ''}
                                        invalid={errors.email !== ''}
                                        onBlur={ handleBlurd }
                                        onChange={handleInputChange}/>
                                        <FormFeedback className="label">{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row className="inputsbox">
                                <Label className="label" htmlFor="Phone" md={2}>Phone</Label>
                                <Col md={10}>
                                    <Input className="inputs" type="text" id="phone" name="phone"
                                        placeholder="Phone" 
                                        value={state.phone}
                                        valid={errors.phone === ''}
                                        invalid={errors.phone !== ''}
                                        onBlur={ handleBlurd }
                                        onChange={handleInputChange}/>
                                        <FormFeedback className="label">{errors.phone}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row className="inputsbox">
                                <Label className="label" htmlFor="Adress" md={2}>Adress</Label>
                                <Col md={10}>
                                    <Input className="inputs" type="text" id="adress" name="adress"
                                        placeholder="Adress" 
                                        value={state.adress}
                                        valid={errors.adress === ''}
                                        invalid={errors.adress !== ''}
                                        onChange={handleInputChange}/>
                                </Col>
                            </FormGroup>
                        </Form>
                  </Card>
                </div>
                <div className="col-12 col-md m-1">
                  <Card>
                    { makeSetDish }
                  </Card>
                  <div>
                    <span className="price"><h2>Total price { totalPrice() }$</h2></span>
                    <Button className="submit" type="submit" onClick={ submitClick }>Submit</Button>
                  </div>
                </div>
     </div>
    </div>
    )
    }
    
export default CartShop;