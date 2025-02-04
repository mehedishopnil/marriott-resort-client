
const CreateNewList = () => {

     const handleAddProduct = async (event) => {
       event.preventDefault();
   
       try {
         const form = event.target;
         const guests = form.guests.value;
         const bedrooms = form.bedrooms.value;
         const beds = form.beds.value;
         const bathrooms = form.bathrooms.value;
         const placeType = form.placeType.value;
         const name = form.name.value;
         const location = form.location.value;
         const category = form.category.value;
         const image = form.image.value;
         const description = form.description.value;
         const totalData = {guests,
           bedrooms,
           beds,
           bathrooms,
           placeType,
           location,
           name,
           category,
           image,
           description}
           
         const response = await fetch('https://airbnb-server-theta.vercel.app/hotelListData', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(totalData),
         });
   
         if (response.ok) {
           // Handle successful submission, e.g., redirect or show a success message
           console.log('Form submitted successfully');
           alert('Form submitted successfully');
           console.log(totalData);
           form.reset()
         } else {
           // Handle errors, e.g., show an error message
           console.error('Form submission failed');
         }
       } catch (error) {
         console.error('Error submitting form:', error);
       }
     };
   
   
     
   
     return (
       <div className="hero w-full h-auto p-10 shadow-2xl rounded bg-base-200">
         <div className="hero-content flex-col lg:flex-row-reverse">
           <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
             <h1 className="text-center text-2xl font-bold pt-4">
               Create a new list
             </h1>
   
             <form className="card-body" onSubmit={handleAddProduct}>
               <div>
                 <div className="form-control">
                   <h2 className="label text-base">Share some basic information about your place:</h2>
                   <div className="grid grid-cols-4 gap-5">
                     <label className="label">
                       <span className="label-text">Guests</span>
                     </label>
                     <input
                       type="number"
                       placeholder="Enter number of guests"
                       name="guests"
                       className="input w-[70px] input-bordered"
                     />
   
                     <label className="label">
                       <span className="label-text">Bedrooms</span>
                     </label>
                     <input
                       type="number"
                       placeholder="Enter number of bedrooms"
                       name="bedrooms"
                       className="input w-[70px] input-bordered"
                     />
   
                     <label className="label">
                       <span className="label-text">Beds</span>
                     </label>
                     <input
                       type="number"
                       placeholder="Enter number of beds"
                       name="beds"
                       className="input w-[70px] input-bordered"
                     />
   
                     <label className="label">
                       <span className="label-text">Bathrooms</span>
                     </label>
                     <input
                       type="number"
                       placeholder="Enter number of bathrooms"
                       name="bathrooms"
                       className="input w-[70px] input-bordered"
                     />
                   </div>
                 </div>
   
                 <div className="form-control">
                   <label className="label text-base">
                     What type of place will guests have?
                   </label>
                   <select
                     name="placeType"
                     className="select select-bordered"
                     defaultValue=""
                   >
                     <option value="" disabled>
                       Select an option
                     </option>
                     <option value="entirePlace">An entire place</option>
                     <option value="room">A room</option>
                     <option value="sharedRoom">A shared room</option>
                   </select>
                 </div>
   
                 <div className="form-control">
                   <label className="label text-base">Where is your place located?</label>
                   <input
                     type="text"
                     placeholder="Enter location name"
                     name="location"
                     className="input input-bordered"
                   />
                 </div>
   
                 <div className="form-control">
                   <label className="label text-base">Input a nice name:</label>
                   <input
                     type="text"
                     placeholder="Name"
                     name="name"
                     className="input input-bordered"
                   />
                 </div>
   
                 <div className="form-control">
                   <label className="label text-base">
                     Choose the Category
                   </label>
                   <select
                     name="category"
                     className="select select-bordered"
                     defaultValue=""
                   >
                     <option value="" disabled>
                       Select an option
                     </option>
                     <option value="vacation">Vacation</option>
                     {/* Add more categories as needed */}
                   </select>
                 </div>
   
                 <div className="form-control">
                   <label className="label text-base">Input Image Link</label>
                   <input
                     type="text"
                     placeholder="Enter image URL"
                     name="image"
                     className="input input-bordered"
                   />
                 </div>
   
                 <div className="form-control">
                   <label className="label text-base">Description</label>
                   <textarea
                     placeholder="Enter a detailed description of your place..."
                     name="description"
                     className="textarea h-32 resize-none input-bordered"
                   ></textarea>
                 </div>
   
                 <div className="form-control mt-6">
                   <input
                     type="submit"
                     value="Add To List"
                     className="btn bg-blue-500 text-white hover:bg-blue-600"
                   />
                 </div>
               </div>
               <div className="text-center"></div>
             </form>
           </div>
   
           <div className="text-center lg:text-left">
             <img src="" alt="" />
           </div>
         </div>
       </div>
     );
   };
   
   export default CreateNewList;
   