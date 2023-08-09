import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const EditUser = () => {
    const [data, setData] = useState({
        client_name: '',
        client_whatsapp: '',
        client_email: '',
        street: '',
        city: '',
        zipcode: ''
    })
    const { id } = useParams()
    const navigate = useNavigate()
    const [err, setErr] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target 

        setData(data => ({
            ...data,
            [name]: value
        }))
    }

    useEffect(() => {

        const getUserById = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${id}`)
                const json = await res.json()
                setData(json)
            } catch (err) {
                console.log(err)
            }
        }
        getUserById()

    }, [id])

    const editUser = async (e) => {
        e.preventDefault()

        if(data.client_name === "" || data.client_email === "" || data.client_whatsapp === "" || data.city === "" || data.street === "" || data.zipcode === "") {
            setErr(true)
            return
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })
            if(res.status === 200) {
                toast.info('User updated successfully.', {
                    theme: "colored"
                })
                navigate('/', { replace: true })
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    return(
        <section>
            <h3 className="text-center m-2">Edit User</h3>
            {err && <h4 className="alert alert-danger text-center">All fields are required.</h4>}
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={e => editUser(e)}>
                        <div className="form-group">
                            <label htmlFor="client_name">Name</label>
                            <input
                            type="text"
                            name="client_name"
                            id="client_name"
                            className="form-control"
                            value={data.client_name}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="client_whatsapp">Whatsapp</label>
                            <input
                            type="text"
                            name="client_whatsapp"
                            id="client_whatsapp"
                            className="form-control"
                            value={data.client_whatsapp}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="client_email">Email</label>
                            <input
                            type="email"
                            name="client_email"
                            id="client_email"
                            className="form-control"
                            value={data.client_email}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input
                            type="text"
                            name="street"
                            id="street"
                            className="form-control"
                            value={data.street}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                            type="text"
                            name="city"
                            id="city"
                            className="form-control"
                            value={data.city}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipcode">Zipcode</label>
                            <input
                            type="text"
                            name="zipcode"
                            id="zipcode"
                            className="form-control"
                            value={data.zipcode}
                            onChange={handleChange}
                            />
                        </div>
                        <button className="btn btn-dark" type="submit">Update</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditUser