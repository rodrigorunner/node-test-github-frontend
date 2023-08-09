import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const EditPet = () => {
    const [data, setData] = useState({
        animal_name: '',
        animal_age: '',
        animal_breed: '',
        animal_type: ''
    })
    const [err, setErr] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target

        setData(data => ({
            ...data,
            [name]: value
        }))
    }
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        const getPetById = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVERURL}/pet/edit/${id}`)
                const json = await res.json()
                setData(json)
            } catch (err) {
                console.log(err)
            }
        }
        getPetById()
    }, [id])

    const editPet = async (e) => {
        e.preventDefault()

        if(data.animal_name === "" || data.animal_age === 0 || data.animal_type === "" || data.animal_breed === "") {
            setErr(true)
            return
        }

        try {
            const res = await fetch(`${process.env.REACT_APP_SERVERURL}/pet/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })
            if(res.status === 200) {
                toast.info('Pet updated successfully.', {
                    theme: "colored"
                })
                navigate(`/details/${data.client_id}`, { replace: true })
            }
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <section className="mt-2">
            <h3 className="text-center">Register Pet</h3>
            {err && <h4 className="alert alert-danger">All Fields are Required.</h4>}
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={(e) => editPet(e)}>
                        <div className="form-group">
                            <label htmlFor="animal_name"><strong>Pet Name</strong></label>
                            <input 
                            type="text"
                            className="form-control"
                            id="animal_name"
                            name="animal_name"
                            placeholder="Pet Name"
                            value={data.animal_name}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="animal_age"><strong>Pet Age</strong></label>
                            <input 
                            type="number"
                            className="form-control"
                            name="animal_age"
                            id="animal_age"
                            value={data.animal_age}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="animal_breed"><strong>Pet Breed</strong></label>
                            <input 
                            type="text"
                            className="form-control"
                            name="animal_breed"
                            id="animal_breed"
                            placeholder="Pet Breed"
                            value={data.animal_breed}
                            onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label><strong>Pet Type</strong></label>
                            <select className="form-control" name="animal_type" value={data.animal_type} onChange={handleChange}>
                                <option defaultValue>Type</option>
                                <option value="cachorro">Dog</option>
                                <option value="gato">Cat</option>
                            </select>
                        </div>
                        <button className="btn btn-dark" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditPet