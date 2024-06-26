import { useEffect, useState } from "react";
import { SingleUserCard } from "../components/SingleUser";

import "../App.css";
import { Modal } from "../components/Modal";
import { deleteUserDetails, getUsersDetails, patchUsersData, postNewUserDetails } from "../Actions/action";
import Button from "../components/Button";
import Labels from "../components/Labels";

export const initialStateTask = { name: '', email: '',department:'' }

const Homepage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(initialStateTask);
    const [render , setRender]= useState(false)
    const [users , setUsers] = useState([])
    const [pagination, setPagination] = useState({start:0,end:6});
    const [page , setPage ]= useState(1)
    
    const openModal = () =>  setIsModalOpen(true);
    const closeModal = () =>   setIsModalOpen(false);

    const submitNewTodo = (e) => {
        e.preventDefault();
        
        const newUser = {
            id:Math.floor(Math.random()*1000),
            name: formData.name,
            email: formData.email,
            company:{
                name:formData.department
            }
        };
    
        const updatedUser = users;
        updatedUser.push(newUser);
       
        setUsers(updatedUser)
        postNewUserDetails(newUser)
        alert("New User has been Added")
        setFormData(initialStateTask)
        closeModal()
        setRender(!render)
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const hendleRender =()=>  setRender(!render)
    
    const handleOpenModal = ()=>{
        openModal()
    }
    useEffect(()=> {}, [render])

    useEffect(()=>{
        getUsersDetails().then(res => setUsers(res))
    },[]);

    const handleEdit = (id,editedUser)=>{
        const newUser = {
            id,
            name: editedUser.firstName +" "+ editedUser.lastName,
            email: editedUser.email,
            company:editedUser.company
        };
        const updatedUsers = users.map((ele)=> ele.id === id? newUser : ele);
        setUsers(updatedUsers)
        patchUsersData(id,newUser)
        alert("User has been Uppdatd Successfully")
    }

    const handleDelete = (id)=>{
        const updatedUsers = users.filter((ele)=> ele.id !== id);
        setUsers(updatedUsers)
        deleteUserDetails(id)
        alert("User has been deleted successfully")
    }

    const handlePageIncre =()=> {
        setPage(page+1)
        setPagination({start:pagination.start+6 , end:pagination.end+6})
    }
    const handlePageDecre =()=> {
        setPage(page-1)
        setPagination({start:pagination.start-6 , end:pagination.end-6})
    }
    // console.log("users",users)

    return (
        <div className="flex flex-col items-center  max-w-[1400px] m-auto ">
            <h1 className="text-3xl font-bold mb-8  mt-5">User Management Dashboard</h1>
            <div className="w-11/12 m-auto">
                <div className="mb-5">
                    <Button onClick={handleOpenModal} text="Create new user details"/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-10">
                    {users?.length > 0 &&
                        users?.map((item,i) => {
                           return i >= pagination.start && i < pagination.end && <SingleUserCard
                                key={item.id}
                                handleRender = {hendleRender}
                                handleEdit ={handleEdit}
                                handleDelete ={handleDelete}
                                {...item}
                            />
                        })
                    }
                </div>
            </div>
            <div className="mt-5 mb-5">
               <Button onClick={handlePageDecre} disabled={page===1} text="Prev" />
               <span className="font-bold mx-1 mr-4">{page}</span>
               <Button onClick={handlePageIncre} disabled={users.length <= page*6} text="Next"/>
           </div>

            <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className=" sm:w-90 lg:w-96  p-5">
                        <h2 className="text-center text-2xl text-orange-400">Add New User</h2>
                        <form class="max-w-sm mx-auto" onSubmit={submitNewTodo}>
                            <div>
                                <Labels text="Enter firstName and LastName"/>
                                <input rows="4" name="name" defaultValue={formData.name} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a name here..." required />
                            </div>
                            <div>
                                <Labels text ="Enter Email"/>
                                <input rows="4" name="email" defaultValue={formData.email} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a email here..." required/>
                            </div>
                            <div>
                                <Labels text="Enter Department"/>
                                <input rows="4" name="department" defaultValue={formData.department} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a department here..." required/>
                            </div>
                            <input type="Submit" defaultValue="Submit" className="block p-2.5 w-full text-sm text-white bg-green-500 rounded mt-5 cursor-pointer" />
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export { Homepage };
