import React from 'react';
import axios from 'axios';

const baseUrl = 'http://apilayer.net/api/historical?'
const API_KEY = 'access_key=45c0f1fb6a611a0fb3de91cc17cdd000'
const date = '2017-10-25';
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
    console.log(url)
    axios.all([
   	axios.get(url),
   	axios.get('http://apilayer.net/api/historical?access_key=45c0f1fb6a611a0fb3de91cc17cdd000&date=2017-10-22&currencies=USD,EUR,CAD,AUD&format=1')])
   .then(axios.spread(( itemResponse, newItemResponse)=>{
   	console.log('item', itemResponse.data.quotes);
   	console.log('newItem', newItemResponse.data.quotes);
   	  this.setState({
   		item : itemResponse.data.quotes,
   		newItem : newItemResponse.data.quotes
   	});
  })
  )
}

handleSubmit() {
   // clear the previous data
   this.setState({ 
  newItem: []
  });

  //get date value
    var value = new Date(document.getElementById('dateInput').value);

   // date format YYYY-MM-DD
    var day = value.getDate();
    var month = value.getMonth() + 1;
    var year = value.getFullYear();

    var thisDate = [year, month, day].join('-');
    console.log(thisDate)
        
    const newUrl = `${baseUrl}${API_KEY}&date=${thisDate}&currencies=${currencies}&format=${format}`

     axios.get(newUrl)
          .then(({data}) => {
          this.setState({
            newItem: data.quotes
             });
         })
         .catch((err) => {
          console.log(err);
         })
}

  render() {
    const rate = this.state.item;
    const newRate = this.state.newItem;
    return ( 
      <div>
        <div>Exchange Information</div>
     <table>
     <thead>
     <tr>
           <th>Currencies combination</th>
           <th>Today's rate</th>
           <th>rate  <input type="date" onChange={this.handleSubmit} id="dateInput" /></th>
           <th>Difference</th>
     </tr>
     </thead>
     <tbody>
     <tr>
          <td>USDCAD</td>
          <td>{rate.USDCAD}</td>
          <td>{newRate.USDCAD}</td>
          <td>body</td>
     </tr>
      <tr>
          <td>USDEUR</td>
          <td>{rate.USDEUR}</td>
          <td>{newRate.USDEUR}</td>
          <td>body</td>
      </tr>
      <tr>
          <td>USDAUD</td>
          <td>{rate.USDAUD}</td>
          <td>{newRate.USDAUD}</td>
          <td>boddy</td>
       </tr>
      </tbody>
     </table>
     </div>
    )
  }
}
