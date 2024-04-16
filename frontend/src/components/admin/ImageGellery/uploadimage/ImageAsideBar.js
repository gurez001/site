// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateImageText } from "../../../../actions/imageGelleryAction";
// import Loader from "../../../layout/loader/Loader";
// import { Button } from "@material-ui/core";

// export const ImageAsideBar = ({ filterImage, backend }) => {
//   const dispatch = useDispatch();
//   const { loading, images } = useSelector((state) => state.updateImageText);
//   const [inputValue, setInputValue] = useState({
//     altText: "",
//     title: "",
//     caption: "",
//   });

//   const inputHandle = (e) => {
//     const { name, value } = e.target;
//     setInputValue({ ...inputValue, [name]: value });
//   };

//   const inputFormHandler = (e) => {
//     e.preventDefault();
//     const { altText, title, caption } = inputValue;

//     dispatch(updateImageText(altText, title, caption, filterImage[0]._id));
//   };

//   useEffect(() => {
//     if (filterImage) {
//       setInputValue({
//         altText: filterImage[0]?.altText || "",
//         title: filterImage[0]?.title || "",
//         caption: filterImage[0]?.caption || "",
//       });
//     }
//   }, [filterImage]);

//   return (
//     <>
//       <div className="gellery-details">
//         {!backend ? (
//           <>
//             {/* {loading?<Loader/>:(<>
//               {filterImage &&
//                 filterImage.map((item, i) => (
//                   <div key={i}>
//                     <p>
//                       <span>Id:</span>
//                       <span>{item._id}</span>
//                     </p>
//                     <p>
//                       <span>name:</span>
//                       <span>{item.filename}</span>
//                     </p>
//                     <p>
//                       <span>Image: type:</span>
//                       <span>{item.mimetype}</span>
//                     </p>
//                     <p>
//                       <span>Orignal name:</span>
//                       <span>{item.originalname}</span>
//                     </p>
//                     <p>
//                       <span>Size:</span>
//                       <span>{item.size}</span>
//                     </p>
//                     {item.altText ? (
//                       <p>
//                         <span>Alternative Tex:</span>
//                         <span>{item.altText}</span>
//                       </p>
//                     ) : null}
//                     {item.title ? (
//                       <p>
//                         <span>Tittle:</span>
//                         <span>{item.title}</span>
//                       </p>
//                     ) : null}
//                     {item.caption ? (
//                       <p>
//                         <span>Caption:</span>
//                         <span>{item.caption}</span>
//                       </p>
//                     ) : null}
//                   </div>
//                 ))}
//              </>)} */}
//           </>
//         ) : (
//           <>
//             {loading ? (
//               <Loader />
//             ) : (
//               <>
//                 {filterImage &&
//                   filterImage.map((item, i) => (
//                     <div key={i}>
//                       <p>
//                         <span>Id:</span>
//                         <span>{item._id}</span>
//                       </p>
//                       <p>
//                         <span>name:</span>
//                         <span>{item.filename}</span>
//                       </p>
//                       <p>
//                         <span>Image: type:</span>
//                         <span>{item.mimetype}</span>
//                       </p>
//                       <p>
//                         <span>Orignal name:</span>
//                         <span>{item.originalname}</span>
//                       </p>
//                       <p>
//                         <span>Size:</span>
//                         <span>{item.size}</span>
//                       </p>
//                       {item.altText ? (
//                         <p>
//                           <span>Alternative Tex:</span>
//                           <span>{item.altText}</span>
//                         </p>
//                       ) : null}
//                       {item.title ? (
//                         <p>
//                           <span>Tittle:</span>
//                           <span>{item.title}</span>
//                         </p>
//                       ) : null}
//                       {item.caption ? (
//                         <p>
//                           <span>Caption:</span>
//                           <span>{item.caption}</span>
//                         </p>
//                       ) : null}
//                     </div>
//                   ))}
//               </>
//             )}
//           </>
//         )}
//       </div>
//       <div className="gellery-details-form">
//         {filterImage.length > 0 ? (
//           <>
//             <form onSubmit={inputFormHandler}>
//               {loading ? (
//                 <Loader />
//               ) : (
//                 <>
//                   <div>
//                     <label htmlFor="altText">Alternative Text</label>
//                     <input
//                       type="text"
//                       name="altText"
//                       value={inputValue.altText}
//                       onChange={(e) => inputHandle(e)}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="title">Title</label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={inputValue.title}
//                       onChange={(e) => inputHandle(e)}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="caption">Caption</label>
//                     <input
//                       type="text"
//                       name="caption"
//                       value={inputValue.caption}
//                       onChange={(e) => inputHandle(e)}
//                     />
//                   </div>
//                 </>
//               )}
//               <Button disabled={loading ? true : false} type="submit">
//                 Submit
//               </Button>
//             </form>
//           </>
//         ) : null}
//       </div>
//     </>
//   );
// };
