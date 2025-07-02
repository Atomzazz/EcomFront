import React, { useEffect, useState } from 'react'
import { Trash2, PlusCircle, X, Star, StarOff } from 'lucide-react'
import useEcomStore from '../../store/ecom-stotr'
import { toast } from 'react-toastify'

const ManageHomeImages = () => {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  const token = useEcomStore((s) => s.token)
  const images = useEcomStore((s) => s.homeImages)
  const fetchHomeImages = useEcomStore((s) => s.fetchHomeImages)
  const addHomeImage = useEcomStore((s) => s.addHomeImage)
  const removeHomeImage = useEcomStore((s) => s.removeHomeImage)
  const toggleFeaturedHomeImage = useEcomStore((s) => s.toggleFeaturedHomeImage)

  useEffect(() => {
    fetchHomeImages()
  }, [])

  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setPreview('')
    }
  }, [file])

  const handleUpload = async () => {
    if (!title || !file || !token) {
      toast.error('กรุณากรอกชื่อรูปและเลือกรูปภาพ')
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result
        await addHomeImage({ title, image: base64Image }, token)
        toast.success('อัปโหลดสำเร็จ')
        setTitle('')
        setFile(null)
        setPreview('')
      } catch {
        toast.error('เกิดข้อผิดพลาดในการอัปโหลด')
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDelete = async (id) => {
    if (window.confirm('คุณแน่ใจว่าต้องการลบรูปภาพนี้?')) {
      try {
        await removeHomeImage(id, token)
        toast.success('ลบสำเร็จ')
        fetchHomeImages()
      } catch {
        toast.error('ลบไม่สำเร็จ')
      }
    }
  }

  const handleToggle = async (id) => {
    try {
      await toggleFeaturedHomeImage(id, token)
      toast.success('เปลี่ยนสถานะรูปภาพแล้ว')
    } catch {
      toast.error('เปลี่ยนสถานะไม่สำเร็จ')
    }
  }

  return (
    <div className="container mx-auto p-3 sm:p-6 text-neutral-800 max-w-7xl">
      {/* ฟอร์ม */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 border border-neutral-200">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">เพิ่มรูปภาพหน้าแรก</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="ชื่อรูปภาพ"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-neutral-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm sm:text-base"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border border-neutral-300 rounded-md px-4 py-2 bg-white text-sm sm:text-base"
          />
        </div>

        {preview && (
          <div className="mt-4">
            <label className="text-sm text-neutral-600">ตัวอย่างรูป:</label>
            <div className="mt-2 flex justify-center">
              <img 
                src={preview} 
                alt="preview" 
                className="h-32 sm:h-40 w-auto max-w-full rounded-md border object-contain" 
              />
            </div>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={handleUpload}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-md shadow inline-flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <PlusCircle size={18} />
            อัปโหลดรูปภาพ
          </button>
        </div>
      </div>

      {/* ตาราง - Desktop */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
        <h2 className="text-xl font-semibold mb-4">รายการรูปภาพ</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-sm rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-emerald-600 text-white text-center">
                <th className="p-3 border">#</th>
                <th className="p-3 border">รูปภาพ</th>
                <th className="p-3 border">ชื่อ</th>
                <th className="p-3 border">สถานะ</th>
                <th className="p-3 border">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {images.map((img, index) => (
                <tr key={img.id} className="hover:bg-neutral-100 transition text-center">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="h-20 w-20 object-cover mx-auto rounded-md shadow cursor-pointer hover:opacity-80"
                      onClick={() => setSelectedImage(img)}
                    />
                  </td>
                  <td className="p-3 border">{img.title}</td>
                  <td className="p-3 border">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${
                        img.is_featured ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {img.is_featured ? 'แสดงบนหน้าแรก' : 'ไม่แสดง'}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleToggle(img.id)}
                        className={`text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm ${
                          img.is_featured ? 'bg-gray-400 hover:bg-gray-500' : 'bg-yellow-400 hover:bg-yellow-500'
                        }`}
                      >
                        {img.is_featured ? <StarOff size={16} /> : <Star size={16} />}
                        {img.is_featured ? 'ปิด' : 'เปิด'}
                      </button>
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm"
                      >
                        <Trash2 size={16} />
                        ลบ
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {images.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-neutral-500 py-6">
                    ยังไม่มีรูปภาพ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* การ์ด - Mobile/Tablet */}
      <div className="lg:hidden bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-neutral-200">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">รายการรูปภาพ</h2>
        <div className="space-y-4">
          {images.map((img, index) => (
            <div key={img.id} className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* รูปภาพ */}
                <div className="flex-shrink-0 self-center">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="h-24 w-24 sm:h-20 sm:w-20 object-cover rounded-md shadow cursor-pointer hover:opacity-80 mx-auto"
                    onClick={() => setSelectedImage(img)}
                  />
                </div>
                
                {/* ข้อมูล */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-sm text-neutral-500">#{index + 1}</span>
                    <h3 className="font-medium text-neutral-800">{img.title}</h3>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium w-fit ${
                        img.is_featured ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {img.is_featured ? 'แสดงบนหน้าแรก' : 'ไม่แสดง'}
                    </span>
                  </div>
                  
                  {/* ปุ่มจัดการ */}
                  <div className="flex flex-col xs:flex-row gap-2 pt-2">
                    <button
                      onClick={() => handleToggle(img.id)}
                      className={`text-white px-3 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium ${
                        img.is_featured ? 'bg-gray-400 hover:bg-gray-500' : 'bg-yellow-400 hover:bg-yellow-500'
                      }`}
                    >
                      {img.is_featured ? <StarOff size={16} /> : <Star size={16} />}
                      {img.is_featured ? 'ปิดการแสดง' : 'เปิดการแสดง'}
                    </button>
                    <button
                      onClick={() => handleDelete(img.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Trash2 size={16} />
                      ลบรูปภาพ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="text-center text-neutral-500 py-8">
              <div className="text-4xl mb-2">📷</div>
              <p>ยังไม่มีรูปภาพ</p>
            </div>
          )}
        </div>
      </div>

      {/* Popup แสดงรูปใหญ่ */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-h-[90vh] max-w-[90vw] w-auto h-auto rounded-lg border-4 border-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-colors"
            >
              <X size={18} />
            </button>
            {/* ชื่อรูป */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 rounded-b-lg">
              <p className="text-center font-medium">{selectedImage.title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageHomeImages