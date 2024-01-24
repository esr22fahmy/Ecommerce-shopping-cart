import React, { useRef } from 'react'
import homeStyle from './Home.module.css'

export default function Home() {


  return (
<div className={`${homeStyle.img} `}>
<div className={`${homeStyle.layerHeader}`}>

<section className=" text-white h-100 d-flex align-items-end ">


<div className='  container '>
<button       
 className={`${homeStyle.btnButtom} btn btn-light  `} >shop now

<i className="fa-solid fa-arrow-right-long  ps-2"></i>
</button>
</div>
</section>

</div>





</div>
  )
}
