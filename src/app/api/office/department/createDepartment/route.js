import { Department } from "src/Model/officeSetupModels/department.model";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "src/dbConfig/dbConfig";
connect();
export async function POST(req, res) {
  try {
    const { userId, departmentName, officeId } = await req.json();

    let departmentId = 1;
    const latestDepartment = await Department.findOne(
      {},
      {},
      { sort: { departmentId: -1 } }
    );
    if (latestDepartment) {
      const latestDepartmentId = latestDepartment.departmentId;
      departmentId = latestDepartmentId + 1;
    }
    const newDepartment = new Department({
      userId,
      departmentName,
      officeId,
      departmentId,
    });
    await newDepartment.save();
    return NextResponse.json(
      { message: "Department Created Successfully", data: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
