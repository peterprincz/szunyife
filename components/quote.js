import styles from './quote.module.css'

export default function Qoute(props) {
    return (
        <div className={styles['quote-wrapper']}>
        <blockquote className={styles.text}>
            <p>{props.text}</p>
            <footer>{props.author}</footer>
        </blockquote>
        </div>
    )
  }