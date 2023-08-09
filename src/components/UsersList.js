import { Link } from "react-router-dom"

const UsersList = ({ user, deleteUser }) => {
    return(
        <tr>
                <td>
                  <Link to={`/details/${user.client_id}`}>{user.client_name}</Link>  
                </td>
                <td>{user.client_whatsapp}</td>
                <td>{user.client_email}</td>
                <td>{user.city}</td>
                <td>{user.street}</td>
                <td>{user.zipcode}</td>
                <td>
                    <Link to={`/user/${user.client_id}/edit`}>
                        <button className="btn btn-warning">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </Link>
                </td>
                <td>
                    <button onClick={() => deleteUser(user.client_id)} className="btn btn-danger">
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </td>
        </tr>
    )
}

export default UsersList