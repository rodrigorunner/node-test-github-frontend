import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import UserPetDetails from "../components/UserPetDetails"
import { toast } from "react-toastify"

const UserPet = () => {
    const [data, setData] = useState([])
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        const getUserPet = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVERURL}/pet/${id}`)
                const json = await res.json()
                setLoading(true)
                setData(json)
            } catch (err) {
                console.log(err)
            }
        }
        getUserPet()

    }, [id])
    
    if(!loading) {
        return <h4 className="alert alert-success text-center mt-2">Loading...</h4>
    }

    const deletePet = async (id, clientId) => {
            try {
               const res = await fetch(`${process.env.REACT_APP_SERVERURL}/pet/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type" : "application/json"
                },
                body: JSON.stringify({ id })
              })
              
              if(res.status === 200) {
                  const findId = data?.filter(el => el.animal_id !== id)
                  setData(findId)
                  navigate(`/details/${clientId}`, { replace: true })
                  toast.success('Pet deleted successfully.')
              }
        
            } catch (err) {
              console.log(err)
            }
    }

    return(
        <div className="table-responsive mt-3">
            <Link to={`/register/${id}/pet`}>
                <button className="btn btn-dark m-2"><i className="fa-solid fa-plus"></i> Pet</button>
            </Link>
            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Pet Name</th>
                        <th>Pet Age</th>
                        <th>Pet Type</th>
                        <th>Pet Breed</th>
                        <th>#</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(data => <UserPetDetails key={data.animal_id} user={data} deletePet={deletePet} />)}
                </tbody>
            </table>
            {data.length === 0 && <h4 className="alert alert-danger text-center">No Pet Available.</h4>}
        </div>
    )
}

export default UserPet