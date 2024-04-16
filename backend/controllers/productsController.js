const products = require("../models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const {
  Types: { ObjectId },
} = require("mongoose");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFetures = require("../utils/apiFeatuers");
const CountModel = require("../models/CountModel");
const imageGelleryModel = require("../models/imageGelleryModel");
const generateSitemap = require("../utils/sitemapUtils");
const order = require("../models/orderModels");
const subCategoreModel = require("../models/subCategoreModel");
const categoreModel = require("../models/categoreModel");
const seoModel = require("../models/seoModel");
const AttributeModel = require("../models/AttributeModel");
const LabelModel = require("../models/ProductLabelModel");
const postMeta = require("../models/PostMetaModel");
//------------ Feature Products

exports.featureProduct = catchAsyncError(async (req, res, nex) => {
  const Orders = await order.find();
  let max = [];

  Orders.forEach((order) => {
    order.orderItem.forEach((item) => {
      max.push(item.productId);
    });
  });

  const productFrequency = max.reduce((acc, productId) => {
    acc[productId] = (acc[productId] || 0) + 1;
    return acc;
  }, {});
  // Convert the object into an array of objects
  const productFrequencyArray = Object.entries(productFrequency).map(
    ([productId, frequency]) => ({ productId, frequency })
  );

  // Sort the array based on frequency in descending order
  const sortedProductFrequencyArray = productFrequencyArray.sort(
    (a, b) => b.frequency - a.frequency
  );

  // let c = sortedProductFrequencyArray[0]
  res.status(200).json({
    success: true,
    product: sortedProductFrequencyArray,
  });
});

// create product -- Admin
exports.createProducts = catchAsyncError(async (req, res, next) => {
  const productCounter = await CountModel.findOne({ entityName: "User" });

  const {
    variation,
    general_Price,
    title,
    slug,
    article,
    content,
    product_Type,
    SKU,
    Stock,
    Sold_Individually,
    Availability_Date,
    Weight,
    Dimensions,
    Shipping_class,
    imageId,
    subcategory,
    category,
    product_uuid,
    product_regular_price,
    product_sale_price,
    Default_value,
  } = req.body;
  // let generalPrice = JSON.parse(general_Price);
  let variationData = JSON.parse(variation);

  let url = slug.replace(/[^\w\s]/gi, "-");
  url = url.toLowerCase();
  url = url.replace(/\s+/g, "-");
  url = url.replace(/-+/g, "-");
  url = url.replace(/^-+|-+$/g, "");

  const user = req.user.id;
  let hasVariationData = Object.keys(variationData).length > 0;
  let postMetaData;

  // const existing = await products.findOne({ url });
  // if (existing) {
  //   return next(
  //     new ErrorHandler(
  //       `Slug already exists. Please choose a different one.`,
  //       404
  //     )
  //   );
  // }
  // product_sale_price: {
  //   type: Number,
  // },
  // product_ratings: {
  //   type: Number,
  //   default: 0,
  // },

  const Products = await products.create({
    _id:
      productCounter && productCounter.productCount !== null
        ? productCounter.productCount
        : 1,
    product_uuid: product_uuid && product_uuid,
    product_name: title,
    product_description: content,
    product_article: article,
    product_Type: product_Type,
    product_SKU: SKU,
    product_Stock: Stock === "true" ? true : false,
    product_Sold_Individually: Sold_Individually === "true" ? true : false,
    product_Availability_Date: Availability_Date,
    product_Weight: Weight,
    product_Dimensions: Dimensions,
    product_Shipping_class: Shipping_class,
    product_category: category,
    product_subcategory: subcategory,
    product_images: imageId.split(","),
    // product_regular_price,
    // product_sale_price,
    Default_value,
    slug: url,
    user,
  });

  // if (populatedProduct && populatedProduct.imageId) {
  //   await products.populate(populatedProduct, {
  //     path: "imageId",
  //     model: "Images",
  //   });
  // }

  // console.log(Object.keys(variationData).length > 0)

  if (variationData.meta_value) {
    variationData.meta_value.filter((item) => {
      const key = Object.keys(item)[0];
      if (key === Default_value) {
        Products.product_regular_price = item[key][0].regular_price;
        Products.product_sale_price = item[key][0].sale_price;
      }
    });

    // Products.product_regular_price=defaultValue[0]
    // Products.product_sale_price=
  } else {
    console.log("meta_value is undefined");
  }

  if (hasVariationData) {
    postMetaData = await postMeta.create({
      item_id: Products.product_uuid,
      meta_uuid: variationData.meta_uuid,
      meta_key: variationData.meta_key,
      meta_value: variationData.meta_value,
    });
    Products.product_meta_uuid = postMetaData.meta_uuid;
  } else {
    Products.product_regular_price = product_regular_price;
    Products.product_sale_price = product_sale_price;
  }
  await Products.save();
  await generateSitemap();

  res.status(201).json({
    success: true,
    // Products,
  });
});

//----------get all produts
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerpage = 6;
  const count_query = req.query.product_category?{product_category:req.query.product_category}:{product_subcategory:req.query.product_subcategory}
  const filter_count = await products.find(count_query?count_query:'');
  const productCount = filter_count.length ===0 ?await products.countDocuments():filter_count.length;
  

  const newProducts = [];
  const apiFetures = new ApiFetures(products.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerpage);

  const Products = await apiFetures.query
    .populate([
      { path: "product_category", model: "Categore" },
      { path: "product_subcategory", model: "SubCategore" },
      { path: "product_images", model: "Images" },
      // { path: "reviewsids", model: "reviewsSchema" },
      // { path: "seoid", model: "SEO" },
    ])
    .exec();
  Products.filter((item) => {
    const createDate = new Date(item.createdate);
    const currentDate = new Date();
    const timeDifference = Math.abs(currentDate - createDate);

    // Filter products created within the last 24 hours (86400000 milliseconds in a day)
    let newProduct = timeDifference <= 15 * 24 * 60 * 60 * 1000;
    if (newProduct) {
      newProducts.push(item);
    }
  });

  // const Products = await products.find().populate([
  //   { path: "product_category", model: "Categore" },
  //   { path: "product_subcategory", model: "SubCategore" },
  //   { path: "product_images", model: "Images" },
  //   // { path: "reviewsids", model: "reviewsSchema" },
  //   // { path: "seoid", model: "SEO" },
  // ]);

  res.status(200).json({
    success: true,
    Products,
    newProducts,
    productCount,
    resultPerpage,
  });
});

//----------get all produts --Admin
exports.getAdminAllProducts = catchAsyncError(async (req, res, next) => {
  let Products = await products.find();

  Products.reverse();
  // if product not found
  if (!Products) {
    // No products found
    return next(new ErrorHandler("No products found", 404));
  }
  // if product found
  res.status(200).json({
    success: true,
    Products,
  });
});

//------ get single products
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  let Product;

  if (isNaN(req.params.metalink)) {
    Product = await products
      .findOne({
        slug: req.params.metalink,
      })
      .populate([
        { path: "product_category", model: "Categore" },
        { path: "product_subcategory", model: "SubCategore" },
        { path: "product_images", model: "Images" },
      ]);
  } else {
    Product = await products.findById(req.params.metalink).populate([
      { path: "product_category", model: "Categore" },
      { path: "product_subcategory", model: "SubCategore" },
      { path: "product_images", model: "Images" },
      // { path: "seoid", model: "SEO" },
      // {
      //   path: "reviewsids",
      //   model: "reviewsSchema",
      //   populate: {
      //     path: "user",
      //     model: "User",
      //   },
      // },
    ]);
    //  Product = await Product.findById(req.params.metalink).populate('imageId');
  }

  res.status(200).json({
    success: true,
    Product,
  });
});

// Update produuct -- Admin
exports.updateProducts = catchAsyncError(async (req, res, next) => {
  const {
    content,
    variation,
    article,
    title,
    slug,
    product_uuid,
    product_Type,
    product_regular_price,
    product_sale_price,
    SKU,
    Stock,
    Sold_Individually,
    Availability_Date,
    Weight,
    Dimensions,
    Shipping_class,
    Default_value,
    imageIds,
    subcategory,
    category,
  } = req.body;

  const url = title.split(" ").join("-");
  const maxPrice =
    product_Type === "Simple product" ? product_regular_price : 0;
  const minPrice = product_Type === "Simple product" ? product_sale_price : 0;

  // // console.log(postMetaData)
  // // else {
  // //   Products.product_regular_price = product_regular_price;
  // //   Products.product_sale_price = product_sale_price;
  // // }

  // // else {
  // //   updatedProduct.product_regular_price = product_regular_price;
  // //   updatedProduct.product_sale_price = product_sale_price;
  // // }
  const data = {
    product_uuid: product_uuid && product_uuid,
    product_name: title,
    product_description: content,
    product_article: article,
    product_Type: product_Type,
    product_SKU: SKU,
    product_Stock: Stock === "true" ? true : false,
    product_Sold_Individually: Sold_Individually === "true" ? true : false,
    product_Availability_Date: Availability_Date,
    product_Weight: Weight,
    product_Dimensions: Dimensions,
    product_Shipping_class: Shipping_class,
    product_category: category,
    product_subcategory: subcategory,
    product_images: imageIds,
    product_regular_price: maxPrice,
    product_sale_price: minPrice,
    Default_value,
    slug: url,
  };
  const updatedProduct = await products.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
    overwrite: true,
  });
  // // console.log(updatedProduct);
  //------------------------
  let variationData = JSON.parse(variation);
  let hasVariationData = Object.keys(variationData).length > 0;
  let postMetaData;
  if (variationData.meta_value) {
    variationData.meta_value.filter((item) => {
      const key = Object.keys(item)[0];
      if (key === Default_value) {
        updatedProduct.product_regular_price = item[key][0].regular_price;
        updatedProduct.product_sale_price = item[key][0].sale_price;
      }
    });

    //   // Products.product_regular_price=defaultValue[0]
    //   // Products.product_sale_price=
    // } else {
    //   console.log("meta_value is undefined");
  }

  if (hasVariationData) {
    const isExist = await postMeta.findOne({
      meta_uuid: variationData.meta_uuid,
    });

    const data = {
      item_id: product_uuid,
      meta_uuid: variationData.meta_uuid,
      meta_key: variationData.meta_key,
      meta_value: variationData.meta_value,
    };

    if (isExist) {
      postMetaData = await postMeta
        .findOneAndUpdate({ meta_uuid: variationData.meta_uuid }, data, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
          overwrite: true,
        })
        .exec();
    } else {
      postMetaData = await postMeta.create(data);
    }
    // await updatedProduct.save();
  } else {
    updatedProduct.product_regular_price = product_regular_price;
    updatedProduct.product_sale_price = product_sale_price;
  }

  updatedProduct.product_meta_uuid = postMetaData.meta_uuid;
  await updatedProduct.save();
  // await generateSitemap();

  res.status(200).json({
    success: true,
    // Product,
  });
});

// Delete product --Admin

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let Product = await products.findById(req.params.id);
  const existingProductSeo = await seoModel.findOne({
    productid: Product._id,
  });
  if (!Product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  if (!existingProductSeo) {
    return next(new ErrorHandler("Product seo not found", 404));
  }
  await existingProductSeo.deleteOne();
  await Product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
});

//---------single product

exports.singleProduct = catchAsyncError(async (req, res, next) => {
  let Product = await products
    .findById(req.params.id)
    .populate([{ path: "seoid", model: "SEO" }]);
  if (!Product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    Product,
  });
});

exports.productStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const isexist = await products.findById(id);

  if (!isexist) {
    return next(new ErrorHandler("id not found", 400));
  }
  isexist.productstatus = status;
  await isexist.save({ validateBeforeSave: false });
  res.status(200).json({ status: true, productId: isexist });
});
//-------------product attribute----------------
exports.productAttribute = catchAsyncError(async (req, res, next) => {
  const {
    uuid,
    name,
    slug,
    enable,
    typevalue,
    orderValue,
    riodeValue,
    riodeLink,
    riodeicon,
  } = req.body;
  const url = slug.split(" ").join("-");

  const exist = await AttributeModel.findOne({ name, slug: url });

  if (exist) {
    return next(new ErrorHandler("name and slug already exist", 400));
  }
  const Attribute = await AttributeModel.create({
    uuid,
    name,
    slug: url,
    enable,
    typevalue,
    orderValue,
    riodeValue,
    riodeLink,
    riodeicon,
  });

  res.status(200).json({ status: true, Attribute });
});

//-----get product attribute data-------------

exports.GetAttributeData = catchAsyncError(async (req, res, next) => {
  const resultPerpage = 12;

  const apiFetures = new ApiFetures(AttributeModel.find(), req.query).search();

  const attributedata = await apiFetures.query
    .populate([{ path: "labelid", model: "Label" }])
    .exec();

  res.status(200).json({ status: true, attributedata });
});

//----------single product attribute-----------

exports.singleProductAttribute = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const isexist = await AttributeModel.findById(id).populate([
    { path: "labelid", model: "Label" },
    { path: "user", model: "User" },
  ]);
  if (!isexist) {
    return next(new ErrorHandler("id not found", 400));
  }

  res.status(200).json({ status: true, attributedata: isexist });
});

//------------update attribute------------

exports.updateProductAttribute = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    slug,
    enable,
    typevalue,
    orderValue,
    riodeValue,
    riodeLink,
    riodeicon,
  } = req.body;

  let isexist = await AttributeModel.findById(id);
  if (!isexist) {
    return next(new ErrorHandler("id not found", 400));
  }

  const data = {
    name,
    slug,
    enable,
    typevalue,
    orderValue,
    riodeValue,
    riodeLink,
    riodeicon,
  };

  isexist = await AttributeModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
    overwrite: true,
  });
  res.status(200).json({ status: true, isexist });
});

//------------status and soft delete attribure

exports.productAttributeStatus = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { status, isdelete } = req.body;

  const isexist = await AttributeModel.findById(id);
  if (!isexist) {
    return next(new ErrorHandler("id not found", 400));
  }
  if (isdelete !== undefined) {
    isexist.isdelete = isdelete;
    await isexist.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, productmodelsoft: isexist });
    return;
  }
  isexist.status = status;
  await isexist.save({ validateBeforeSave: false });
  res.status(200).json({ status: true, productmodelId: isexist });
});

//--------------------products label---------------

exports.productAttributeLabel = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const { uuid, name, slug, description, SwatchLabel, color } = req.body;
  const user = req.user._id;
  const url = slug.split(" ").join("-");
  const isexist = await LabelModel.findOne({ name, slug: url });
  if (isexist) {
    return next(new ErrorHandler("name and slug already exist", 400));
  }
  const label = await LabelModel.create({
    uuid,
    name,
    slug: url,
    description,
    SwatchLabel,
    attributeid: id,
    color,
    user,
  });

  const Attribute = await AttributeModel.findById(id);

  Attribute.labelid.push(label._id);
  await Attribute.save();
  res.status(200).json({ success: true, label });
});

//--------get all product label-----------

exports.getAttributeLabel = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const isexist = await LabelModel.find({ attributeid: id });
  if (!isexist) {
    return next(new ErrorHandler(`Id not found`, 404));
  }
  // .populate([
  //   { path: "category", model: "Categore" },
  //   { path: "subcategory", model: "SubCategore" },
  //   { path: "imageId", model: "Images" },
  //   { path: "reviewsids", model: "reviewsSchema" },
  //   { path: "seoid", model: "SEO" },
  // ])
  // .exec();

  res.status(200).json({ success: true, data: isexist });
});

//--------------===single product label-------------

exports.singleAttributeLabel = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const isexist = await LabelModel.findById(id);
  if (!isexist) {
    return next(new ErrorHandler("id not exist", 400));
  }
  res.status(200).json({ status: true, attributedata: isexist });
});

exports.getAllLabels = catchAsyncError(async (req, res, next) => {
  const isexist = await LabelModel.find();

  res.status(200).json({ status: true, attributedata: isexist });
});

//----------------update attribute label----------------------

exports.updateAttributeLabel = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const { name, slug, description, SwatchLabel, color } = req.body;
  let isexist = await LabelModel.findById(id);
  if (!isexist) {
    return next(new ErrorHandler("id not exist", 400));
  }
  const data = { name, slug, description, SwatchLabel, color };

  isexist = await LabelModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
    overwrite: true,
  });

  res.status(200).json({ status: true, attributedata: isexist });
});

//--------------ststus and delete label------

exports.productAttributeLabelStatus = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const { status, isdelete } = req.body;

    const isexist = await LabelModel.findById(id);
    if (!isexist) {
      return next(new ErrorHandler("id not found", 400));
    }
    if (isdelete !== undefined) {
      isexist.isdelete = isdelete;

      await isexist.save({ validateBeforeSave: false });
      res.status(200).json({ success: true, productlabelsoft: isexist });
      return;
    }
    isexist.status = status;
    await isexist.save({ validateBeforeSave: false });
    res.status(200).json({ status: true, productlabelId: isexist });
  }
);
