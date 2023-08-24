import { Link } from 'react-router-dom'

export default function HeroBtn({ route, text }) {
    return (
        <Link to={route} >
            <button className="heroBtn">{text}</button>
        </Link >
    )
}
