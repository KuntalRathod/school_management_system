import db from "../../config/db.js"

class TeacherClassModel {
  static async getAllTeacherClasses() {
    //inner join to get teacher name, class name and subject name from teacher_classes table
    const query = `
                  select u.id ,u.name , u.username , u.email , u.age ,
                         u.usertype , u.profileImage , s.subject_name , c.class_name
                         from teacher_classes tc
                  inner join users u
                         on tc.teacher_id = u.id
                  inner join subjects s
                         on tc.subject_id = s.id
                  inner join classes c
                         on tc.class_id = c.id
                  where u.usertype = "teacher";
    `
    //syntax for inner join
    //SELECT column_name(s)
    //FROM table1
    //INNER JOIN table2
    //ON table1.column_name = table2.column_name;

    try {
      const [rows] = await db.execute(query)
      return rows
    } catch (error) {
      console.error("Error getting teacher classes:", error)
      throw error
    }
  }

  static async createTeacherClass(teacher_id, class_id, subject_id) {
    const query =
      "INSERT INTO teacher_classes (teacher_id, class_id, subject_id) VALUES (?, ?, ?)"
    try {
      const [result] = await db.execute(query, [
        teacher_id,
        class_id,
        subject_id,
      ])
      return result
    } catch (error) {
      console.error("Error creating teacher class:", error)
      throw error
    }
  }
}

export default TeacherClassModel
