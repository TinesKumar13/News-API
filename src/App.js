import React, { useState, useEffect } from "react";
import './App.css';

import News from "./News";
import Topics from "./Topics";
import Cures from "./Cures";

function App() {

  const [articles, setArticles] = useState([]); //Malaysian News API
  const [topics,setTopics] = useState([]) //Get Latest Articles About Corona
  const [cures, setCures] = useState([]) //Get Corona Cures
  const apiKey = "cd65c41396574157a9f8c7412b0fde48";
  const country = "my";
  const category = "health";
  const topic = "corona virus";
  const cure = "corona vaccine";

  useEffect(() => { //This useEffect is for Corona Cure
    fetchCures();
  },[])

  const fetchCures = async () => { //This is to fetch Cures for Corona Virus
    await fetch(`https://newsapi.org/v2/top-headlines?q=${cure}&apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
        setCures(data.articles)
    })
  }



  useEffect(() => {     // This useEffect is for the Malaysian News API
    fetchData();
  },[])

  const fetchData = async () => { //This function is for the data of Malaysian News API
    await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`)
    .then((response) => response.json())
    
    .then((data) => {
    
        setArticles(data.articles)
    })
 
  }

  useEffect(() => {     // This useEffect is for the Corona Virus Articles
    fetchTopics();
  },[])

  const fetchTopics = async () => { //This function is for the data of Corona Virus Articles
    await fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`)
    .then((response) => response.json())
    
    .then((data) => {
    
        setTopics(data.articles)
    })
 
  }





const generateKey = (pre) => {          //Generate Unique ID
  return `${ pre }_${ new Date().getTime() }`;
}







  return (
    <div className="App">
      
      <div className="news">

      {articles.map(article => (
          
        <News  key={ generateKey(article.title) } title = {article.title} description ={article.description} image={article.urlToImage} url ={article.url}/>
        
      ))}
     
     </div>

     <div className="topics">
      
     {topics.map(topic => (
          
          <Topics key={ generateKey(topic.title) } title = {topic.title} description ={topic.description} image={topic.urlToImage} url ={topic.url}/>
          
        ))}

     </div>

     <div className="cures">
      
      {cures.map(cure => (
           
           <Cures key={ generateKey(cure.url) } title = {cure.title} description ={cure.description} image={cure.urlToImage} url ={cure.url}/>
           
         ))}
 
      </div>
    
      
    </div>
  );


      }
export default App;
