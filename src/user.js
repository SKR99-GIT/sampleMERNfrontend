import { Box } from "@mui/material";
import UserForm from "./userForm";
import UserTable from "./userTable";
import Axios from "axios"; /* api baackend eke API integrate krnkot e API client ekk widihata mek use krno */
import { useEffect, useState } from "react";

const Users = () => {
    /* create state varible beacuse componenet ek render weddi nawatha use krnnd oni wena nisa */
    const [users, setusers] = useState([])
    /* form ek reset wennd */
    const [submitted, setSubmitted] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    /* getUsers ek run wenn oni page ek load krn awasthawe, api ekt kiyno lifecycle method wala componentDidMount kiyl itim mekata adla react hook ek tmi useEffect*/
    useEffect(() => {
        getUsers();
    }, [])/* empty array(dependancy array), meke kisima dapnedancy ekak sadahan nokeruwoth ehem eke teruma useEffect ek athule call krl tiyen dewal mount wenn page ek load kara wele withrai kiyl*/

    const getUsers = () => {
        Axios.get('http://localhost:3001/api/users') /* API ek call karagannd axios use krl, meke 1weni parameter ek widihata URL ekk denn oni */
        /* uda eken passe return weno promise ekk */
        .then(response => {
            setusers(response.data?.response || [])/* console.log gahala browser eke coslole eke check krl tmi me path ek gaththe, but me path ek madden ? dagann ekt kiynn optional chaining kiyl, eken krnn object ek tiyenod kiyl validate krl tiyenonm withrak ilaga part ekt yana ek, itim bari welawath ek tibbe naththam undife error ekk eno (meka hamathanam use krnnd epa), itim ek nisa hadissiye wath data tibbe naththm empty array ekk gann kiyno */
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        })
    }

    const addUser = (data) => {
        setSubmitted(true);/* submit button ek click krl kiyn adahas ennd oni nisa */
        const payload = {
            id: data.id,
            name: data.name
        }
        Axios.post('http://localhost:3001/api/createuser', payload) /* post ekt parameter 2k oni, 1k URL ek anith ek payload ek */
        /* uda eken passe return weno promise ekk */
        .then(() => {
            getUsers(); /* db ekt new user kenek add una gaman table ek pennano */
            setSubmitted(false);
            isEdit(false);
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        })
    }

    const updateUser = (data) => {
        setSubmitted(true);/* submit button ek click krl kiyn adahas ennd oni nisa */
        const payload = {
            id: data.id,
            name: data.name
        }
        Axios.put('http://localhost:3001/api/updateuser', payload) /* post ekt parameter 2k oni, 1k URL ek anith ek payload ek */
        /* uda eken passe return weno promise ekk */
        .then(() => {
            getUsers(); /* db ekt new user kenek add una gaman table ek pennano */
            setSubmitted(false);
            isEdit(false)
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        })
    }

    const deleteUser = (data) => {
        Axios.delete('http://localhost:3001/api/deleteuser', {data : {id: data.id}}) /* post ekt parameter 2k oni, 1k URL ek anith ek payload ek */
        /* uda eken passe return weno promise ekk */
        .then(() => {
            getUsers(); /* db ekt new user kenek add una gaman table ek pennano */
        })
        .catch(error => {
            console.error("Axios Error : ", error);
        })
    }

    return(
        /* return ek athule multiple components dann baa root ekk nathuw, jsx wl law ek anuwa roots components ekakata wada tiyennd baa  eg:  "<UserForm/>" "<UserTable/>" wge dekak ekatama dalla tiyannd baa, ehem ewa ekata dann oni nm ekko react fragment use krnnd oni naththm mui wl tiyen box or grid use krnnd oni, ehtkot 1k root ekai tiyenn */
        <Box sx={{
            width: 'calc(100% - 100px)',
            margin: 'auto',
            marginTop: '100px'
        }}>
            <UserForm 
            /* adduser prop, methana tmi addUser function ek call wenn */
            addUser = {addUser}
            updateUser = {updateUser}
            submitted={submitted} /* firm ek reset krgnnd */
            refill = {selectedUser}
            isEdit= {isEdit}
            />
            <UserTable 
            rows={users}
            selectedUser = {data => {
                    setSelectedUser(data)
                    setIsEdit(true);
            }}
            deleteUser = {data => window.confirm('Are You Sure To Delete?') && deleteUser(data)}
            />
        </Box>
        
    );
}

export default Users;