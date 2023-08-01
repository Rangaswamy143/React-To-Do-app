import React ,{ useState} from 'react'

const Message = ()=> {

const [message,setMessage]= useState({text:"", id:""});
const [lists,setLists]= useState([]);
const [editingItem, setEditingItems]= useState({id:"",isEditing:false,});

const changeMessage=(e)=>{
setMessage({...message, text:e.target.value})
}

const handleSubmit =(e)=>{
e.preventDefault();
let newTodo ={ text:message.text, id:new Date().getTime()}
    setLists([...lists, newTodo]);
    setMessage({text:"", id:""});   
    console.log(newTodo)
};

const handleDelete = (id) =>{
let newTodos= lists.filter((eachItem) => {
return eachItem.id !== id });
setLists(newTodos)
console.log(newTodos)
};

const changeEditState = (id) =>{
setEditingItems ({ ...editingItem, id:id, isEditing:true });
const editableItem = lists.find((eachItem) => eachItem.id == id);
setMessage ({ ...message, text:editableItem.text, id:editableItem.id })
};

const handleEdit= (e) =>{
e.preventDefault();

let newTodos= lists.map((eachItem)=>{
    if(eachItem.id == editingItem.id){
        return{ text:message.text, id:editingItem.id, };
    } else{ 
        return eachItem;
    }
});
setLists(newTodos)
setMessage({text:"", id:"",})
setEditingItems({id:"", isEditing:false,})
};

return (
<div className='container-fluid mt-5'>
<h3>My to do app</h3>
<form className='btn-group w-50'>
<input  class="form-control form-control-lg "
 type="text" name="message" id="message" placeholder="enter some text" value={message.text}
onChange={changeMessage}/>

{
editingItem.isEditing ? (<button className='btn btn-success' type='submit' onClick={handleEdit}>edit</button>)
                      : (<button className='btn btn-primary' type='submit' onClick={handleSubmit}>add</button>)
}
</form> 
  <div className='border border-secondary-subtle w-100 m-4 '></div>

<ul id='unorder' className="list-group w-50 list-group-flush shadow p-3 mb-5 bg-body-tertiary rounded">
{ lists.length == 0 && <h5 className='primary'>there is no items in the list</h5>}

{
lists.map((eachItem)=>{
const {text, id}= eachItem; 
 return (
 <li id='my-list' className='list-group-item bg-secondary-subtle' key={id}>
 <p>{text}</p>
 <div className='button-flex'>
 <button className='btn btn-info m-1' onClick={()=>changeEditState(id)}>edit</button>
<button className='btn btn-danger m-1' onClick={()=>handleDelete(id)}>detete</button>
 </div>   
 </li> 
);
})

}
</ul>
</div>
)};

export default Message