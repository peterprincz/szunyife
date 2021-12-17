import styles from './quote.module.css'
import Typography from '@material-ui/core/Typography';


export default function Qoute(props) {
    return (
        <div className={styles['quote-wrapper']}>
            <blockquote className={styles.text}>
                <Typography align="center"  variant="body1">
                        {props.text}
                    </Typography>
                <footer>
                    <Typography align="center" variant="overline">
                        {props.author}
                    </Typography>
                </footer>
            </blockquote>
        </div>
    )
}