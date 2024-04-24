// AdminPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const { state, logout } = useAuth();
    const naviagate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', description: '' });
    const [selectedProject, setSelectedProject] = useState(null);
    const [file, setFile] = useState(null);
    const [isList, setList] = useState(false);
    const [projectList, setProjectList] = useState([]);
    const [newcategory, setNewCategory] = useState({ title: '', type: '' });
    const [selectedCategory, setSelectedCategory] = useState(null);


    useEffect(() => {
        fetchProjects();
    },);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/projects');
            const list = await axios.get('http://localhost:5000/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error.message);
        }
    };


    if (!state.isAuthenticated) {
        naviagate("/login");
        return null;
    }

    const handleInputChange = (e) => {
        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateProject = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', newProject.title);
            formData.append('description', newProject.description);

            await axios.post('http://localhost:5000/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            fetchProjects();
            setNewProject({ title: '', description: '' });
            setFile(null);
        } catch (error) {
            console.error('Error creating project:', error.message);
        }
    };

    const handleUpdateProject = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', selectedProject.title);
            formData.append('description', selectedProject.description);

            await axios.post(`http://localhost:5000/projects/update/${selectedProject.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            fetchProjects();
            setSelectedProject(null);
            setFile(null);
        } catch (error) {
            console.error('Error updating project:', error.message);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await axios.delete(`http://localhost:5000/projects/delete/${projectId}`);

            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error.message);
        }
    };

    const handleSelectProject = (project) => {
        setSelectedProject({ ...project });
    };

    //category

    const fetchProjectList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/category');
            setProjectList(response.data);
        } catch (error) {
            console.error('Error fetching categories', error.message);
        }
    };

    const handleCategoryInputChange = (e) => {
        setNewCategory({
            ...newcategory,
            [e.target.name]: e.target.value,
        });
    }

    const handleCreateCategory = async () => {
        try {
            await axios.post('http://localhost:5000/category', {
                'title': newcategory.title,
                'type': newcategory.type
            });

            fetchProjectList();
            setNewCategory({ title: '', type: '' });
        } catch (error) {
            console.error('Error creating Category', error.message);
        }
    };

    const handleUpdateCategory = async () => {
        try {
            await axios.post(`http://localhost:5000/category/update/${selectedCategory.id}`, {
                'title': selectedCategory.title,
                'type': selectedCategory.type
            });


            fetchProjectList();
            setSelectedCategory(null);
        } catch (error) {
            console.error('Error updating category:', error.message);
        }
    };

    const handleDeleteCategory = async (projectId) => {
        try {
            await axios.delete(`http://localhost:5000/category/${projectId}`);
            fetchProjectList();
        } catch (error) {
            console.error('Error deleting category:', error.message);
        }
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory({ ...category });
    };

    const change = () => {
        setList(!isList);
        fetchProjectList();
    }

    return (
        <>
            <div className='p-2'>

                <h1>Admin</h1>

                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#creat-project">Create</button>
                <button type="button" class="btn btn-primary mx-2" onClick={change}>{isList?'Projects':'Category'}</button>
                <a className='mx-2 ' href={isList?'/categories':'/projects'}><i class="bi bi-globe">{isList?'Category':'Projects'}</i></a>

                {!isList && (
                    <div>
                        <div class="modal fade" id="creat-project" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Create Project</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Project Name" value={newProject.title} onChange={handleInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="description" value={newProject.description} onChange={handleInputChange}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label for="formFile" className="form-label">Image</label>
                                            <input className="form-control" type="file" id="formFile" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleCreateProject}>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="my-3">
                            <table class="table table-bordered ">
                                <thead>
                                    <tr>
                                        <th scope="col" className='text-center'>Title</th>
                                        <th scope="col" className='text-center'>Description</th>
                                        <th scope="col" className='text-center'>Image</th>
                                        <th scope="col" className='text-center'>Created Date</th>
                                        <th scope="col" className='text-center'>Modified Date</th>
                                    </tr>
                                </thead>
                                {projects.map((project) => (
                                    <tbody>
                                        <tr>
                                            <td className='text-center'>{project.title}</td>
                                            <td className='text-center'> {project.description}</td>
                                            <td className='text-center'><img src={project.imageUrl} style={{ width: '100px', height: '100px' }} alt='...' /></td>
                                            <td className='text-center'>{new Date(project.createdOn).toLocaleString()}</td>
                                            <td className='text-center'>{new Date(project.modifiedOn).toLocaleString()}</td>
                                            <td className='text-center'>
                                                <button type="button" className="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#update-project" onClick={() => handleSelectProject(project)}><i class="bi bi-pencil"></i></button>
                                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteProject(project.id)}><i class="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}


                            </table>
                        </div>


                        <div class="modal fade" id="update-project" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Project</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className='my-3'>
                                            <div className="mb-3">
                                                <label for="exampleFormControlInput1" className="form-label">Title</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Project Name" value={selectedProject?.title} onChange={(e) => handleSelectProject({ ...selectedProject, title: e.target.value })} />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleFormControlTextarea1" className="form-label">Description</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="description" value={selectedProject?.description} onChange={(e) => handleSelectProject({ ...selectedProject, description: e.target.value })}></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label for="formFile" className="form-label">Image</label>
                                                <input className="form-control" type="file" id="formFile" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdateProject}>Update Project</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isList && (
                    <div>
                        <div class="modal fade" id="creat-project" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Create Category</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Project Name" value={newcategory.title} onChange={handleCategoryInputChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlSelect1" className="form-label">Type</label>
                                            <select className="form-select" id="exampleFormControlSelect1" name="type" value={newcategory.type} onChange={handleCategoryInputChange}>
                                                <option value="">Select Type</option>
                                                <option value="Engineer">Engineer</option>
                                                <option value="School">School</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleCreateCategory}>Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="my-3">
                            <table class="table table-bordered ">
                                <thead>
                                    <tr>
                                        <th scope="col" className='text-center'>Title</th>
                                        <th scope="col" className='text-center'>Type</th>
                                        <th scope="col" className='text-center'>Created Date</th>
                                        <th scope="col" className='text-center'>Modified Date</th>
                                    </tr>
                                </thead>
                                {projectList.map((category) => (
                                    <tbody>
                                        <tr>
                                            <td className='text-center'>{category.title}</td>
                                            <td className='text-center'> {category.type}</td>
                                            <td className='text-center'>{new Date(category.createdOn).toLocaleString()}</td>
                                            <td className='text-center'>{new Date(category.modifiedOn).toLocaleString()}</td>
                                            <td className='text-center'>
                                                <button type="button" className="btn btn-warning mx-2" data-bs-toggle="modal" data-bs-target="#update-project" onClick={() => handleSelectCategory(category)}><i class="bi bi-pencil"></i></button>
                                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteCategory(category.id)}><i class="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}


                            </table>
                        </div>


                        <div class="modal fade" id="update-project" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Update Category</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className='my-3'>
                                            <div className="mb-3">
                                                <label for="exampleFormControlInput1" className="form-label">Title</label>
                                                <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Project Name" value={selectedCategory?.title} onChange={(e) => handleSelectCategory({ ...selectedCategory, title: e.target.value })} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlSelect1" className="form-label">Type</label>
                                                <select className="form-select" id="exampleFormControlSelect1" name="type" value={selectedCategory?.type} onChange={(e) => handleSelectCategory({ ...selectedCategory, type: e.target.value })}>
                                                    <option value="">Select Type</option>
                                                    <option value="Engineer">Engineer</option>
                                                    <option value="School">School</option>
                                                </select>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdateCategory}>Update category</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminPage;
