import {  useState } from "react";
import { Modal } from "./Modal";
import Labels from "./Labels";


const SingleUserCard = ({ id,name, firstName= name.split(" ")[0],lastName= name.split(" ")[1], company, email,handleDelete, handleEdit }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({firstName,lastName,email,company});
 
  const openModal = () => setIsModalOpen(true);

  const closeModal = () =>   setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const updateTask =(e)=>{
    e.preventDefault()
    
    handleEdit(id,formData)
    closeModal()    
  }
  const handleOpenModal = ()=>{
    openModal()  
  }
  
  return (
    <>
      <div className="flex flex-col text-left border-solid border-2 p-5 gap-3 rounded">
        <p> ID :- {id}</p>
        <p> First Name :- {firstName}</p>
        <p> LastName :- { !lastName ? "NA":lastName }</p>
        <p> Email :- {email}</p>
        <p> Department : - {company.name }</p>
        <div className="flex gap-10">
          <button onClick={ handleOpenModal } className="px-4 py-2 text-white bg-green-500 rounded">Edit</button>
          <button onClick={()=> handleDelete(id)} className="px-4 py-2 text-white bg-red-500 rounded">Delete</button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
      <div className="sm:w-90 lg:w-96  p-5">
        <h2 className="text-center text-2xl text-red-500">Edit User</h2>
          <form class="max-w-sm mx-auto" onSubmit={updateTask}>
            <div>
              <Labels text="Edit firstName"/>
              <input rows="4" name="firstName" defaultValue={formData.firstName} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
            </div>
            <div>
              <Labels text="Edit lastName"/>
              <input rows="4" name="lastName" defaultValue={formData.lastName} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <div>
              <Labels text="Edit Email" />
              <input rows="4" name="email" defaultValue={formData.email} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
            </div>
            <div>
              <Labels text="Edit Department"/>
              <input rows="4" name="name" defaultValue={formData.company?.name} onChange={(e)=> setFormData({...formData , company :{...formData.company , name:e.target.value }} )} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
            </div>
            <input type="Submit" defaultValue="Submit" className="block p-2.5 w-full text-sm text-white bg-green-500 rounded mt-5 cursor-pointer" />
          </form>
        </div>
      </Modal>
    </>
  );
};

export { SingleUserCard };
