import React from 'react';
import axios from 'axios';

const baseUrl = 'http://apilayer.net/api/historical?'
const API_KEY = 'access_key=45c0f1fb6a611a0fb3de91cc17cdd000'
const date = '2017-10-22';
const currencies = 'USD,EUR,CAD,AUD';
const format = 1;

export default class Exchange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
      newItem: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const url = `${baseUrl}${API_KEY}&date=${date}&currencies=${currencies}&format=${format}`
    axios.get(url)
         .then(({data}) => {
         	console.log(data.quotes);
         	this.state.item.push(data.quotes);
         	 this.setState({
            item: this.state.item
             });
         })
         .catch((err) => {
         	console.log(err);
         })

  }

  handleSubmit() {
   // clear the previous data
   this.setState({ 
  		newItem: []
  	});

    //get date value
    var value = new Date( document.getElementById('dateInput').value);

   // date format YYYY-MM-DD
    var day = value.getDate();
    var month = value.getMonth() + 1;
    var year = value.getFullYear();

    var thisDate = [year, month, day].join('-');
    console.log(thisDate)
        
    const newUrl = `${baseUrl}${API_KEY}&date=${thisDate}&currencies=${currencies}&format=${format}`

     axios.get(newUrl)
          .then(({data}) => {
         	console.log(data);
         	this.state.newItem.push(data.quotes);
         	this.setState({
            newItem: this.state.newItem
             });
         	console.log(this.state.newItem)
         })
         .catch((err) => {
         	console.log(err);
         })

}


  render() {
    const rate = this.state.item.map((quotes, index) => {
      return Object.keys(quotes).map(key => {
        return (
            <div key = {key} >
              <p>{quotes[key]}</p>
            </div>
          )
      })
    });

    const newRate = this.state.newItem.map((quotes, index) => {
    	return Object.keys(quotes).map(key => {
    		return (
    			<div key = {key} >
    			<p>{quotes[key]}</p>
    			</div>
    			)
    	})
    })

    console.log({rate} - {newRate})
    return ( 
      <div>
        <div>Exchange</div> 
          Today 's rate
          <p>{rate}</p> 
          <p> {newRate} </p>
         
        <input type="date" onChange={this.handleSubmit} id="dateInput" />
    
     </div>
    )
  }
}
