import React from 'react';
import axios from 'axios';
import './Exchange.css';

const tableStyle = {
  border : "1px solid black"
}

const baseUrl = 'http://apilayer.net/api/historical?'
const API_KEY = 'access_key=45c0f1fb6a611a0fb3de91cc17cdd000'
const currencies = 'USD,EUR,CAD,AUD';
const format = 1;

export default class Exchange extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
      newItem: [],
      date: "Yesterday"
    };
     this.handleSubmit = this.handleSubmit.bind(this);
  }

 componentDidMount() {
    // define today
    var newDate = new Date();
    var day = newDate.getDate();
    var yesterday = (newDate.getDate() -1 );
    var month = newDate.getMonth() + 1;
    var year = newDate.getFullYear();

    var todayDate = [year, month, day].join('-');
    var yesterdayDate = [year, month, yesterday].join('-');

    const url = `${baseUrl}${API_KEY}&date=${todayDate}&currencies=${currencies}&format=${format}`
    const newUrl = `${baseUrl}${API_KEY}&date=${yesterdayDate}&currencies=${currencies}&format=${format}`
    axios.all([
    axios.get(url),
    axios.get(newUrl)])
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
        
  const newUrl = `${baseUrl}${API_KEY}&date=${thisDate}&currencies=${currencies}&format=${format}`

     axios.get(newUrl)
          .then(({data}) => {
          this.setState({
            newItem: data.quotes
             });
         })
         .catch((err) => {
          console.log(err);
          alert("choose another date")
         })

   // store data in state for display
   const tableDate = document.getElementById("dateInput").value;
   this.setState({
    date: tableDate
   })
   console.log("date" + document.getElementById("dateInput").value)
}

  render() {
    const rate = this.state.item;
    const newRate = this.state.newItem;
  
    return ( 
     <div>
     <h2>Exchange Information</h2>
     <div className="form">
     <p>Choose date</p>
     <input type="date" onChange={this.handleSubmit} id="dateInput" />
     </div>
     <table style={tableStyle}>
     <thead>
     <tr>
           <th>Currencies</th>
           <th>The rate of Today</th>
           <th>The rate of {this.state.date} </th>
     </tr>
     </thead>
     <tbody style={tableStyle}>
     <tr>
          <td>USDCAD</td>
          <td>{rate.USDCAD}</td>
          <td>{newRate.USDCAD}</td>
     </tr>
      <tr>
          <td>USDEUR</td>
          <td>{rate.USDEUR}</td>
          <td>{newRate.USDEUR}</td>
      </tr>
      <tr>
          <td>USDAUD</td>
          <td>{rate.USDAUD}</td>
          <td>{newRate.USDAUD}</td>
       </tr>
      </tbody>
     </table>
     </div>
    )
  }
}
