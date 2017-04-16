import React from 'react';

const RankingList = (rankingList) => {
  console.log("----------");
  console.log(rankingList.rankingList);
  const newList = [];
  for(let i = 0; i < rankingList.rankingList.length; i++) {
    newList.push(<li key={i}>{rankingList.rankingList[i]}</li>)
  }

  return(
    <div>
      <ul>{newList}</ul>
    </div>
  )

};
export default RankingList;



