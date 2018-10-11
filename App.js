import React, { Component } from 'react';
import MenuAppBar from './components/MenuAppBar'
import TextFields from './components/TextFields';
import { Button } from '@material-ui/core';
import ProductItem from './components/ProductItem';
import AddProduct from './components/AddProduct';
import CustomizedTable from './components/CustomizedTable';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.onDelete=this.onDelete.bind(this);
    this.onAdd=this.onAdd.bind(this);
    this.onEditSumit=this.onEditSubmit.bind(this);
  }
 
  getProducts() {
    return  this.state.products;
   
  }
  componentDidMount() {
    
  fetch("http://localhost:8080/products")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result
                    });
                },
            )
  }
  
 
  onAdd(name, price){
    console.log(name,price);
    console.log(this.getProducts());
   const products= this.getProducts();
   
    products.push({
      name,
      price
  
    })
    
    this.setState({products});

  }
   
  onEditSubmit = (name,price,originalName)=> {
  let products= this.getProducts();
  
 products = products.map(product=>{
   if (product.name === originalName){
     product.name=name;
     product.price=price;
   }
   return product;
 });
  this.setState({products});
  }
  onDelete(name){
  const products= this.getProducts();
  const filteredProducts= products.filter(product=>{
    return product.name!==name;

  });
  this.setState({products:filteredProducts});
  }
  render() {
    console.log("the product in state")
    console.log(this.state.products)
    return (
      <div className="App">
      <MenuAppBar/>
      <AddProduct
      onAdd={this.onAdd}
      
      />
      
      {
      
          this.state.products.map(product => {
              return (
                  <ProductItem
                  key={product.name}
                  {...product}
                  onDelete={this.onDelete}
                 onEditSubmit={this.onEditSubmit}
                 />

              );
          })
      }
     
  </div>



    );
  }
}

export default App;
