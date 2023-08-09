import { Link } from "react-router-dom"

const UserPetDetails = ({ user, deletePet }) => {
    return(
        <tr>
            <td>{user.animal_name}</td>
            <td>{user.animal_age}</td>
            <td>{user.animal_type}</td>
            <td>{user.animal_breed}</td>
            <td>
                <Link to={`/pet/${user.animal_id}/edit`}>
                    <button className="btn btn-warning">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                </Link>
            </td>
            <td>
                <button onClick={() => deletePet(user.animal_id, user.client_id)} className="btn btn-danger">
                    <i className="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>

    )
}

export default UserPetDetails