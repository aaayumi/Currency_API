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
    		item : [],
    		newItem : []
    	};
    	this.handleSubmit = this.handleSubmit.bind(this);
    }

	componentDidMount(){
	const url = `${baseUrl}${API_KEY}&date=${date}&currencies=${currencies}&format=${format}`
	console.log(url)
    axios.get(url)
         .then(({data}) => {
         	console.log(data);
         	this.setState({
         		item: data.quotes
         	});
         	 console.log(this.state.item.USDAUD)
         })
         .catch((err) => {})
	 }

	 handleSubmit() {
	 	//get date value
	 	var value = new Date( document.getElementById('dateInput').value);
	 	console.log(value)
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
         	this.setState({
         		newItem: data.quotes
         	});
         	 console.log(this.state.newItem)
         })
         .catch((err) => {})

	 }

	render() {
	/*console.log("res" + this.state.item.USDAUD)
	const rate = this.state.item.map((element, index)=>{
		return <div key={index}>
		       <p>{element}</p>
		       </div>
	});
	console.log("rate" + rate)*/
		return (
			<div>
			<div>Exchange</div>
			<ul>Today's rate
			<li>{this.state.item.USDAUD}</li>
			</ul>

			<input type="date" onChange={this.handleSubmit} id="dateInput" />
			<ul>rate
			<li>{this.state.newItem.USDAUD}</li>
			</ul>
           </div>
			)
	}
}