import React, { useEffect, useState } from 'react'
import './Meme.css'

function Meme() {

    const [data,setData] = useState([])
    const [name,setName] = useState("")
    const [url,setUrl] = useState("")
    const [caption,setCaption] = useState("")
    const [oldname,setOldName] = useState("")
    const [toggle,setToggle] = useState(0)
    const [id,setId] = useState("")
    const [togdel,setTogDel] = useState(1)

    //fetching all the memes
    useEffect(()=>{
        fetch('http://localhost:8081/memes')
        .then(res=>res.json())
        .then(data=>{
            setData(data.message)
        })
        .catch(err=>{
            console.log(err)
        })
    },[name,togdel])

    //posting the meme
    const postData = ()=>{
        fetch('http://localhost:8081/memes',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                caption,
                url
            })
        })
        .then(res=>res.json())
        .then(data=>{
            setName("")
            setUrl("")
            setCaption("")
            if(data.error) {
                alert(data.error)
            }
            else console.log(data.id)
        })
    }

    //fetching single meme
    const getEdit = (idx)=>{
        fetch(`http://localhost:8081/memes/${idx}`)
        .then(res=>res.json())
        .then(data=>{
            setToggle(1)
            setId(idx)
            setOldName(data.message.name)
            setName(data.message.name)
            setUrl(data.message.url)
            setCaption(data.message.caption)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    // updating the meme
    const postEdit = ()=>{
        if(name===oldname){
            fetch(`http://localhost:8081/memes/${id}`,{
                method:"post",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    caption,
                    url
                })
            })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data)
                if(data.error) {
                    return alert(data.error)
                }
                setName("")
                setUrl("")
                setCaption("")
                setToggle(0)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            alert("Name cannot be changed")
        }
    }

    //deleting the meme
    const postDelete = (idx)=>{
        fetch("http://localhost:8081/memes/delete",{
            method:"delete",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:idx
            })
        })
        .then(res=>res.json())
        .then(data=>{
            setTogDel(!togdel)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <h1 className="text-center">XMeme Stream</h1>

            <form className="mt-5 container-fluid">
                <div>Name</div>
                <input 
                    type="text"
                    className="inputWidth mb-2"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <div>Title</div>
                <input
                    type="text" 
                    className="inputWidth mb-2"
                    value={caption}
                    onChange={(e)=>setCaption(e.target.value)}    
                />
                <div>Meme URL</div>
                <input 
                    type="text"
                    className="inputWidth"
                    value={url}
                    onChange={(e)=>setUrl(e.target.value)}    
                />
                <br></br>
                {
                    toggle?
                        <div className="btn btn-primary mt-5" onClick={()=>postEdit()}>Edit</div>
                    : 
                        <div className="btn btn-primary mt-5" onClick={()=>postData()}>Post a Meme</div>   
                }
                
                
            </form>

                <div className="container-fluid mt-5">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        { (data) &&  (data.map((res,idx)=>{
                            return (
                                <div className="col" key={idx}> 
                                    <div className="card h-100 cardBorder">
                                        <div className="card-body">
                                            <div className="text-end">
                                                <i className="far fa-edit pointer" onClick={()=>getEdit(res._id)}></i>
                                            </div>
                                            <div className="text-end">
                                                <i className="far fa-trash-alt pointer" onClick={()=>postDelete(res._id)}></i>
                                            </div>
                                            <h4 className="card-title">{res.name}</h4>
                                            <p className="card-text">
                                            {res.caption}
                                            </p>
                                        </div>
                                        <img
                                            src={res.url}
                                            className="card-img-top cardBorder"
                                            alt="no image found"
                                        />
                                    </div>
                                </div>
                            )
                        }))}
                        
                        
                    </div>
                </div>
        </div>
    )
}

export default Meme
