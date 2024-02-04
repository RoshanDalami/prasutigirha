import { Employee } from "src/Model/officeSetupModels/employee.model";
import { connect } from "src/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();

export async function POST(req, res) {
  const {
    userId,
    departmentId,
    postId,
    employeeName,
    employeeEmail,
    employeePhone,
  } = await req.json();
  console.log(userId,
    departmentId,
    postId,
    employeeName,
    employeeEmail,
    employeePhone)
  try {
    let employeeId = parseInt(1,10);
    const latestEmployee = await Employee.findOne(
      {},
      {},
      { sort: { employeeId: -1 } }
    );
    
    if (latestEmployee) {
      const latestEmployeeId = latestEmployee?.employeeId;
      
      employeeId = latestEmployeeId + 1;
    }
    

    const newEmployee = new Employee({
      userId,
      departmentId,
      postId,
      employeeEmail,
      employeeName,
      employeePhone,
      employeeId,
    });
    await newEmployee.save();
    return NextResponse.json(
      { message: "Employee Created SuccessFully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
