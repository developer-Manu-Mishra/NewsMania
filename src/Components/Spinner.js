import React  from 'react'
import loading from '../Globeframe.gif'

export default function Spinner() {
        return (
                <div className=" loading text-center w-100 my-3">
                    <img className="text-center" src={loading} style={{width:'100px'}} alt="" />
                </div>
        )
    
}
