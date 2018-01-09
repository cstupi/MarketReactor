import React from 'react';

import PropTypes from 'prop-types';

class GameRow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            "password": ''
        }
    }
    render(){
        return <div>
            <div className="game-name">{this.props.GameName}</div>
            <div className="game-start">{this.props.StartDate}</div>
            <div className="game-end">{this.props.EndDate}</div>
            { this.props.HasPassword == 1 &&
                <div className="game-password"><input
                    type="password"
                    onChange={ e => this.setState({"password": e.target.value})}
                    placeholder="Password"
                    value={this.state.password}
                    />
                </div>
            }
            
            { this.props.join && 
                <div className="game-join"><button onClick={e => this.props.join(this.props.GameId, this.props.HasPassword == 1 ? this.state.password : false)}>Join</button></div>
            }
        </div>
    }
};
GameRow.propTypes = {
    join: PropTypes.func,
    GameId: PropTypes.string.isRequired,
    GameName: PropTypes.string.isRequired,
    StartDate: PropTypes.string.isRequired,
    EndDate: PropTypes.string
}
const GameInfo = (props) => {
    if(props.games.length == 0)
        return <div></div>
    let rows = props.games.map((r,i) => <GameRow {...r} key={i} join={props.join} />);
    return <div>
        {rows}
    </div>

}
GameRow.propTypes = {
    games: PropTypes.array
}

export default GameInfo;