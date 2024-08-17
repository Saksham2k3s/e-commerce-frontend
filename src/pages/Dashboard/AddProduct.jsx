import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaChevronDown } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import { addProduct } from "../../redux/slice/Dashboard/ProductSlice";
import toast from "react-hot-toast";
function AddProduct() {
  const { user } = useSelector((state) => state.userAuth);
  const { successMessage, isLoading, product } = useSelector(state => state.adminProduct)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    discountPrice: "",
    actualPrice: "",
    category: "",
    stock: "",
    measurements: "",
    colors: [],
    additionalInfos: [],
  });
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isColorInputVisible, setIsColorInputVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const textareaRef = useRef(null);

  useEffect(() => {
    if(!user){
      navigate('/login')
    }
  })

  useEffect(() => {
    if (user.role === "user") {
      navigate("/");
    }
  }, [navigate, user.role]);

 

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [productData.description]);

  const handleAddColor = () => {
    if (!productData.colors.includes(selectedColor)) {
      setProductData({
        ...productData,
        colors: [...productData.colors, selectedColor],
      });
      console.log("these are colors",productData.colors);
    }
    setIsColorInputVisible(false); // Hide the color input after adding the color
  };

  const handleAddAdditionalInfo = () => {
    setProductData({
      ...productData,
      additionalInfos: [...productData.additionalInfos, { title: "", content: "", isVisible: false }],
    });
  };

  const handleToggleAdditionalInfoVisibility = (index) => {
    const updatedAdditionalInfos = productData.additionalInfos.map((info, idx) =>
      idx === index ? { ...info, isVisible: !info.isVisible } : info
    );
    setProductData({ ...productData, additionalInfos: updatedAdditionalInfos });
  };

  const handleAdditionalInfoChange = (index, field, value) => {
    const updatedAdditionalInfos = productData.additionalInfos.map((info, idx) =>
      idx === index ? { ...info, [field]: value } : info
    );
    setProductData({ ...productData, additionalInfos: updatedAdditionalInfos });
  };

  //Submit Product

   // Submit Product
   const handleAddProduct = (e) => {
    e.preventDefault();
    console.log("this is product data", productData);
    const formData = new FormData();
  
    for (const key in productData) {
      if (key === 'additionalInfos') {
        formData.set(key, JSON.stringify(productData[key]));
      } else {
        formData.set(key, productData[key]);
      }
    }

    images.forEach((image) => {
      formData.append("images", image);
    });
  
    dispatch(addProduct(formData));

    if (successMessage) {
      toast.success(successMessage);
      console.log("we have added this product", product);
    }
  };
 
  //Image upload

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // setImages([]);
    // setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(reader.result);
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <form action="" encType="multipart/form-data" onSubmit={handleAddProduct} >
      <div className="px-10 min-h-screen bg-dashboard-bg">
        <div className="text-black font-headline-4 text-4xl ">Add Product</div>
        <div className="w-full flex justify-start mt-4" >
            <input
                  type="text"
                  placeholder="Add lable"
                  className=" text-black font-headline-4 bg-transparent border-none outline-none w-fit focus:outline-none placeholder:text-black placeholder:font-semibold mt-5 lg:mt-0 "
                  value={productData.category}
                  onChange={(e) =>
                    setProductData({ ...productData, category: e.target.value })
                  }
                />
                <AiOutlineEdit size={20} className="-ml-10 mt-5 lg:mt-0" />
            </div>
        {/* Product Details */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {/* Product Images */}
          <div className="flex flex-wrap gap-5 lg:gap-5 w-full lg:w-1/2 mt-4">
      {imagesPreview.map((image, index) => (
        <img key={index} src={image} alt={`Uploaded ${index}`} className="w-[15%] h-[170px] lg:w-[30%] lg:h=[270px] " />
      ))}
      <label className="w-[20%] h-[150px] lg:w-[40%] lg:h=[300px] flex items-center justify-center border border-dashed cursor-pointer">
        <LuImagePlus size={50} />
        <input
          type="file"
          accept="image/*"
          multiple
          name="images"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
          {/* Other details */}
          <div className="flex flex-col flex-wrap justify-between  gap-5 w-full lg:w-1/2 sm:pr-0 lg:pr-20 ">
            {/* Name and Description */}
            <div className="text-start w-full flex flex-col gap-5 ">
              <div className="text-black font-headline-4 text-4xl flex flex-grow items-baseline ">
                <input
                  type="text"
                  placeholder="ADD PRODUCT TITLE"
                  className=" text-black bg-transparent border-none outline-none focus:outline-none placeholder:text-black "
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                />{" "}
                <AiOutlineEdit size={20} />
              </div>
              <div className="text-darkslategray font-button-s text-md leading-6 tracking-wide">
                <textarea
                  placeholder="Add description"
                  ref={textareaRef}
                  className="text-darkslategray bg-transparent border-none outline-none focus:outline-none resize-none w-full h-auto"
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                  rows={1}
                />
              </div>

              {/* Price */}
              <div className="flex flex-col lg:flex-row gap-5 lg:2 w-full ">
                <div className="text-black font-headline-4 text-2xl flex gap-3 w-[30%] ">
                $
                  <input
                    type="number"
                    placeholder="Add Price"
                    className="bg-transparent border-none outline-none focus:outline-none h-auto placeholder:text-black font-headline-4 "
                    value={productData.discountPrice}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        discountPrice: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="text-black font-headline-4 text-lg flex gap-3 items-center w-full ">
                $
                  <input

                    type="number"
                    placeholder="Add MRP or Price before discount"
                    className="bg-transparent border-none outline-none focus:outline-none w-full h-auto placeholder:text-black font-headline-4 appearance-auto "
                    value={productData.actualPrice}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        actualPrice: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Measurements */}
              <div className="text-md font-button-s text-darkslategray font-semibold mt-4">
                <input
                  placeholder="Measurements"
                  className="text-darkslategray bg-transparent border-none outline-none focus:outline-none resize-none w-full h-auto placeholder:text-darkslategray placeholder:text-md "
                  value={productData.measurements}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      measurements: e.target.value,
                    })
                  }
                />
              </div>

              {/* Pieces */}

              <div className="text-black font-headline-4 text-lg flex gap-3 items-center w-full mt-5 ">
                  <input
                    type="number"
                    placeholder="Number of Pieces"
                    className="bg-transparent border-none outline-none focus:outline-none w-full h-auto placeholder:text-black font-headline-4 appearance-auto "
                    value={productData.stock}
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        stock: e.target.value,
                      })
                    }
                  />
                </div>

              {/* Colors */}
              <div className="text-md font-button-s text-darkslategray font-semibold mt-5">
                <button
                  className="flex items-center"
                  onClick={() => setIsColorInputVisible(!isColorInputVisible)}
                >
                  Add colors <FaPlusCircle size={20} className="ml-1" />
                </button>
                {isColorInputVisible && (
                  <div className="flex items-center mt-2">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    />
                    <button
                      className="ml-2 py-1 px-2"
                      onClick={handleAddColor}
                    >
                      <FaPlusCircle size={20} color="black" />
                    </button>
                  </div>
                )}
              </div>

              {/* Display Selected Colors */}
              <div className="flex flex-wrap gap-2 mt-2 ">
                {productData.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full "
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>

              {/* Additional Info Section */}
              
              {productData.additionalInfos.map((info, index) => (
                <div key={index} className="mt-4 w-full ">
                  <div className="border-b-2 border-black flex justify-between py-3 align-baseline ">
                    <input
                      type="text"
                      placeholder="Additional Info Title"
                      className="text-black font-headline-4 text-xl bg-transparent border-none outline-none focus:outline-none"
                      value={info.title}
                      onChange={(e) =>
                        handleAdditionalInfoChange(index, "title", e.target.value)
                      }
                    />
                    <FaChevronDown
                      size={20}
                      className={`cursor-pointer transition-transform duration-300 ${
                        info.isVisible ? "rotate-180" : ""
                      }`}
                      onClick={() => handleToggleAdditionalInfoVisibility(index)}
                    />
                  </div>
                  {info.isVisible && (
                    <div className="text-darkslategray font-button-s text-md leading-6 tracking-wide mt-2">
                      <textarea
                        placeholder="Add additional information"
                        className="text-darkslategray bg-transparent border-none outline-none focus:outline-none resize-none w-full h-auto"
                        value={info.content}
                        onChange={(e) =>
                          handleAdditionalInfoChange(index, "content", e.target.value)
                        }
                        rows={1}
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Button to Add New Additional Info */}
              <div className="flex items-center mt-4">
                <FaPlusCircle size={20} className="mr-2 cursor-pointer" onClick={handleAddAdditionalInfo} />
                <span className="text-darkslategray font-button-s text-md">Add other information</span>
              </div>
            </div>

            <button className="cursor-pointer border-none py-5 px-[74px] bg-neutral-07-100 text-white shadow-[0px_8px_16px_rgba(0,_0,_0,_0.04)] rounded-full flex flex-row items-center justify-center w-[50%] font-button-s " type="submit" >
              { isLoading ? 'Adding...' : 'Add Product' }
            </button>
          </div>
        </div>
      </div>
      </form>
    </>
  );
}

export default AddProduct;