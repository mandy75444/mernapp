import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

import { useEffect, useState } from 'react'

import burger from '../images/Burger.jpg'
import momos from '../images/Momos.jpg'
import pizza from '../images/Pizza.jpg'


export default function Home() {

    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }


        });

        response = await response.json();

        //  console.log(response[0], response[1]);

        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }

    useEffect(() => {
        loadData()
    }, [])






    return (
        <>
            <div><Navbar /> </div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                <div className="carousel-inner" id="carousel">
                    <div className='carousel-caption' style={{ zIndex: "10" }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            {  /*  <button className="btn btn-outline-success text-white" type="submit">Search</button>*/}
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src={burger} className="d-block w-100 h-50" alt="..." style={{ filter: "brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={momos} className="d-block w-100 h-50" alt="..." style={{ filter: "brightness(30%)" }} />
                    </div>
                    <div className="carousel-item">
                        <img src={pizza} className="d-block w-100 h-50" alt="..." style={{ filter: "brightness(30%)" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button></div>

            <div className='container'>
            {
  foodCat.length > 0
    ? foodCat.map((data) => {
        return (
          <div className='row mb-3' key={data._id}>
            <div className='fs-3 m-3'>
              {data.CategoryName}
            </div>
            <hr />
            {foodItem.length > 0
              ? foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 m-3'>
                        <Card foodItem={filterItems} options={filterItems.options[0]} />
                      </div>
                    );
                  })
              : <div>No Such Data Found</div>}
          </div>
        );
      })
    : ""
}



            </div>
            <div><Footer /></div>

        </>
    )
} 
