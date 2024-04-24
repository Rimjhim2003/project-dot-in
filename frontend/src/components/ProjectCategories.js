import Header from "./header";
import Footer from "./footer";
import axios from "axios";
import React, { useState, useEffect } from "react";

function ProjectCategories() {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/category/');
                setProjectList(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className="conatiner category-wrapper">
                <div className="row">
                    <div className="col">
                        <ul class="list-group category-section">
                        <h2>School Project</h2>
                            {projectList.map(project => project.type==='School' && (
                                <li class="list-group-item " aria-current="true">{project.title}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col">
                        <ul class="list-group category-section">
                        <h2>Engineering Project</h2>
                            {projectList.map(project => project.type==='Engineer' && (
                                <li class="list-group-item " aria-current="true">{project.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProjectCategories;