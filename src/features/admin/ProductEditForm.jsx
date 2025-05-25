import { Button, Input, Option, Select, Textarea, } from '@material-tailwind/react'
import { Formik } from 'formik'
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';
import { baseUrl } from '../../app/mainApi';
import { useUpdateProductMutation } from '../products/productApi';
import toast from 'react-hot-toast';

export const productSchema = Yup.object().shape({
  title: Yup.string().required('title is required'),
  description: Yup.string().required('description is required'),
  price: Yup.number().required('price is required'),
  category: Yup.string().required('category is required'),
  brand: Yup.string().required('brand is required'),
  image: Yup.mixed().test('fileType', 'Unsupported File Format', (value) => {
    if (!value) return true;
    return ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(value.type);
  })
})

export default function ProductEditForm({ product }) {
  const nav = useNavigate();

  const { user } = useSelector((state) => state.userSlice);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();


  return (
    <div className='max-w-[400px] mt-10 pb-5'>

      <Formik
        initialValues={{
          title: product.title,
          description: product.description,
          price: product.price,
          image: '',
          category: product.category,
          brand: product.brand,
          imagePrev: product.image

        }}
        onSubmit={async (val) => {
          const formData = new FormData();
          formData.append('title', val.title);
          formData.append('description', val.description);
          formData.append('price', Number(val.price));
          formData.append('category', val.category);
          formData.append('brand', val.brand);
          try {
            if (val.image) {
              formData.append('image', val.image);
              await updateProduct({
                id: product._id,
                // token: user.token,
                body: formData
              }).unwrap();
            } else {
              await updateProduct({
                id: product._id,
                token: user?.token,
                body: formData
              }).unwrap();
            }
            toast.success('successfully updated');
            nav(-1);

          } catch (err) {


            toast.error(err.data?.message || err.data)

          }


        }}
        validationSchema={productSchema}
      >
        {({ handleSubmit, handleChange, touched, values, setFieldValue, errors }) => (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <Input
                onChange={handleChange}
                value={values.title}
                label='Title'
                name='title' />
              {touched.title && errors.title && <p className='text-red-500'>{errors.title}</p>}
            </div>
            <div>
              <Input
                onChange={handleChange}
                value={values.price}
                label='Price'
                name='price' />
              {touched.price && errors.price && <p className='text-red-500'>{errors.price}</p>}
            </div>


            <div>
              <Select
                value={values.category}
                onChange={(e) => setFieldValue('category', e)}
                label="Select Category">
                <Option value="men's clothing">Men's Clothing</Option>
                <Option value="women's clothing">Women's Clothing</Option>
                <Option value="jewelery">Jewelery</Option>
                <Option value="electronics">Electronics</Option>

              </Select>
              {touched.category && errors.category && <p className='text-red-500'>{errors.category}</p>}
            </div>
            <div >
              <Select
                value={values.brand}
                onChange={(e) => setFieldValue('brand', e)}
                label="Select Brand">
                <Option value='Apple'>Apple</Option>
                <Option value='Samsung'>Samsung</Option>
                <Option value='Addidas'> Addidas</Option>
                <Option value='Google'>Google</Option>
                <Option value='Tanishq'>Tanishq</Option>
              </Select>
              {touched.brand && errors.brand && <p className='text-red-500'>{errors.brand}</p>}
            </div>

            <Textarea
              onChange={handleChange}
              value={values.description}
              label='Description'
              name='description' />
            {touched.description && errors.description && <p className='text-red-500'>{errors.description}</p>}

            <div>
              <Input
                label='Image'
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue('imagePrev', URL.createObjectURL(file));
                  setFieldValue('image', file);
                }}
                name='image'
                type='file'
              />
              {touched.image && errors.image && <p className='text-red-500'>{errors.image}</p>}


            </div>
            <div>


              {!errors.image && values.imagePrev && <img className='w-[200px] h-[200px] object-cover' src={values.image ? values.imagePrev : `${baseUrl}${values.imagePrev}`} alt="" />}
            </div>




            <Button loading={isLoading} type='submit'>Submit</Button>


          </form>
        )}
      </Formik>



    </div>
  )
}
