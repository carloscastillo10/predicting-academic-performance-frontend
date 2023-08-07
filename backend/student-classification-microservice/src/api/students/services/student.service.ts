import { ClassifyStudentDto, CreateStudent } from '@api/students/dtos/classifyStudent.dto'
import { BaseStudentService } from 'api/students/models/baseStudentService.model'
// import { badRequest } from '@hapi/boom'
// import { plainToClass } from 'class-transformer'
import { PredictStudentDto } from '@api/students/dtos/predictStudent.dto'
import { config } from '@config/config'
import { connectDB } from '@db/connection'
import { Student, StudentModel } from '@api/students/models/student.model'
import { Province, ProvinceModel } from '@api/provinces/models/province.model'
import { Document, FlattenMaps, Types } from 'mongoose'
import { Sex, SexModel } from '@api/sexs/models/sex.model'
import { Subject, SubjectModel } from '@api/subjects/models/subject.model'
import { Period, PeriodModel } from '@api/periods/models/period.model'
import axios from 'axios'
import { Canton } from '../models/canton.model'

export class StudentService implements BaseStudentService {
  _db = connectDB()

  async populate(student: Document<unknown, {}, Student> & Student & { _id: Types.ObjectId }): Promise<FlattenMaps<Student & { _id: Types.ObjectId }>> {
    const studentObject = student.toJSON()
    const sex = await SexModel.findOne<Sex>({ id: studentObject.sex })
    const province = await ProvinceModel.findOne<Province>({ id: studentObject.province })
    const canton = await ProvinceModel.findOne<Canton>({ id: studentObject.canton })
    const subject = await SubjectModel.findOne<Subject>({ id: studentObject.subject })
    const period = await PeriodModel.findOne<Period>({ id: studentObject.academicPeriod })

    studentObject.sex = sex ? sex : Object()
    studentObject.province = province ? province : Object()
    studentObject.canton = canton ? canton : Object()
    studentObject.subject = subject ? subject : Object()
    studentObject.academicPeriod = period ? period : Object()

    return studentObject
  }

  async create(studentData: ClassifyStudentDto) {
    try {
      // const classifyStudentData = plainToClass(ClassifyStudentDto, studentData)
      const { age, sex, province, canton, numberFailures, aab1, acdb1, apeb1, aab2, acdb2, apeb2 } = studentData
      const payload: PredictStudentDto = { age, sex, province, canton, numberFailures, aab1, acdb1, apeb1, aab2, acdb2, apeb2 }
      const response = await axios.post(`${config.predictModelUrl}/predict`, payload)
      const { data } = response.data
      const createStudentData = new StudentModel({ ...studentData, ...data })
      await createStudentData.save()
      const student = this.populate(createStudentData)
      // await StudentModel.deleteMany({ identification: '1101' })
      return student

      // await validateOrReject(classifyStudentData)
    } catch (error) {
      console.log(error)
      // const error = new ValidationError()
      // const errorPayload = errors.map((error: any) => ({
      //   property: error.property,
      //   constraints: error.constraints,
      // }))
      // error.target
      // error.children = errorPayload
      // throw error
    }
  }

  async list(): Promise<Student[] | undefined> {
    try {
      const students = await StudentModel.find<Student>({}).limit(5)
      return students
    } catch (error) {
      console.log(error)
    }
  }
}
