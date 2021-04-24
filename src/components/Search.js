import React from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css'
// import MapContainer from "./Map"
import { useFormFields } from "../lib/customHooks";
import {
  makeStyles,
  Box,
  Button,
  Grid,
  TextField,
  Card,
  TextareaAutosize,
} from "@material-ui/core";
import { Form } from "react-bootstrap";
import ReactDOM from 'react-dom'

const gridStyles = makeStyles({
  card: {
    maxWidth: 345,
    boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fafafa",
  },
  media: {
    height: 300,
  },
});
const useStyles = makeStyles((theme) => ({
  filterbutton: {
    "&:hover": {
      borderColor: "#adcaec",
      boxShadow: "0 1px 6px #adcaec",
      backgroundColor: "#12417b",
      color:"white",
    },
    color: "#f6f8f9",
    background: "#2c63a6",
    padding: "12px 18px",
    fontSize: "14px",
    lineHeight: "16px",
    height: "auto",
    borderWidth: "0",
    borderRadius: "30px",
  },
}));


class ViewButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  render() {
    if(this.state){
      return (
        <div>
          <Button variant="primary" onClick={this.handleClick}>
            {this.state.isToggleOn ? 'List' : 'Map'}
          </Button>
        </div>
      );
    }else{
      return (
        <div>
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'List' : 'Map'}
          </button>
        </div>
      );
    }
  }
}


//category
function categoryFilter (type){
    axios.get('http://biz-wiz.herokuapp.com/business/category/'+type)
    .then(res => {
      const businesses = res.data;
      console.log(businesses);
    })
  }
//location and category
function locationCategoryFilter(type, location){
    //clear
    axios.get(`http://biz-wiz.herokuapp.com/business/category/${type}/distance/${location}`)
    .then(res => {
      const businesses = res.data;
      console.log(businesses)
    })
  }
  
//display all businesses
function displayAll(){
  let businesslist={}
  axios.get(`http://biz-wiz.herokuapp.com/business/all`)
  .then(res =>{
    const businesses = res.data;
    console.log(businesses)
    return(
      <div id='business'>hi
      </div>
    );
  })
}



function SearchBusiness() {
  const gridclass=gridStyles()
  const classes = useStyles();
  const[business, setBusinessState]=useFormFields({
    business_type:'',
    location:''
  });
  const handleSubmit=event=>{
    event.preventDefault()
    let businessType=JSON.stringify(business.business_type)
    businessType=businessType.replace(/['"]+/g, '')

    let businessLocation=JSON.stringify(business.location)
    businessLocation=businessLocation.replace(/['"]+/g, '')

    if(businessLocation&&businessType){
      console.log(locationCategoryFilter(businessType,businessLocation)) // fix so that location only grabs state
    }else{
      if(!businessLocation && businessType){
        console.log(categoryFilter(businessType))
      }else{
        if(!businessLocation&&!businessType){
            axios.get(`http://biz-wiz.herokuapp.com/business/all`)
              .then(res =>{
                const businesses = res.data;
                console.log(businesses)
                const businessList=businesses.map((business)=><Grid><Card>{business.business_type}</Card></Grid>)
                ReactDOM.render(
                  <div>{businessList}</div>,
                  document.getElementById('list')
                )
          })
        }
      }
    }
  };

    return (
      
      <body>
        {/* <div><SearchForm /></div> */}
        <formdiv>
        {/* have the search bar appear -I.T.*/}
          <form action="">
            <Form.Control className={classes.searchBar} type="text" id='searchField'/>
            <Button
              fullWidth="10px"
              type="submit"
              className={classes.submitButton}
              variant="contained"
              size="small"
              placeholder='Search by name'
              onClick = {console.log('Search Clicked')}
              // onClick={BusinessList.nameFilter(document.getElementById('searchField').value)}
            >
              Search
            </Button>
          </form>
        </formdiv>
        <div className='page-container'>
        <div className='filter-container'>
        <div>
          <filter>Filter By :</filter>
        </div>
        <div>
          <filterby>Category</filterby><br/>
          {/* call functions when check boxes are clicked => onChange={BusinessList.categoryFilter("Education")} */}
        <div>
        <input type="radio" value='Local Market' onClick={setBusinessState} name='business_type' /> Local Markets<br/>
        <input type="radio" value='Technology' onClick={setBusinessState} name="business_type" /> Technology<br/>
        <input type="radio" value='Crafting' onClick={setBusinessState} name="business_type" /> Crafting<br/>
        <input type="radio" value='Education' onClick={setBusinessState} name="business_type" /> Education<br/>
        <input type="radio" value='Wholesale' onClick={setBusinessState} name="business_type" /> Wholesale<br/>
        <input type="radio" value='Hardware' onClick={setBusinessState} name="business_type" /> Hardware<br/>
      </div>
        </div>
        <div>
          <filterby>Location</filterby><br/>
        <input type="radio" value="New York" onClick={setBusinessState} name="location" /> New York<br/>
        <input type="radio" value="Technology" onClick={setBusinessState} name="location" /> New Jersey<br/>
        <input type="radio" value="Conneticut" onClick={setBusinessState} name="location" /> Conneticut<br/>
        <input type="radio" value="Other" onClick={setBusinessState} name="location" /> Other<br/>
        </div>
        <div><ViewButton /></div><br/>
        <Button
        type='submit'
        variant='contained'
        size='small'
        onClick={handleSubmit}
        >Filter</Button>
        </div>
          <list id='list' className='list-container'/>
        </div>
      </body>
    );
  }
export default SearchBusiness;