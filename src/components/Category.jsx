import React, { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";



function Category() {
  const [data, setData] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [subSubcategories, setSubSubcategories] = useState([]);
  const [editingType, setEditingType] = useState(null);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [newSubSubcategory, setNewSubSubcategory] = useState('');
  const [showAddCategoryInput, setShowAddCategoryInput] = useState(false);
  const [showAddSubcategoryInput, setShowAddSubcategoryInput] = useState(false);
  const [showAddSubSubcategoryInput, setShowAddSubSubcategoryInput] = useState(false);
  const [UniqueId,setUniqueId] = useState('')

  const fetchData = async () => {
    try {
      const response = await fetch('http://135.181.19.83:5035/api/get-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const result = await response.json();
      setData(result);
   
      // console.log(data);
      // console.log(UniqueId);
      setCategoriesData(transformCategories(result.categories));
      setUniqueId(result.unique_id);


    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
 

  const UpdateData = async () => {
 
  };





  const transformCategories = (data) => {
    const categoriesMap = {};
    
    data.forEach(item => {
      if (!categoriesMap[item.category]) {
        categoriesMap[item.category] = { 
          name: item.category,
          subcategories: {}
        };
      }
      if (item.sub_category) {
        if (!categoriesMap[item.category].subcategories[item.sub_category]) {
          categoriesMap[item.category].subcategories[item.sub_category] = {
            name: item.sub_category,
            subSubcategories: []
          };
        }
        if (item.sub_sub_category) {
          categoriesMap[item.category].subcategories[item.sub_category].subSubcategories.push(item.sub_sub_category);
        }
      }
    });

    return Object.values(categoriesMap).map(cat => ({
      name: cat.name,
      subcategories: Object.values(cat.subcategories).map(sub => ({
        name: sub.name,
        subSubcategories: sub.subSubcategories
      }))
    }));
  };

  useEffect(() => {
    fetchData(); 
    // setUniqueId(data.unique_id);

  }, []);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
    const category = categoriesData.find(cat => cat.name === selected);
    setSubcategories(category ? category.subcategories : []);
    setSelectedSubcategory('');
    setSubSubcategories([]);
  };

  const handleSubcategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedSubcategory(selected);
    const subcategory = subcategories.find(sub => sub.name === selected);
    setSubSubcategories(subcategory ? subcategory.subSubcategories : []);
  };

  const handleEdit = (type) => {
    if (type === 'category') {
      setNewName(selectedCategory);
    } else if (type === 'subcategory') {
      setNewName(selectedSubcategory);
    } else if (type === 'subsubcategory') {
      setNewName(subSubcategories[0]); 
    }
    setEditingType(type);
  };

  const saveName = () => {
    let updatedCategoriesData = [...categoriesData];

    if (editingType === 'category') {
      const categoryIndex = updatedCategoriesData.findIndex(cat => cat.name === selectedCategory);
      if (categoryIndex !== -1) {
        updatedCategoriesData[categoryIndex].name = newName; 
      }
      setSelectedCategory(newName);
    } else if (editingType === 'subcategory') {
      const categoryIndex = updatedCategoriesData.findIndex(cat => cat.name === selectedCategory);
      const subcategoryIndex = updatedCategoriesData[categoryIndex].subcategories.findIndex(sub => sub.name === selectedSubcategory);
      if (subcategoryIndex !== -1) {
        updatedCategoriesData[categoryIndex].subcategories[subcategoryIndex].name = newName; 
      }
      setSelectedSubcategory(newName);
    } else if (editingType === 'subsubcategory') {
      const categoryIndex = updatedCategoriesData.findIndex(cat => cat.name === selectedCategory);
      const subcategoryIndex = updatedCategoriesData[categoryIndex].subcategories.findIndex(sub => sub.name === selectedSubcategory);
      if (subcategoryIndex !== -1) {
        updatedCategoriesData[categoryIndex].subcategories[subcategoryIndex].subSubcategories[0] = newName; 
      }
    }

    setCategoriesData(updatedCategoriesData); 
    setEditingType(null); 
    setNewName('');
  };

  const handleSubmit = async () => {
    const dataToSend = {
      unique_id: UniqueId,
      categories: categoriesData
    };
  
    try {
      const response = await fetch('http://135.181.19.83:5035/api/update-category', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend) 
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const result = await response.json();
      

      setData(result);
      setCategoriesData(transformCategories(result.categories));
      toast.success('Data updated successfully!');
    } catch (err) {
      console.error('Error fetching data:', err);
    }
    
    console.log('Data to send:', JSON.stringify(dataToSend, null, 2));
  };
  

  const addCategory = () => {
    if (newCategory) {
      setCategoriesData(prevData => [
        ...prevData, 
        { name: newCategory, subcategories: [] }
      ]);
      setNewCategory('');
      setShowAddCategoryInput(false);
      setShowAddSubcategoryInput(false);
    }
  };

  const addSubcategory = () => {
    if (newSubcategory && selectedCategory) {
      setCategoriesData(prevData => {
        const categoryIndex = prevData.findIndex(cat => cat.name === selectedCategory);
        if (categoryIndex !== -1) {
          const newData = [...prevData];
          newData[categoryIndex].subcategories.push({ name: newSubcategory, subSubcategories: [] });
          return newData;
        }
        return prevData;
      });
      setNewSubcategory('');
      setShowAddSubcategoryInput(false);
      setShowAddSubSubcategoryInput(false);
    }
  };

  const addSubSubcategory = () => {
    if (newSubSubcategory && selectedCategory && selectedSubcategory) {
      setCategoriesData(prevData => {
        const categoryIndex = prevData.findIndex(cat => cat.name === selectedCategory);
        const subcategoryIndex = prevData[categoryIndex].subcategories.findIndex(sub => sub.name === selectedSubcategory);
        if (categoryIndex !== -1 && subcategoryIndex !== -1) {
          const newData = [...prevData];
          newData[categoryIndex].subcategories[subcategoryIndex].subSubcategories.push(newSubSubcategory);
          return newData;
        }
        return prevData;
      });
      setNewSubSubcategory('');
      setShowAddSubSubcategoryInput(false);
    }
  };


  const deleteCategory = (categoryName) => {
    setCategoriesData((prevData) => prevData.filter(cat => cat.name !== categoryName));
  };
  
  const deleteSubcategory = (subcategoryName) => {
    setCategoriesData((prevData) => {
      const categoryIndex = prevData.findIndex(cat => cat.name === selectedCategory);
      if (categoryIndex !== -1) {
        const newData = [...prevData];
        
        newData[categoryIndex].subcategories = newData[categoryIndex].subcategories.filter(sub => sub.name !== subcategoryName);
        
        
        const updatedData = {
          ...data,
          categories: newData
        };
  
        setData(updatedData);
        return newData;
      }
      return prevData;
    });
  };
  

  
  const deleteSubSubcategory = (subSubcategoryName) => {
    setCategoriesData((prevData) => {
      const categoryIndex = prevData.findIndex(cat => cat.name === selectedCategory);
      const subcategoryIndex = prevData[categoryIndex].subcategories.findIndex(sub => sub.name === selectedSubcategory);
      if (categoryIndex !== -1 && subcategoryIndex !== -1) {
        const newData = [...prevData];
        newData[categoryIndex].subcategories[subcategoryIndex].subSubcategories = newData[categoryIndex].subcategories[subcategoryIndex].subSubcategories.filter(subSub => subSub !== subSubcategoryName);
        return newData;
      }
      return prevData;
    });
  };
  

  return (
    <div>
      <style>
        {`
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
          }
          .category-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 900px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            background-color: #ffffff;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          }
          .dropdowns {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          .dropdown-container {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .dropdown {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
          }
          .dropdown:focus {
            border-color: #007bff;
            outline: none;
          }
          .edit-button {
            padding: 5px 10px;
            background-color: black;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-left: 10px;
          }
          .add-button {
            padding: 5px 10px;
            background-color: #b90000;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
     
          }
            .del-button{
                  padding: 5px 10px;
            background-color: skyBlue;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            }
          .cancel-button {
            padding: 5px 10px;
            background-color: grey;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            // margin-top: 20px;
            max-height: 40px;
          }
            .add-submit-button {
            padding: 10px 15px;
            background-color: #b10000;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            // margin-top: 20px;
            max-height: 40px;
            }
          .submit-button {
            padding: 10px 15px;
            background-color: #b10000;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 20px;
            
          }
          label {
            text-align: left;
          }
          .add-input {
            margin-top: 10px;
            display: flex;
            gap: 10px;
            height:40px;
          }
          .add-input input {
            // padding: 8px;
            border: 1px solid #ccc;
            margin-left: 5px;
            border-radius: 4px;
            width: 100%;
            height:40px;
            
          }
        `}
      </style>

      <div className="category-container">
        <div className="dropdowns">
          <div className="dropdown-container">
            <label htmlFor="category">Select Category:</label>
            <select id="category" className="dropdown" onChange={handleCategoryChange}>
              <option value="">--Select a category--</option>
              {categoriesData.map((cat, index) => (
                <option key={index} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            {selectedCategory && (
              <>
                <button className="edit-button" onClick={() => handleEdit('category')}><CiEdit /></button>
                <button className="add-button" onClick={() => setShowAddCategoryInput(true)}><IoMdAddCircleOutline /></button>
                {/* <button className="del-button" onClick={() => deleteCategory(selectedCategory)}><MdDelete /></button> */}

              </>
            )}
          </div>
          {showAddCategoryInput && (
            <div className="add-input">
              <input
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button className="add-submit-button" onClick={addCategory}>Add</button>
              <button className="cancel-button" onClick={() => setShowAddCategoryInput(false)}>Cancel</button>

              <input
                type="text"
                placeholder="New SubCategory"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
              />
              <button className="add-submit-button" onClick={addSubcategory}>Add</button>
              <button className="cancel-button" onClick={() => setShowAddCategoryInput(false)}>Cancel</button>

            </div>
          )}

          {subcategories.length > 0 && (
            <div className="dropdown-container">
              <label htmlFor="subcategory">Choose Subcategory:</label>
              <select id="subcategory" className="dropdown" onChange={handleSubcategoryChange}>
                <option value="">--Choose a subcategory--</option>
                {subcategories.map((sub, index) => (
                  <option key={index} value={sub.name}>{sub.name}</option>
                ))}
              </select>
              {selectedSubcategory && (
                <>
                  <button className="edit-button" onClick={() => handleEdit('subcategory')}><CiEdit /></button>
                  <button className="add-button" onClick={() => setShowAddSubcategoryInput(true)}><IoMdAddCircleOutline /></button>
                  {/* <button className="del-button" onClick={() => deleteSubcategory(selectedSubcategory)}><MdDelete /></button> */}

                </>
              )}
            </div>
          )}
          {showAddSubcategoryInput && (
            <div className="add-input">
              <input
                type="text"
                placeholder="New Category"
                value={newSubcategory}
                onChange={(e) => setNewSubcategory(e.target.value)}
              />
              <button className="add-submit-button" onClick={addSubcategory}>Add</button>
              <button className="cancel-button" onClick={() => setShowAddSubcategoryInput(false)}>Cancel</button>

              <input
                type="text"
                placeholder="New Subcategory"
                value={newSubSubcategory}
                onChange={(e) => setNewSubSubcategory(e.target.value)}
              />
              <button className="add-submit-button" onClick={addSubSubcategory}>Add</button>
              <button className="cancel-button" onClick={() => setShowAddSubcategoryInput(false)}>Cancel</button>

            </div>
          )}

          {subSubcategories.length > 0 && (
            <div className="dropdown-container">
              <label htmlFor="subsubcategory">Choose Sub-Subcategory:</label>
              <select id="subsubcategory" className="dropdown">
                <option value="">--Select a sub-subcategory--</option>
                {subSubcategories.map((subSub, index) => (
                  <option key={index} value={subSub}>{subSub}</option>
                ))}
              </select>
              <button className="edit-button" onClick={() => handleEdit('subsubcategory')}><CiEdit /></button>
              <button className="add-button" onClick={() => setShowAddSubSubcategoryInput(true)}><IoMdAddCircleOutline /></button>
              {/* <button className="del-button" onClick={() => deleteSubSubcategory(selectedSubsubcategory)}><MdDelete /></button> */}

            </div>
          )}
          {showAddSubSubcategoryInput && (
            <div className="add-input">
              <input
                type="text"
                placeholder="New Sub-Subcategory"
                value={newSubSubcategory}
                onChange={(e) => setNewSubSubcategory(e.target.value)}
              />
              <button className="add-submit-button" onClick={addSubSubcategory}>Add</button>
              <button className="cancel-button" onClick={() => setShowAddSubSubcategoryInput(false)}>Cancel</button>
            </div>
          )}
        </div>

        {editingType && (
          <div>
            <h3>Editing {editingType.charAt(0).toUpperCase() + editingType.slice(1)}</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button className="edit-button" onClick={saveName}>Save</button>
          </div>
        )}

        <button className="submit-button" onClick={handleSubmit}>Submit Changes</button>
      </div>
    </div>
  );
}

export default Category;
