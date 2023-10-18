import '../styles/main.css'
import image from './collaborators.jpeg';

import { useRef } from 'react';

const Main = () => {
    const itemsRef = useRef();

    return (
        <div>
            <div className="navbar bg-neutral text-neutral-content">
                <a className="btn btn-ghost normal-case text-xl">HeavenStylez</a>
            </div>
            <div className="aboutUs">
                <div className="border">
                    <img src={image} />
                    <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec ultrices ornare fermentum. Nam aliquet turpis a viverra venenatis. Vestibulum varius lacus sit amet ligula venenatis pellentesque. Quisque nibh turpis, tincidunt eget risus sit amet, rutrum egestas libero. Nunc accumsan dignissim diam et dictum. Vivamus sed sodales orci.</h1>
                </div>
            </div>
            <div className="horizontal-scrolling-items"
                onMouseEnter={() => itemsRef.current.classList.add('pauseAnimation')}
                onMouseLeave={() => itemsRef.current.classList.remove('pauseAnimation')}
                ref={itemsRef}>
                <div className="horizontal-scrolling-items__item top item1">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src={image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="horizontal-scrolling-items__item top item2">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure><img src={image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Shoes!</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div>
                asd
            </div>
        </div>
    )
}

export default Main;