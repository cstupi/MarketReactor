import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CreateGame from './CreateGame.jsx';
import GameInfo from './GameInfo.jsx';

axios.defaults.withCredentials = true;

class GameManager extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mygames: [],
            allgames: [],
            message: ''
        };
    }
    componentDidMount(){
        this.refreshGames();
    }
    componentDidUpdate(){

    }
    async refreshGames(){
        try{
            const res = await axios.get(`${this.props.endpoint}/All`);
            this.setState({"allgames": res.data});
        }catch(ex){
            console.log("Failure to get games");
        }

        try {
            const res = await axios.get(`${this.props.endpoint}/GamesForUser`);
            this.setState({"mygames": res.data});
        }catch(ex){
            console.log("Failure to get user's games");
            this.setState({"mygames": []});
        }
    }
    async joinGame(gameid, password){
        this.setState({"message": ""});
        try {
            const res = await axios.put(`${this.props.endpoint}/Join/${gameid}`, { "gamepassword": password})
        }catch(ex){
            if(ex.response.status === 401){
                this.setState({"message": "Incorrect Password"});
            } else {
                console.log(ex);
            }
        }
        this.refreshGames();
    }
    render(){
        return <div>
            <CreateGame endpoint={`${this.props.endpoint}/Create`} success={res => this.refreshGames().bind(this)} />
            <h2>All games</h2>
            <GameInfo  games={this.state.allgames.filter(g => this.state.mygames.filter(i => i.GameId == g.GameId) == 0)} join={ this.joinGame.bind(this) } />
            <div>{this.state.message}</div>
            <h2>Your Games</h2>
            <GameInfo games={this.state.mygames} />
        </div>
    }
}

export default GameManager;