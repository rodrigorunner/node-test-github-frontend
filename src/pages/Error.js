import Header from '../components/Header'
import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError()
    return(
        <section>
            <Header />
            <div className="row">
                <div className="col-md-6 mx-auto bg-danget text-white">
                    <h1 className="alert alert-danget">Something went wrong</h1>
                    <p>
                        <strong>{error.statusText || error.message}</strong>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Error