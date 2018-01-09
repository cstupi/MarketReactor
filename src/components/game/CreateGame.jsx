import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
axios.defaults.withCredentials = true;
class CreateGame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            gamename: '',
            gamepassword: '',
            startdate: moment(new Date()).format('YYYY-MM-DD'),
            enddate: '',
            message: ''
        }
    }
    async createGame(){
        this.setState({'message': ''});
        if(this.state.gamename == ''){
            this.setState({'message': 'Invalid data'});
            return;
        }
        try {
            const res = await axios(this.props.endpoint, { 
                method: 'post',
                data: this.state, 
                withCredentials: true
            });
            this.props.success(res.response);
            this.setState({ message: "Game Created"});
            return;
        }catch(ex){
            if(ex.response.status === 401){
                if(this.props.failure)
                    this.props.failure(401);
                this.setState({message: "You must be logged in to create games"});
                return;
            }
            console.log(ex.response);
            this.setState({message: "Error creating game"});
            return;
        }
    }
    render(){
        return <div>
            <div>
                <input 
                    type="text"
                    className="text-input"
                    placeholder="Name"
                    onChange={e => this.setState({"gamename": e.target.value})}
                    value={this.state.gamename} />
            </div>
            <div>
                <input
                    type="text"
                    className="text-input"
                    placeholder="Optional Password"
                    onChange={e => this.setState({"gamepassword": e.target.value})}
                    value={this.state.gamepassword} />
            </div>
            <div>
                <input
                    type="date"
                    className="date-input"
                    placeholder="Start Date"
                    onChange={e => this.setState({"startdate": e.target.value})}
                    value={this.state.startdate} />
            </div>
            <div>
                <input
                    type="date"
                    className="date-input"
                    placeholder="End Date"
                    onChange={e => this.setState({"enddate": e.target.value})}
                    value={this.state.enddate} />
            </div>
            <div>
                <button onClick={this.createGame.bind(this)}>Create</button>
            </div>
            <div>
                <span>{this.state.message}</span>
            </div>
        </div>;
    }
}
CreateGame.propTypes = {
    endpoint: PropTypes.string.isRequired,
    success: PropTypes.func.isRequired,
    failure: PropTypes.func
}
export default CreateGame;