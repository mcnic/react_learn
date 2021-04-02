import classes from './Backdrop.module.css'

const Backdrop = (props) => <div className={classes.Backdrop} onClick={props.onClose} />

export default Backdrop