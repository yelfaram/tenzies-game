import PropTypes from 'prop-types';

function Scores(props) {
    return (
        <div className="scores--container">
            <div className="score--rolls">
                <p>Best Rolls</p>
                <p className="score--text">{props.bestRolls}</p>
            </div>
            <div className="score--time">
                <p>Best Time</p>
                <p className="score--text">{props.bestTime}</p>
            </div>
        </div>
    )
}  

Scores.propTypes = {
    bestRolls: PropTypes.number,
    bestTime: PropTypes.string
}

export default Scores