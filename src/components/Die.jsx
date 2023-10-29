import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#0B2434"
    }

    const iconMappings = {
        1: faDiceOne,
        2: faDiceTwo,
        3: faDiceThree,
        4: faDiceFour,
        5: faDiceFive,
        6: faDiceSix
    }

    return (
        <div 
            className="die" 
            style={styles} 
            onClick={props.holdDice}
        >
            {/* <h1 className="die--value">{props.value}</h1> */}
            <FontAwesomeIcon icon={iconMappings[props.value]} className="die--icon"/>
        </div>
    )
}

Die.propTypes = {
    value: PropTypes.number,
    isHeld: PropTypes.bool,
    holdDice: PropTypes.func,
}

export default Die