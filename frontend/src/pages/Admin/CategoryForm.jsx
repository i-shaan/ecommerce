import React from 'react'

const CategoryForm = ({value,setValue,handleSubmit,buttonText="Submit",handleDelete}) => {
  return (
  
    <div className='p-3'>
        <form onSubmit={handleSubmit} className="space-y-3 flex justify-center flex-col items-center gap-y-3 ">
            <input type="text" className='py-3 px-4 w-[50vw] bg-blue-200  ' placeholder='Enter new Category' value={value} onChange={(e)=> setValue(e.target.value)}/>
            <div className="flex justify-between">
            <button  className='bg-gradient-to-br from-purple-500 to-pink-500 hover:to-pink-700 hover:opacity-4  w-[8rem] h-[3rem] rounded-2xl'>{buttonText}</button>
            {handleDelete && (
                <button type="button" onClick={handleDelete} className="bg-gradient-to-br from-purple-500 to-pink-500 hover:to-pink-700 hover:opacity-4  w-[8rem] h-[3rem] rounded-2xl">Delete</button>
            )}
            </div>

        </form>

    </div>
  
  )
}

export default CategoryForm
// const CategoryForm = ({
//   value,
//   setValue,
//   handleSubmit,
//   buttonText = "Submit",
//   handleDelete,
// }) => {
//   return (
//     <div className="p-3">
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           className="py-3 px-4 border rounded-lg w-full"
//           placeholder="Write category name"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//         />

//         <div className="flex justify-between">
//           <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50">
//             {buttonText}
//           </button>

//           {handleDelete && (
//             <button
//               onClick={handleDelete}
//               className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
//             >
//               Delete
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CategoryForm;