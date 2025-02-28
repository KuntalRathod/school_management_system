import db from "../../config/db.js"

class TeacherClassModel {
  static async getAllTeacherClasses() {
    //inner join to get teacher name, class name and subject name from teacher_classes table
    const query = `
                   SELECT 
                        teacher_classes.id, 
                        users.name AS teacher_name, 
                        classes.class_name, 
                        subjects.subject_name 
                   FROM 
                      teacher_classes 
                   JOIN 
                      users 
                      ON teacher_classes.teacher_id = users.id
                   JOIN 
                      classes 
                      ON teacher_classes.class_id = classes.id
                   JOIN 
                      subjects 
                      ON teacher_classes.subject_id = subjects.id
                   WHERE 
                      users.usertype = 'teacher';
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
