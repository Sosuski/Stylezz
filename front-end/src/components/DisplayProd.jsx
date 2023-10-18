import '../styles/displayprod.css'
import { useEffect, useState } from 'react'
const DisplayProd = () => {
    //console.log(title.current.value)
    const [products, setProduct] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8000/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => { console.log(res); return res.json() });
            setProduct(response.products)
            console.log(response);
        }

        fetchData();

    }, [])

    // return response.json(); 

    return (
        <div>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={product.title} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.title}</h2>
                                <p>{product.description}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Buy Now for {product.price}</button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DisplayProd;