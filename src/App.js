import React, {Component} from 'react';

//import firebase dependency
import firebase from 'firebase/app';
import 'firebase/database';

//import fullpage.js dependency
import $ from 'jquery';
import 'fullpage.js';

import './App.css';
import SnakeGameDiv from './Divs/SnakeGameDiv/SnakeGameDiv';
import OAuthDiv from './Divs/OAuthDiv/OAuthDiv';
import RankingList from './Divs/RankingListDiv/RankingListDiv';

class App extends Component {

  constructor(props) {
    super(props);
    //firebase initialization
    const config = {
      apiKey: "AIzaSyAkNLDVunC2HTufatelsnIsl8rLElEhuqg",
      authDomain: "reacttest-a0dd3.firebaseapp.com",
      databaseURL: "https://reacttest-a0dd3.firebaseio.com",
      projectId: "reacttest-a0dd3",
      storageBucket: "reacttest-a0dd3.appspot.com",
      messagingSenderId: "901167334752"
    };
    this.app = firebase.initializeApp(config);
    this.database = this.app.database();
    this.databaseRef = this.database.ref().child('record'); //root url
    this.queryTop10 = this.databaseRef.orderByChild("score").limitToLast(10);
    this.state = {
      userGlobal: null, // user
      scoreGlobal: 0,   // score to submit to database
      rankingList: []
    };

    this.onChangeUserStatus = this.onChangeUserStatus.bind(this);
    this.onChangeGameScore = this.onChangeGameScore.bind(this);
  }
  componentWillMount() {
    let temp = [];
    let self = this;
    //initialize ranking list when page load
    this.queryTop10.once("value")
      .then(function(snap){
        snap.forEach(function(childSnap) {
          let childData = childSnap.val();
          temp.push(childData);
        });
        return temp;
      })
      .then(function(temp){
        self.setState({
          rankingList: temp.reverse()
        })
      })
  }

  componentDidMount() {
    //initial the color for the fullPage.js
    $('#fullpage').fullpage({
      sectionsColor: ['#f2f2f2', '#4bbfc3', '#b3d1ff']
    });
  }

  //handle user status changes from <OAuthDiv />
  onChangeUserStatus(value) {
    this.setState({
      userGlobal: value
    })
  }

  //handle game score changes from <SnakeGameDiv /> every time the game stopped
  onChangeGameScore(value) {
    this.setState({
      scoreGlobal: value
    });
    //define the structure of the data
    let newRecord = {
      name: this.state.userGlobal.displayName,
      photo: this.state.userGlobal.photoURL,
      score: this.state.scoreGlobal,
      date: new Date().toLocaleString()
    };

    //upload data to the firebase
    //////////////////this is "POST" request
    this.databaseRef.push().set(newRecord);
    //update ranking list
    //////////////////this is "GET" request
    let temp = [];
    let self = this;
    this.queryTop10.once("value")
      .then(function(snap){
        snap.forEach(function(childSnap) {
          let childData = childSnap.val();
          temp.push(childData);
        });
        return temp;
      })
      .then(function(temp){
        self.setState({
          rankingList: temp.reverse()
        })
      })

  }

  render() {
    return (
      <div id="fullpage">

        <div className="section section-left active" id="section1">
          <OAuthDiv onChangeUserStatus={this.onChangeUserStatus}/>
        </div>

        <div className="section" id="section2">
          <SnakeGameDiv
            user={this.state.userGlobal}
            onChangeGameScore={this.onChangeGameScore}
          />
        </div>

        <div className="section" id="section3">
          <RankingList rankingList={this.state.rankingList} />
        </div>
      </div>
    );
  }
}

export default App;


