import React from 'react'
import { useState } from 'react'
import {toast} from "react-toastify";
import CategoryForm from './CategoryForm';
import Modal from '../../components/Modal';
import AdminMenu from './AdminList';
import {useCreateCategoryMutation,useDeleteCategoryMutation,useFetchCategoriesQuery,useUpdateCategoryMutation} from '../../redux/api/categoryApiSlice'
const CategoryList = () => {
    const {data:categories} = useFetchCategoriesQuery();
    console.log(categories);
    const [name,setName] =useState('');
    const [selectedCategory, setselectedCategory] = useState(null);
    const [updateName,setUpdateName]= useState('');
    const [modalVisible,setmodalVisible] = useState(false);
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const handleCreateCategory = async(e) =>{
            e.preventDefault();
            if(!name){
                toast.error('Category name is required');
                return;
            }
            try{
                const result = await createCategory({name}).unwrap();
                if(result.error){
                    toast.error(result.error);
                }
                else{
                    setName("");
                    toast.success(`${result.name} is created`);
                }
            }catch(error){
                console.log(error);
                toast.error('Creating category failed, try again.')
            }
    }
    const handleUpdateCategory = async(e) =>{
        e.preventDefault();
        if(!updateName){
            toast.error('Category name is required');
            return;
        }
        try{
            const result = await updateCategory({categoryId:selectedCategory._id,updateCategory:{
                name:updateName
            }}).unwrap();
            if(result.error){
                toast.error(result.error);
            }
            else{
                
                toast.success(`${result.name} is updated`);
                setselectedCategory(null);
                setUpdateName('');
                setmodalVisible(false);

            }
        }catch(error){
            console.log(error);
            toast.error('Updating category failed, try again.')
        }
}
const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setselectedCategory(null);
        setmodalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Tray again.");
    }
  };


  return (

<>
<div className='bg-gradient-to-br from-blue-500 to-green-500 h-[100vh] flex flex-col  items-center pt-[10vh]  '>
<div className='text-3xl text-white font-extrabold pb-[5vh]'>Categories List</div>
<AdminMenu/>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
<br/>
<hr/>
<div className='flex flex-wrap gap-4 w-[50vw] justify-center'>
    {categories?.map((category)=>(
        <div key={category._id}>
            <button className="bg-red-500 rounded w-[7rem] h-[3rem] hover:to-pink-700 hover:opacity-4" onClick={()=>{
                {
                    setmodalVisible(true);
                    setselectedCategory(category);
                    setUpdateName(category.name);
                }
            }}>{category.name}</button>
        </div>
    ))}
        <Modal isOpen={modalVisible} onClose={() => setmodalVisible(false)}>
          <CategoryForm
            value={updateName}
            setValue={(value) => setUpdateName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
</div>
</div>

</>
  )
}

export default CategoryList