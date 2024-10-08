import styles from "./trendpage.module.css";
import { useState, useEffect } from "react";
import FeacturingCard from "../HomePage/FeaturingCard";
import TrendList from "./TrendList";
import NewTrend from "./NewTrend";
import ReadTrend from "./ReadTrend";


function TrendsPage(props) {
  const [trendsList, setTrendsList] = useState([]);
  const [trendDisplayed , setTrendDisplayed] = useState();
  const [trendPosition , setTrendPosition] = useState("current-main")
  const [mainPage, setMainPage] = useState(true);
  const [readTrend, setReadTrend] = useState(false);
  const [newTrend, setNewTrend] = useState(false);
  const [titleToSearch , setTitleToSearch] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const [tempHolder, setTempHolder]=useState(false);
  useEffect(() => {
    const fetchTrends = async () =>{
        const response = await fetch(`${props.backendHttpUrl}/trends/get-all-trends`,
          {method: "get"}
        );
        const result = response.json();
        result.then(content =>{
          setTrendsList(content["message"])
          setTempHolder(content["message"])

        })
      }
      fetchTrends();
    }
      
      ,[trendPosition])

  const backFromTrend = (event) => {
    setMainPage(true);
    setReadTrend(false);
  };
  const backFromNewTrend = (event) => {
    setMainPage(true);
    setNewTrend(false);
  };

  const openTrend = (event, trend) => {
    setTrendDisplayed(trend)
    setMainPage(false);
    setReadTrend(true);
  };
  const openNewTrend = (event) => {
    setMainPage(false);
    setNewTrend(true);
  };

  const handleInputChange = (event) =>{
    const text = event.target.value;
    event.preventDefault();
    setTrendsList(tempHolder.filter(
      (item) =>(
        item["title"].toUpperCase().search(text.toUpperCase()) !== -1) || item["author_username"].toUpperCase().search(text.toUpperCase()) !== -1
      )
    )

  }
  return (
    <div className={styles.trendPageContainer}>
      {mainPage && (
        <div className={styles.mainPageElements}>
          <h1 className={styles.pageHeading}>Nerd Trends</h1>
          <hr className={styles.titleLine}></hr>
          <div className={styles.searchDiv}>
            <form className={styles.searchTrends}>
              <input type="text" placeholder="🔍 search trend..." onChange={(event) => handleInputChange(event)}/>
            </form>
          
          </div>
          <div className={styles.trendsListing} id="main-page-elements">
            <div className={styles.trendListHeaders}>
              <span className={styles.pageHeading}> Trends</span>
              <div className={styles.newTrendButton}>
                <button onClick={(event) => openNewTrend(event)}>
                  +New Trend
                </button>
              </div>
            </div>

            <div className={styles.trendsListing}>
              {
                trendsList.map((trend, index) =>(
                  <TrendList key={index} openTrend={openTrend} trend={trend}/>
                ))
              }
            </div>
          </div>
        </div>
      )}
      {!mainPage && readTrend && <ReadTrend backFromTrend={backFromTrend} trend={trendDisplayed} setTrendPosition={setTrendPosition} currentActiveUser={props.currentActiveUser} backendHttpUrl={props.backendHttpUrl}/> }
      {!mainPage && newTrend && (
        <NewTrend backFromNewTrend={backFromNewTrend} currentActiveUser={props.currentActiveUser} setTrendPosition={setTrendPosition} backendHttpUrl={props.backendHttpUrl} />
      )}
    </div>
  );
}

export default TrendsPage;
