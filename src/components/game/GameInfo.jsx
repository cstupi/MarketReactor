import React from 'react';
import PropTypes from 'prop-types';
const GameRow = (props) => {
    return <div>
        <div className="game-name">{props.GameName}</div>
        <div className="game-start">{props.StartDate}</div>
        <div className="game-end">{props.EndDate}</div>
        <div className="game-password">{props.Password}</div>
        <div className="game-join"><button onClick={e => props.join(props.GameId)}>Join</button></div>
    </div>
};
GameRow.propTypes = {
    join: PropTypes.func.isRequired,
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