const Teacher = require('../models/Teacher');
const User = require('../models/User');
const Position = require('../models/TeacherPosition');
const generateUniqueTeacherId = require('../utils/generateUniqueTeacherId'); // Hàm sinh mã GV

// GET /teachers?page=1&limit=10
exports.getAllTeachers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    // Tạo điều kiện search regex, nếu có
    const searchRegex = search ? new RegExp(search, "i") : null;

    // Pipeline aggregate
    const pipeline = [];

    // Join user
    pipeline.push({
      $lookup: {
        from: "users", // tên collection User trong MongoDB, thường là 'users'
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    });

    // Unwind user (mảng thành object)
    pipeline.push({
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true, // giữ nếu không có user
      },
    });

    // Join teacherPositions
    pipeline.push({
      $lookup: {
        from: "teacherpositions", // tên collection teacherPositions (đảm bảo đúng tên)
        localField: "teacherPositionsId",
        foreignField: "_id",
        as: "teacherPositions",
      },
    });

    // Tạo điều kiện tìm kiếm chung
    if (searchRegex) {
      pipeline.push({
        $match: {
          $or: [
            { code: { $regex: searchRegex } },
            { "user.name": { $regex: searchRegex } },
            { "user.email": { $regex: searchRegex } },
          ],
        },
      });
    }

    // Đếm tổng số kết quả
    const countPipeline = [...pipeline, { $count: "total" }];
    const countResult = await Teacher.aggregate(countPipeline);
    const total = countResult.length > 0 ? countResult[0].total : 0;

    // Thêm phân trang
    pipeline.push({ $skip: skip });
    pipeline.push({ $limit: limit });

    // Project dữ liệu cần trả về
    pipeline.push({
      $project: {
        _id: 1,
        code: 1,
        startDate: 1,
        isActive: 1,
        isDeleted: 1,
        degrees: 1,
        user: {
          _id: "$user._id",
          name: "$user.name",
          email: "$user.email",
          phoneNumber: "$user.phoneNumber",
          address: "$user.address",
          identity: "$user.identity",
          dob: "$user.dob",
          isDeleted: "$user.isDeleted",
          role: "$user.role",
        },
        teacherPositions: {
          $map: {
            input: "$teacherPositions",
            as: "pos",
            in: {
              _id: "$$pos._id",
              name: "$$pos.name",
              code: "$$pos.code",
            },
          },
        },
      },
    });

    // Thực thi aggregate
    const teachers = await Teacher.aggregate(pipeline);

    return res.status(200).json({
      total,
      page,
      limit,
      data: teachers,
    });
  } catch (error) {
    console.error("GET /teachers error:", error);
    return res.status(500).json({ message: "Lỗi khi lấy danh sách giáo viên", error: error.message });
  }
};


// POST /teachers
// exports.createTeacher = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phoneNumber,
//       address,
//       identity,
//       dob,
//       degrees,
//       teacherPositionsId,
//       isActive,
//       startDate,
//       endDate
//     } = req.body;

//     const emailExists = await User.findOne({ email });
//     if (emailExists) {
//       return res.status(409).json({ message: 'Email đã tồn tại' });
//     }

//     // Tạo user
//     const user = await User.create({
//       name,
//       email,
//       phoneNumber,
//       address,
//       identity,
//       dob,
//       role: 'TEACHER',
//     });

//     // Sinh mã GV
//     const code = await generateUniqueTeacherId();

//     // Tạo giáo viên
//     const teacher = await Teacher.create({
//       userId: user._id,
//       code,
//       isActive: isActive ?? true,
//       isDeleted: false,
//       startDate,
//       endDate,
//       teacherPositionsId,
//       degrees,
//     });

//     // Populate lại
//     const populatedTeacher = await Teacher.findById(teacher._id)
//       .populate({
//         path: 'userId',
//         select: 'name email phoneNumber address identity dob role isDeleted',
//       })
//       .populate({
//         path: 'teacherPositionsId',
//         select: 'name code',
//       });

//     res.status(201).json({
//       _id: populatedTeacher._id,
//       code: populatedTeacher.code,
//       isActive: populatedTeacher.isActive,
//       isDeleted: populatedTeacher.isDeleted,
//       startDate: populatedTeacher.startDate,
//       endDate: populatedTeacher.endDate,
//       user: {
//         _id: populatedTeacher.userId?._id,
//         name: populatedTeacher.userId?.name,
//         email: populatedTeacher.userId?.email,
//         phoneNumber: populatedTeacher.userId?.phoneNumber,
//         address: populatedTeacher.userId?.address,
//         identity: populatedTeacher.userId?.identity,
//         dob: populatedTeacher.userId?.dob,
//         role: populatedTeacher.userId?.role,
//         isDeleted: populatedTeacher.userId?.isDeleted,
//       },
//       teacherPositions: populatedTeacher.teacherPositionsId?.map(pos => ({
//         _id: pos._id,
//         name: pos.name,
//         code: pos.code
//       })),
//       degrees: populatedTeacher.degrees?.map(degree => ({
//         type: degree.type,
//         school: degree.school,
//         major: degree.major,
//         year: degree.year,
//         isGraduated: degree.isGraduated
//       }))
//     });

//   } catch (error) {
//     console.error('POST /teachers error:', error);
//     res.status(500).json({ message: 'Lỗi khi tạo giáo viên', error: error.message });
//   }
// };



// ... (các import và hàm khác giữ nguyên)

exports.createTeacher = async (req, res) => {
  try {
    const {
      name, email, phoneNumber, address, identity, dob, role,
      teacherPositionsId, degrees, startDate, endDate,
    } = req.body;

    // Validate bắt buộc
    if (!name || !email) {
      return res.status(400).json({ message: 'Tên và email là bắt buộc' });
    }

    // Validate email đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Email không hợp lệ' });
    }

    // Kiểm tra email tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email đã tồn tại' });
    }

    // Validate degrees
    if (degrees && !Array.isArray(degrees)) {
      return res.status(400).json({ message: 'Học vị phải là mảng' });
    }

    // Validate positions
    if (teacherPositionsId && !Array.isArray(teacherPositionsId)) {
      return res.status(400).json({ message: 'Vị trí công tác phải là mảng' });
    }

    // Validate startDate, endDate
    const startDateObj = startDate ? new Date(startDate) : undefined;
    const endDateObj = endDate ? new Date(endDate) : undefined;

    if (startDate && isNaN(startDateObj.getTime())) {
      return res.status(400).json({ message: 'Ngày bắt đầu không hợp lệ' });
    }
    if (endDate && isNaN(endDateObj.getTime())) {
      return res.status(400).json({ message: 'Ngày kết thúc không hợp lệ' });
    }

    // Chuẩn bị degrees an toàn
    const mappedDegrees = (degrees || []).map(d => {
      const year = Number(d.year);
      return {
        type: d.type,
        school: d.school || '',
        major: d.major,
        year: isNaN(year) ? null : year,
        isGraduated: d.isGraduated !== undefined ? d.isGraduated : true,
      };
    });

    // Tạo user mới
    const newUser = new User({
      name,
      email,
      phoneNumber,
      address,
      identity,
      dob,
      role: role || 'TEACHER',
    });

    const savedUser = await newUser.save();

    // Sinh mã giáo viên
    const code = await generateUniqueTeacherId();

    // Tạo teacher mới
    const newTeacher = new Teacher({
      userId: savedUser._id,
      code,
      isActive: true,
      isDeleted: false,
      startDate: startDateObj,
      endDate: endDateObj,
      teacherPositionsId: teacherPositionsId || [],
      degrees: mappedDegrees,
    });

    const savedTeacher = await newTeacher.save();

    return res.status(201).json({
      user: savedUser,
      teacher: savedTeacher,
    });
  } catch (error) {
    console.error('Error creating teacher:', error);
    return res.status(500).json({ message: 'Lỗi khi tạo giáo viên', error: error.message });
  }
};