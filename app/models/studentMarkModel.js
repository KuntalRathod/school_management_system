import db from "../../config/db.js"

class StudentMarkModel {
  // Get all student marks
  static async getAll() {
    const [rows] = await db.query(`
            SELECT sm.id, 
                   s.name AS student_name, 
                   t.name AS teacher_name, 
                   sub.subject_name, 
                   sm.marks_obtained, 
                   sm.total_marks
            FROM student_marks sm
            JOIN users s ON sm.student_id = s.id AND s.usertype = 'student'
            JOIN users t ON sm.teacher_id = t.id AND t.usertype = 'teacher'
            JOIN subjects sub ON sm.subject_id = sub.id
        `)
    return rows
  }

  // Get student marks by ID
  //   static async getById(id) {
  //     const [rows] = await db.query(
  //       `
  //             SELECT sm.id,
  //                    s.name AS student_name,
  //                    t.name AS teacher_name,
  //                    sub.subject_name,
  //                    sm.marks_obtained,
  //                    sm.total_marks
  //             FROM student_marks sm
  //             JOIN users s ON sm.student_id = s.id
  //             JOIN users t ON sm.teacher_id = t.id
  //             JOIN subjects sub ON sm.subject_id = sub.id
  //             WHERE sm.id = ?
  //         `,
  //       [id]
  //     )
  //     return rows[0]
  //   }

  // Add a new student mark
  static async add_student(
    student_id,
    subject_id,
    teacher_id,
    marks_obtained,
    total_marks
  ) {
    const [result] = await db.query(
      `
            INSERT INTO student_marks (student_id, subject_id, teacher_id, marks_obtained, total_marks) 
            VALUES (?, ?, ?, ?, ?)
        `,
      [student_id, subject_id, teacher_id, marks_obtained, total_marks]
    )
    return result.insertId
  }

  //get student marks by student id
  static async getStudentsMarks(student_id) {
    const [rows] = await db.query(
      `
            SELECT sm.id,
                   s.name AS student_name,
                   t.name AS teacher_name,
                   sub.subject_name,
                   sm.marks_obtained,
                   sm.total_marks
            FROM student_marks sm
            JOIN users s ON sm.student_id = s.id AND s.usertype = 'student'
            JOIN users t ON sm.teacher_id = t.id AND t.usertype = 'teacher'
            JOIN subjects sub ON sm.subject_id = sub.id 
            WHERE sm.student_id = ?
        `,
      [student_id]
    )
    return rows
  }

  // Update student marks
  //   static async update(id, marks_obtained, total_marks) {
  //     const [result] = await db.query(
  //       `
  //             UPDATE student_marks
  //             SET marks_obtained = ?, total_marks = ?
  //             WHERE id = ?
  //         `,
  //       [marks_obtained, total_marks, id]
  //     )
  //     return result.affectedRows
  //   }

  // Delete student marks
  //   static async delete(id) {
  //     const [result] = await db.query(`DELETE FROM student_marks WHERE id = ?`, [
  //       id,
  //     ])
  //     return result.affectedRows
  //   }
}

export default StudentMarkModel

