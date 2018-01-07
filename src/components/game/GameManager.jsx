import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CreateGame from './CreateGame.jsx';
import GameInfo from './GameInfo.jsx';

class GameManager extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            games: []
        };
    }
    async componentDidMount(){
        try{
            const res = await axios.get(`${this.props.endpoint}/All`);
            this.setState({"games": res.data});
        }catch(ex){
            console.log("Failure to get games");
        }


    }
    render(){
        return <div>
            <CreateGame endpoint={`${this.props.endpoint}/Create`} success={res => console.log(res)} />
            <GameInfo  games={this.state.games} join={id => console.log(id)} />
        </div>
    }
}

export default GameManager;