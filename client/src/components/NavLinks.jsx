import { Link } from 'react-router-dom'

import "../css/App.css"

export default function NavLinks({ links }) {
    return (
        <span className="navLinks">
            {links.map((link, index) => {
                return (
                    <>
                        {
                            link.active ?
                                <Link to={link.path}>{link.name}</Link>
                                :
                                <p>{link.name}</p>
                        }
                        {
                            index < links.length - 1 &&
                            <p>-</p>
                        }
                    </>
                )
            })}
        </span>
    )
}

