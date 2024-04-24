import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from './header.js';
import Footer from './footer.js';

function Home() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:5000/projects/');
            setProjects(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);
    return (
        <>
            <Header/>
            <section class="projects-section">

                <div class="container px-4 px-lg-5 ">
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {projects.map(project=>(
                            <div class="col mb-5">
                                <div class="card h-100"> 
                                    {/* <!-- Product image--> */}
                                    <img class="card-img-top" src={project.imageUrl} alt="..." />
                                    {/* <!-- Product details--> */}
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            {/* <!-- Product name--> */}
                                            <h5 class="fw-bolder">{project.title}</h5>

                                            {project.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}

export default Home;