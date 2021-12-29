import React, {useEffect, useState} from 'react';
// import axios from "axios";

function Search({setGraphData}){

    const [search, setSearch] = useState("GOOGL");
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(0);
  
    // If the query (a ticker you've pressed enter on), changes
    // get the data
    useEffect(() => {
        if(query != ""){
            getData();
        }
    }, [query]);
  
    // Calls the Express API for data
    const getData = async () => {
        if(limit < 10){
          var from = new Date()
          from.setMonth(from.getMonth() - 12);
          from = from.getTime()
          var to = new Date()
          to = to.getTime()
        const response = await fetch(
          `http://localhost:5000/api/${query}/${from}/${to}`
        );
        const data = await response.json();
        setGraphData(data);
        setLimit(limit+1)
      }else{
        alert("Sorry, only ten lookups allowed for testing, just so everyone can try it. (I have a limited number of times I can get stock data per month)")
      }
    };
  
    // Keeps search synced with the input's value
    const updateSearch = (e) => {
      setSearch(e.target.value);
    };
  
    // Called when pressing enter
    const getSearch = (e) => {
      e.preventDefault();
      setQuery(search);
      setSearch("");
    };

    return(
        <div className="flex w-full justify-around">
                <form onSubmit={getSearch} action="" className="search-form w-full flex justify-center">
                    <input className="text-black w-3/12 text-2xl text-center m-2 text-white bg-gray-500" type="text" value={search} onChange={updateSearch}></input>
                </form>
        </div>
    )
}

export default Search;