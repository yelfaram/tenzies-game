import PropTypes from 'prop-types';

function Stats(props) {
    return (
        <div className="stats--container">
            <p className="stats--rolls">Rolls: {props.rolls}</p>
            <p>Timer: {props.time}</p>
        </div>
    )
}

Stats.propTypes = {
    rolls: PropTypes.number,
    time: PropTypes.string
}

export default Stats