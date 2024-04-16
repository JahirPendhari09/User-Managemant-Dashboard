
import axios from "axios";

export const getUsersDetails = ()  => {
    return (
    axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => res.data)
        .catch(err => {
            alert("Something went wrong")
            return err
        })
    )
};

export const postNewUserDetails = (newUser) => {
    return (
    axios.post("https://jsonplaceholder.typicode.com/users",newUser)
       .then(res=> res)
        .catch(err => {
           alert("Something went wrong")
           return  err
        })
    )
};

export const patchUsersData = (id,updatedUser) => {
    return (
    axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`,updatedUser)
        .then(res=> res)
        .catch(err=> {
            alert("Something went wrong")
            return err
        })
    )
};

export const deleteUserDetails = (id) => {
    console.log(id,"id")
    return (
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then(res=>  res)
          .catch(err=> {
            alert("Something went wrong")
            return err
        })  
    )
};


