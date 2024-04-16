const catchAsyncError = require("../middleware/catchAsyncError");
const categoreModel = require("../models/categoreModel");
const seoModel = require("../models/seoModel");
const subCategoreModel = require("../models/subCategoreModel");
const ErrorHandler = require("../utils/errorhandler");
const mongoose = require("mongoose");

exports.test = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  const allCategores = await categoreModel.findOne({ _id: id });

  res.status(200).json({
    success: true,
    allCategores,
  });
});

exports.createCategore = catchAsyncError(async (req, res, next) => {
  const { name, slug, Parent_category, description, uuid, img_id } = req.body;

  let url = slug.split(" ").join("-").toLowerCase();
  const user = req.user.id;
  const existingSlug = await categoreModel.findOne({ slug: url });
  if (existingSlug) {
    return next(
      new ErrorHandler(
        `Slug already exists. Please choose a different one.`,
        409
      )
    );
  }

  const newCategorie = await categoreModel.create({
    name,
    slug: url,
    description,
    Parent_category,
    uuid,
    user,
  });
  if (img_id !== "null") {
    newCategorie.thumbnail = img_id;
    await newCategorie.save();
  }

  const allCategores = await categoreModel
    .find()
    .populate([{ path: "thumbnail", model: "Images" }]);

  res.status(201).json({
    success: true,
    message: "Categore created successfully",
    allCategores,
  });
});

exports.getAllCategores = catchAsyncError(async (req, res, next) => {
  const allCategores = await categoreModel.find().populate([
    { path: "user", model: "User" },
    { path: "thumbnail", model: "Images" },
    // { path: "seo", model: "SEO" },
  ]);

  res.status(200).json({
    success: true,
    allCategores,
  });
});

//---------------------------- sub cat

exports.createSubCategore = catchAsyncError(async (req, res, next) => {

  const { name, slug, Parent_category, description, uuid, img_id } = req.body;
  let url = slug.split(" ").join("-").toLowerCase();
  const user = req.user.id;

  const existingSlug = await subCategoreModel.findOne({ slug: url });

  if (existingSlug) {
    return next(
      new ErrorHandler(
        `Slug already exists. Please choose a different one.`,
        409
      )
    );
  }
  const newCategorie = await subCategoreModel.create({
    name,
    slug: url,
    Parent_category,
    description,
    uuid,
    user,
  });
  if (img_id !== "null") {
    newCategorie.thumbnail = img_id;
    await newCategorie.save();
  }
  const all_sub_categores = await subCategoreModel
    .find()
    .populate([
      { path: "user", model: "User" },
      { path: "thumbnail", model: "Images" },
    ]);

  res.status(201).json({
    success: true,
    message: "Categore created successfully",
    all_sub_categores,
  });
});

exports.get_all_sub_categores = catchAsyncError(async (req, res, next) => {
  const all_sub_categores = await subCategoreModel.find().populate([
    { path: "user", model: "User" },
    { path: "thumbnail", model: "Images" },
  ]);
  
  res.status(200).json({
    success: true,
    all_sub_categores,
  });
});

// ----------delete-----------------

exports.StatusCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const isexist = await categoreModel.findById(id);

  if (!isexist) {
    return next(new ErrorHandler("id not found", 400));
  }
  isexist.categorystatus = status;
  await isexist.save({ validateBeforeSave: false });
  res.status(200).json({ status: true, category: isexist });
});

exports.subStatusCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  const isexist = await subCategoreModel.findById(id);
  if (!isexist) {
    return next(new ErrorHandler("id not found", 400));
  }
  isexist.subcategorystatus = status;
  await isexist.save({ validateBeforeSave: false });

  res.status(200).json({ status: true, category: isexist });
});

exports.singleParentCategory = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid ID format", 400));
  }
  const isexist = await categoreModel
    .findById(id)
    .populate([{ path: "seo", model: "SEO" }]);

  if (!isexist) {
    return next(new ErrorHandler("id not found", 400));
  }

  res.status(200).json({ status: true, parentcategory: isexist });
});

//-------------Single Sub Category------------

exports.singleSubCategory = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    // if(!mongoose.type.ObjectId.isValid(id)){
    //   return next(new ErrorHandler("Invalid ID format", 400))
    // }

    const isexist = await subCategoreModel
      .findById(id)
      .populate([{ path: "seo", model: "SEO" }]);

    if (!isexist) {
      return next(new ErrorHandler("id not found", 400));
    }

    res.status(200).json({ status: true, subcategory: isexist });
  } catch (error) {
    return next(new ErrorHandler(`Internal server error: ${error}`, 500));
  }
});

exports.updateParentCategore = catchAsyncError(async (req, res, next) => {
  const { name, slug, title, description, parent, seotitle, keyword, metadec } =
    req.body;

  const { id } = req.params;

  let metalink = slug.split(" ").join("-").toLowerCase();
  const data = {
    name,
    slug: metalink,
    title,
    description,
  };

  const existingSlug = await categoreModel.findById(id);
  if (!existingSlug) {
    return next(new ErrorHandler(`Category not found.`, 400));
  }

  const update = await categoreModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const existingSeoUrl = await seoModel.findOne({ _id: update.seo });

  if (!existingSeoUrl) {
    return next(new ErrorHandler(`Category not found.`, 404));
  }

  const seoData = {
    metatitle: seotitle,
    keyword: keyword,
    metadec: metadec,
    metalink: metalink,
  };

  const updatSeo = await seoModel.findOneAndUpdate(
    existingSeoUrl._id,
    seoData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(201).json({
    success: true,
    message: "Categore updated successfully",
  });
});

///-----------------update sub category---------------

exports.updateSubCategore = catchAsyncError(async (req, res, next) => {
  const { name, slug, title, description, parent, seotitle, keyword, metadec } =
    req.body;

  const { id } = req.params;

  let metalink = slug.split(" ").join("-").toLowerCase();
  const data = {
    name,
    slug: metalink,
    title,
    description,
  };

  const existingSlug = await subCategoreModel.findById(id);
  if (!existingSlug) {
    return next(new ErrorHandler(`sub Category not found.`, 400));
  }

  const update = await subCategoreModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const existingSeoUrl = await seoModel.findOne({ _id: update.seo });

  if (!existingSeoUrl) {
    return next(new ErrorHandler(`Sub category not found.`, 404));
  }

  const seoData = {
    metatitle: seotitle,
    keyword: keyword,
    metadec: metadec,
    metalink: metalink,
  };

  const updatSeo = await seoModel.findOneAndUpdate(
    existingSeoUrl._id,
    seoData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(201).json({
    success: true,
    message: "Sub Categore updated successfully",
  });
});

// const catchAsyncError = require("../middleware/catchAsyncError");
// const categoreModel = require("../models/categoreModel");
// const seoModel = require("../models/seoModel");
// const subCategoreModel = require("../models/subCategoreModel");
// const ErrorHandler = require("../utils/errorhandler");
// const mongoose = require("mongoose");

// exports.createCategore = catchAsyncError(async (req, res, next) => {
//
//     const {
//       name,
//       slug,
//       title,
//       parent,
//       description,
//       seotitle,
//       keyword,
//       metadec,
//     } = req.body;
//     let metalink = slug.split(" ").join("-").toLowerCase();
//     const user = req.user.id;

//     const existingSlug = await categoreModel.findOne({ slug: metalink });
//     if (existingSlug) {
//       return next(
//         new ErrorHandler(
//           `Slug already exists. Please choose a different one.`,
//           400
//         )
//       );
//     }

//     const newCategorie = await categoreModel.create({
//       name,
//       slug: metalink,
//       title,
//       description,
//       parent,
//       user,
//     });

//     const existingSeoUrl = await seoModel.findOne({ metalink });

//     if (existingSeoUrl) {
//       return next(
//         new ErrorHandler(
//           `Slug already exists. Please choose a different one.`,
//           404
//         )
//       );
//     }

//     const type = "product cat";
//     const seo = await seoModel.create({
//       metatitle: seotitle,
//       keyword: keyword,
//       metadec: metadec,
//       metalink: metalink,
//       type,
//       productcatid: newCategorie._id,
//     });

//     newCategorie.seo = seo._id;
//     await newCategorie.save({ validateBeforeSave: false });

//     res.status(201).json({
//       success: true,
//       message: "Categore created successfully",
//     });
//   } catch (err) {
//     return next(new ErrorHandler(`Internal server error: ${err}`, 500));
//   }
// });

// exports.getAllCategores = catchAsyncError(async (req, res, next) => {
//
//     const allCategores = await categoreModel.find().populate([
//       { path: "childs", model: "SubCategore" },
//       { path: "user", model: "User" },
//       { path: "seo", model: "SEO" },
//     ]);
//     if (allCategores.length < 1) {
//       return next(new ErrorHandler());
//     }
//     res.status(200).json({
//       success: true,
//       allCategores,
//     });
//   } catch (err) {
//     return next(new ErrorHandler(`Internal server error: ${err}`, 500));
//   }
// });

// //---------------------------- sub cat

// exports.createSubCategore = catchAsyncError(async (req, res, next) => {
//
//     const {
//       name,
//       slug,
//       title,
//       parent,
//       description,
//       seotitle,
//       keyword,
//       metadec,
//     } = req.body;
//     let metalink = slug.split(" ").join("-").toLowerCase();
//     const user = req.user.id;

//     const existingSlug = await subCategoreModel.findOne({ slug: metalink });

//     if (existingSlug) {
//       return next(
//         new ErrorHandler(
//           `Slug already exists. Please choose a different one.`,
//           400
//         )
//       );
//     }
//     const newCategorie = await subCategoreModel.create({
//       name,
//       slug: metalink,
//       title,
//       description,
//       parent,
//       user,
//     });

//     const parentCategore = await categoreModel.findById(parent);
//     parentCategore.childs.push(newCategorie._id);
//     await parentCategore.save({ validateBeforeSave: false });

//     const existingSeoUrl = await seoModel.findOne({ metalink });

//     if (existingSeoUrl) {
//       return next(
//         new ErrorHandler(
//           `Slug already exists. Please choose a different one.`,
//           404
//         )
//       );
//     }

//     const type = "product sub cat";
//     const seo = await seoModel.create({
//       metatitle: seotitle,
//       keyword: keyword,
//       metadec: metadec,
//       metalink: metalink,
//       type,
//       productsubcatid: newCategorie._id,
//     });

//     newCategorie.seo = seo._id;
//     await newCategorie.save({ validateBeforeSave: false });

//     res.status(201).json({
//       success: true,
//       message: "Categore created successfully",
//       newCategorie,
//     });
//   } catch (err) {
//     return next(new ErrorHandler(`Internal server error: ${err}`, 500));
//   }
// });

// // ----------delete-----------------

// exports.StatusCategory = catchAsyncError(async (req, res, next) => {
//
//     const { id } = req.params;
//     const { status } = req.body;

//     const isexist = await categoreModel.findById(id);

//     if (!isexist) {
//       return next(new ErrorHandler("id not found", 400));
//     }
//     isexist.categorystatus = status;
//     await isexist.save({ validateBeforeSave: false });
//     res.status(200).json({ status: true, category: isexist });
//   } catch (error) {
//     return next(new ErrorHandler(`Internal server error: ${error}`, 500));
//   }
// });

// exports.subStatusCategory = catchAsyncError(async (req, res, next) => {
//
//     const { id } = req.params;
//     const { status } = req.body;

//     const isexist = await subCategoreModel.findById(id);
//     if (!isexist) {
//       return next(new ErrorHandler("id not found", 400));
//     }
//     isexist.subcategorystatus = status;
//     await isexist.save({ validateBeforeSave: false });

//     res.status(200).json({ status: true, category: isexist });
//   } catch (error) {
//     return next(new ErrorHandler(`Internal server error: ${error}`, 500));
//   }
// });

// exports.singleParentCategory = catchAsyncError(async (req, res, next) => {
//
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return next(new ErrorHandler("Invalid ID format", 400));
//     }
//     const isexist = await categoreModel
//       .findById(id)
//       .populate([{ path: "seo", model: "SEO" }]);

//     if (!isexist) {
//       return next(new ErrorHandler("id not found", 400));
//     }

//     res.status(200).json({ status: true, parentcategory: isexist });
//   } catch (error) {
//     return next(new ErrorHandler(`Internal server error: ${error}`, 500));
//   }
// });

// exports.updateParentCategore = catchAsyncError(async (req, res, next) => {
//
//     const {
//       name,
//       slug,
//       title,
//       description,
//       parent,
//       seotitle,
//       keyword,
//       metadec,
//     } = req.body;

//     const { id } = req.params;

//     let metalink = slug.split(" ").join("-").toLowerCase();
//     const data = {
//       name,
//       slug: metalink,
//       title,
//       description,
//     };

//     const existingSlug = await categoreModel.findById(id);
//     if (!existingSlug) {
//       return next(new ErrorHandler(`Category not found.`, 400));
//     }

//     const update = await categoreModel.findByIdAndUpdate(id, data, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     });

//     const existingSeoUrl = await seoModel.findOne({ _id: update.seo });

//     if (!existingSeoUrl) {
//       return next(new ErrorHandler(`Category not found.`, 404));
//     }

//     const seoData = {
//       metatitle: seotitle,
//       keyword: keyword,
//       metadec: metadec,
//       metalink: metalink,
//     };

//     const updatSeo = await seoModel.findOneAndUpdate(
//       existingSeoUrl._id,
//       seoData,
//       {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       }
//     );

//     res.status(201).json({
//       success: true,
//       message: "Categore updated successfully",
//     });
//   } catch (err) {
//     return next(new ErrorHandler(`Internal server error: ${err}`, 500));
//   }
// });

// exports.updateSubCategore = catchAsyncError(async (req, res, next) => {
//
//     const {
//       name,
//       slug,
//       title,
//       description,
//       parent,
//       seotitle,
//       keyword,
//       metadec,
//     } = req.body;

//     const { id } = req.params;

//     let metalink = slug.split(" ").join("-").toLowerCase();
//     const data = {
//       name,
//       slug: metalink,
//       title,
//       description,
//     };

//     const existingSlug = await subCategoreModel.findById(id);
//     if (!existingSlug) {
//       return next(new ErrorHandler(`sub Category not found.`, 400));
//     }

//     const update = await subCategoreModel.findByIdAndUpdate(id, data, {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     });

//     const existingSeoUrl = await seoModel.findOne({ _id: update.seo });

//     if (!existingSeoUrl) {
//       return next(new ErrorHandler(`Sub category not found.`, 404));
//     }

//     const seoData = {
//       metatitle: seotitle,
//       keyword: keyword,
//       metadec: metadec,
//       metalink: metalink,
//     };

//     const updatSeo = await seoModel.findOneAndUpdate(
//       existingSeoUrl._id,
//       seoData,
//       {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       }
//     );

//     res.status(201).json({
//       success: true,
//       message: "Sub Categore updated successfully",
//     });
//   } catch (err) {
//     return next(new ErrorHandler(`Internal server error: ${err}`, 500));
//   }
// });
