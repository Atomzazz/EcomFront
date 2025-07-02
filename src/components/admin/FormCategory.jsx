import React, { useState, useEffect } from 'react';
import { createCategory, listCategory, deleteCategory } from '../../api/Category';
import useEcomStore from '../../store/ecom-stotr';
import { toast } from 'react-toastify';

const FormCategory = () => {
  const token = useEcomStore((e) => e.token);
  const [name, setName] = useState('');
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.warning('Please fill in the category name');
    }

    const checkDuplicate = categories.some(
      (category) => category.name.toLowerCase() === name.toLowerCase()
    );
    if (checkDuplicate) {
      return toast.error('Category already exists!');
    }

    try {
      const res = await createCategory(token, { name });
      toast.success(`Add Category "${res.data.name}" success!`);
      setName('');
      getCategory(token);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add category');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory(token, id);
      toast.success(`Deleted Category "${res.data.name}"`);
      getCategory(token);
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete category');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">จัดการหมวดหมู่สินค้า</h1>

      <form className="flex flex-col sm:flex-row gap-2 mb-6" onSubmit={handleSubmit}>
        <input
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-teal-400"
          type="text"
          placeholder="เพิ่มหมวดหมู่ใหม่"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          เพิ่ม
        </button>
      </form>


      <ul className="divide-y divide-gray-100">
        {categories.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-3">
            <span className="text-gray-700">{item.name}</span>
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
            >
              ลบ
            </button>
          </li>
        ))}
        {categories.length === 0 && (
          <li className="text-gray-500 text-center py-4">ไม่มีหมวดหมู่ในระบบ</li>
        )}
      </ul>
    </div>
  );
};

export default FormCategory;
