import { useState, useEffect, useMemo } from "react"
import UsersList from "../components/UsersList"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false) 
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {

    const getUsers = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVERURL}/users`)
        const json = await res.json()
        setLoading(true)
        setData(json)
      } catch (err) {
        console.log(err)
      }
    }
    getUsers()
  }, [data])

  const deleteUser = async (id) => {
    try {
       const res = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({ id })
      })
      
      if(res.status === 200) {
          navigate('/', { replace: true })
          toast.success('User deleted successfully.')
      }

    } catch (err) {
      console.log(err)
    }
  }

  const cachedUsers = useMemo(() => data.users, [data])

  if(!loading) {
    return <h4 className="alert alert-success text-center mt-2">Loading...</h4>
  }

  const keys = [
    "client_name",
    "client_email", 
    "client_whatsapp", 
    "city", 
    "street", 
    "zipcode"
  ]

    return (
      <section className="mt-2">

        <div className="d-flex justify-content-between align-items-center">
          <Link className="btn btn-dark m-3" to="/register"><i className="fa-solid fa-plus"></i></Link>

          <input
          style={{width: '300px'}}
          type="text"
          value={query}
          className="form-control"
          onChange={e => setQuery(e.target.value)}/>
        </div>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Whatsapp</th>
                <th>Email</th>
                <th>City</th>
                <th>Street</th>
                <th>Zipcode</th>
                <th>#</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody >

                {cachedUsers?.filter(user => 
                  keys.some(key => user[key].toLowerCase().includes(query)))
                .map(user => 
                <UsersList key={user.client_id} 
                user={user} 
                deleteUser={deleteUser}/>)}

            </tbody>
          </table>
        </div>

          {data.users.length === 0 && <h4 className="alert alert-danger text-center mt-2">No Users</h4>}
      </section>
    )
  }
  
  export default Home