import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false }).sort({ jobPostedOn: -1 }); // Sort by 'jobPostedOn' in descending order
  res.status(200).json({
    success: true,
    jobs,
  });
});



export const getAllJobCategories = catchAsyncErrors(async (req, res, next) => {

  const allCategories = [
    "Graphics & Design",
    "Mobile App Development",
    "Frontend Web Development",
    "MERN Stack Development",
    "Account & Finance",
    "Artificial Intelligence",
    "Video Animation",
    "MEAN Stack Development",
    "Data Entry Operator",
   
  ];

  const categoriesWithCount = await Job.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 }, 
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id", 
        count: 1,
      },
    },
  ]);
  const categoryMap = categoriesWithCount.reduce((map, categoryObj) => {
    map[categoryObj.category] = categoryObj.count;
    return map;
  }, {});

  const categories = allCategories.map((category) => ({
    category,
    count: categoryMap[category] || 0,
  }));

  res.status(200).json({
    success: true,
    categories,
  });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;

  if (!title || !category || !country || !city || !description) {
    console.log(title);
    console.log(category);
    console.log(country);
    console.log(city);
    // console.log(description);
    // console.log(location);
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary.",
        400
      )
    );
  }

  // if (salaryFrom && salaryTo && fixedSalary) {
  //   return next(
  //     new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
  //   );
  // }
 
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job Posted Successfully!",
    job,
  });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});