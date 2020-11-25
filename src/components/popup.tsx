import '../assets/styles/main.css';
const popup = (props) => {
    return props.show ? <div className="popup" onClick={props.clicked}></div> : null
}

export default popup;