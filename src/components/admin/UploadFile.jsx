import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer'
import { deleteFiles, uploadfiles } from '../../api/product';
import useEcomStore from '../../store/ecom-stotr';
import { Loader } from 'lucide-react';

const UploadFile = ({ form, setForm }) => {
  const [isLoading, setIsLoading] = useState(false)
  const token = useEcomStore((e) => e.token)

  const handleOnChange = (e) => {
    const files = e.target.files
    if (!files) return
    setIsLoading(true)

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        toast.error(`ไฟล์ ${file.name} ไม่ใช่รูปภาพ`)
        return
      }

      Resize.imageFileResizer(
        file,
        720,
        720,
        'JPEG',
        100,
        0,
        async (data) => {
          try {
            const res = await uploadfiles(token, data)
            // ✅ ใช้ spread array สร้างใหม่ ไม่แก้ array เดิม
            setForm((prev) => ({
              ...prev,
              images: [...prev.images, res.data],
            }))
            toast.success('อัปโหลดรูปภาพสำเร็จ')
          } catch (err) {
            console.error(err)
            toast.error('อัปโหลดไม่สำเร็จ')
          } finally {
            setIsLoading(false)
          }
        },
        'base64'
      )
    })
  }

  const handleDelete = async (public_id) => {
    try {
      await deleteFiles(token, public_id)
      // ✅ สร้าง array ใหม่
      setForm((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.public_id !== public_id),
      }))
      toast.success('ลบรูปภาพเรียบร้อยแล้ว')
    } catch (err) {
      console.error(err)
      toast.error('ลบรูปภาพไม่สำเร็จ')
    }
  }
    
    return (
        <div className='my-2 sm:my-4 px-2 sm:px-0'>
            {/* Loading indicator - centered and responsive */}
            {isLoading && (
                <div className='flex justify-center items-center py-6 sm:py-8'>
                    <Loader className='animate-spin w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-blue-500' />
                </div>
            )}
            
            {/* Image grid - optimized for mobile and iPad */}
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4 mb-4'>
                {form.images.map((item, index) => (
                    <div className='relative group touch-manipulation' key={index}>
                        <img 
                            className="w-full aspect-square object-cover rounded-md sm:rounded-lg shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 sm:hover:scale-105" 
                            src={item.url} 
                            alt={`Upload ${index + 1}`}
                        />
                        <button
  type="button"
  onClick={() => handleDelete(item.public_id)}
className='absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer shadow-md transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100 active:scale-90 touch-manipulation'
  aria-label='Delete image'
>
                            ×
                        </button>
                    </div>
                ))}
            </div>
            
            {/* File input - mobile and iPad optimized */}
            <div className='w-full'>
                <label className='block w-full'>
                    <div className='border-2 border-dashed border-gray-300 hover:border-gray-400 active:border-blue-400 rounded-lg p-3 sm:p-4 md:p-6 text-center cursor-pointer transition-colors duration-200 touch-manipulation'>
                        <div className='flex flex-col items-center space-y-2'>
                            <svg className='w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' />
                            </svg>
                            <div className='text-xs sm:text-sm md:text-base text-gray-600'>
                                <span className='font-medium text-blue-600 hover:text-blue-700 block sm:inline'>เลือกไฟล์รูปภาพ</span>
                                <span className='block text-xs sm:text-sm text-gray-500 mt-1 sm:mt-0 sm:ml-1'>หรือลากและวางที่นี่</span>
                            </div>
                            <p className='text-xs text-gray-500'>PNG, JPG, GIF ขนาดไม่เกิน 10MB</p>
                        </div>
                    </div>
                    <input 
                        type="file"
                        onChange={handleOnChange}
                        name='images'
                        multiple
                        accept='image/*'
                        className='sr-only'
                    />
                </label>
            </div>
        </div>
    )
}

export default UploadFile