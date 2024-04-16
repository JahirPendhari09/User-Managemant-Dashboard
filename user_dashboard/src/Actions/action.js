
import axios from "axios";

export const getUsersDetails = ()  => {
    return (
    axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => res.data)
        .catch(err => err)
    )
};

export const postNewUserDetails = (newUser) => {
    return (
    axios.post("https://jsonplaceholder.typicode.com/users",newUser)
       .then(res=> res)
        .catch(err => err)
    )
};

export const patchUsersData = (id,updatedUser) => {
    return (
    axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`,updatedUser)
        .then(res=> res)
        .catch(err=> err)
    )
};

export const deleteUserDetails = (id) => {
    console.log(id,"id")
    return (
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then(res=> {
            // console.log(res)
            return res
          })
          .catch(err=> {
            // console.log(err)
            return err
        })  
    )
};


