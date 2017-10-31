import React from 'react';
import axios from 'axios';

const tableStyle = {
  border : "1px solid black"
}
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
      newItem: [],
      date: ""
    };
     this.handleSubmit = this.handleSubmit.bind(this);
  }

 componentDidMount() {
    var newDate = new Date();
    var day = newDate.getDate();
    var yesterday = (newDate.getDate() -1 );
    var month = newDate.getMonth() + 1;
    var year = newDate.getFullYear();

    var todayDate = [year, month, day].join('-');
    var yesterdayDate = [year, month, yesterday].join('-');
    
    const url = `${baseUrl}${API_KEY}&date=${todayDate}&currencies=${currencies}&format=${format}`
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
     <p>Choose date</p>
     <input type="date" onChange={this.handleSubmit} id="dateInput" />
     <table style={tableStyle}>
     <thead style={tableStyle}>
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
