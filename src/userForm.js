import { Button, Grid2, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";

/* props kiyanne pass krnn puluwn data or function ekk component ekaka idann tw component ekakt, aniwaren parent component ekak idann child component ekakat or anith paththat*/
const UserForm = ({addUser, updateUser, submitted, refill, isEdit}) => {
    /* state oni wenn dynamic data handle krnnd */
    /* mehem hadann update wena details dala tiyen nisa */
    const [id, setId] = useState(0)
    const [name, setName] = useState('')

    useEffect(() => {
        if (!submitted) {
            setId(0);
            setName('');
        }
    }, [submitted])

    useEffect(() => {
        if (refill?.id && refill.id !== 0) {
            setId(refill.id);
            setName(refill.name)
        }
    }, [refill])

    return( 
        /* grid == div kiyl hithamu, habai div ekakat wada controles meke tiyeno */
        <Grid2
        container
        spacing={2}
        /* sx property eken puluwn object ekk widihata css methanama denn puluwn, meken denn javascript style warge, 'css'ma nwi, convert wela enn css widihata tmi itim */
        sx={{
            backgroundColor: '#ffffff',
            marginBottom: '30px',
            display: 'block',/* athule tiyen componenets ek pelata wadina ek nawaththannd */
        }}
        >
            {/* xs = extra small, e kiynn me grid ek extra small device ekeka use kroth full width (12) gannd kiyl tmi kiyl tiyenn */}
            <Grid2 item xs = {12}>
                {/* typography = paragraph */}
                <Typography component={'h1'} sx={{color: '#000000'}}>User Form</Typography>
            </Grid2>
            
            <Grid2 item xs={12} sm={6} sx={{display:'flex'}}>
               <Typography component={'label'} htmlFor="id" sx={{color: '#000000', marginRight: '20px', fontSize: '16px',width: '100px', display: 'block'}}>ID</Typography>  

               <Input 
                type="number"
                id="id"
                name="id"
                sx={{width:'400px'}}
                value={id}
                /* e == event ek, onchange ek athule function ekk tmi  cl krl tiyenn */
                onChange={e => setId(e.target.value)}
               />
            </Grid2>

            <Grid2 item xs={12} sm={6} sx={{display:'flex'}}>
               <Typography component={'label'} htmlFor="id" sx={{color: '#000000', marginRight: '20px', fontSize: '16px',width: '100px', display: 'block'}}>Name</Typography>  

               <Input 
                type="text"
                id="name"
                name="name"
                sx={{width:'400px'}}
                value={name}
                /* e == event ek, onchange ek athule function ekk tmi  cl krl tiyenn */
                onChange={e => setName(e.target.value)}
               />
            </Grid2>

            <Button sx={{margin: 'auto', marginBottom: '20px', backgroundColor: '#00c6e6', color: '#000000', marginLeft: '15px', marginTop:'20px', 
                '&:hover': {opacity: '0.7', backgroundColor:'#00c6e6'}}} onClick={() => { isEdit ? updateUser({id, name}) : addUser({id, name})
                }}> {isEdit ? 'Update' : 'Add'} </Button>
        </Grid2>
    );
}

/* me widihata export karama apita wena onima component ekak  idann me file rk withrak call krl access krgnnd puluwn */
export default UserForm;