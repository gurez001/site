import { Button } from '@material-ui/core'
import React from 'react'

const ProductLabelForm = ({inputValue,handleChange,handleSubmit}) => {
  return (
  <>
   <form onSubmit={handleSubmit}>
        <div className="attribute-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={inputValue.name}
            onChange={handleChange}
          />
        </div>
        <div className="attribute-input">
          <label htmlFor="slug">Slug</label>
          <input
            type="text"
            name="slug"
            value={inputValue.slug}
            onChange={handleChange}
          />
        </div>
        <div className="attribute-input">
          <label htmlFor="slug">Description</label>
          <textarea
            name="description"
            value={inputValue.description}
            onChange={handleChange}
          />
        </div>
        <div className="attribute-input">
          <label htmlFor="SwatchLabel">Swatch Label</label>
          <input type='text'
            name="SwatchLabel"
            value={inputValue.SwatchLabel}
            onChange={handleChange}
          />
        </div>
        <div >
            <label htmlFor="SwatchLabel">Swatch Color</label><br/>
          <input type='color'
            name="color"
            value={inputValue.color}
            onChange={handleChange}
          />
        </div>
        <Button type='submit'>Add New Label</Button>
        </form>
  </>
  )
}

export default ProductLabelForm
