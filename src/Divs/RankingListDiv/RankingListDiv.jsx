import React from 'react';
import './RankingListDiv.css';

const RankingList = (rankingList) => {
  const newList = [];
  for(let i = 0; i < rankingList.rankingList.length; i++) {
    newList.push(
      <tr key={i}>
        <td>{i+1}</td>
        <td>
          {rankingList.rankingList[i].photo ?
            <img className="img-ranking img-circle" src={rankingList.rankingList[i].photo} alt=""/> :
            <img className="img-ranking img-circle" src="./pic/user_default.png" alt=""/>
          }
        </td>
        <td>
          {rankingList.rankingList[i].name ?
            rankingList.rankingList[i].name : "Anonymous"
          }
        </td>
        <td>
          {rankingList.rankingList[i].score}
        </td>
        <td>
          {rankingList.rankingList[i].date}
        </td>
      </tr>)
  }

  return(
    <div>
      <h1 className="title-ranking">TOP 10 RECORD</h1>
      <table className="table table-ranking">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {newList}
        </tbody>
      </table>
    </div>
  )

};
export default RankingList;



