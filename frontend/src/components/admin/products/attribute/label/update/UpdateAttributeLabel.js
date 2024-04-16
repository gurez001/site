import React, { useEffect, useMemo, useState } from 'react'
import ProductLabelForm from '../assets/ProductLabelForm'
import { Aside } from '../../../../aside/Aside'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { ClearError, GetSingleLabel, UpdateProductLabelAction } from '../../../../../../actions/ProductAction';
import { UPDATE_LABEL_RESET } from '../../../../../../constants/ProductConstants';

const UpdateAttributeLabel = () => {
    const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const navigate=useNavigate();
 
const {loading,data,error,success,isupdate}=useSelector((state)=>state.adminProductLabel)

  const [inputValue, setinputValue] = useState({
    name: "",
    slug: "",
    description: "",
    SwatchLabel: "",
    color: "",
  });
  const handleChange = (e) => {
  setinputValue({...inputValue,[e.target.name]:e.target.value})
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   dispatch(UpdateProductLabelAction(id,inputValue))
  };

useMemo(()=>{
  dispatch(GetSingleLabel(id))  
},[])

useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch(ClearError())
    }
  if(data){
    setinputValue({
        name: data && data.name,
        slug: data && data.slug,
        description: data && data.description,
        SwatchLabel: data && data.SwatchLabel,
        color: data && data.color,
    })
  }
  if(success){
    alert.success("product label update successfully");
    navigate('/admin/product-attribute');
    dispatch({type:UPDATE_LABEL_RESET})
  }

},[dispatch,error,alert,data,success,success,navigate])

  return(
    <div className="admin-page">
        <div className="admin-page-area">
          <Aside />
          <div id="ad-body">
            <div className="ad-cont">
              <section className="page-section">
                <div className="all-products-cont">
                  <div className="all-products-content-area">
                    <div className="all-products-title">
                      <h1>Update Product Attribute</h1>
                    </div>
                    <ProductLabelForm
                      inputValue={inputValue}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UpdateAttributeLabel