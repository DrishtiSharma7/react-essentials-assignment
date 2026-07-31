import { Component } from "react";
import StudentItem from "./StudentItem";

class StudentList extends Component {
  render() {
    const { students, onRemove, onUpdateGrade } = this.props;

    if (students.length === 0) {
      return (
        <div className="rounded-xl border border-dashed p-8 text-center text-gray-500">
          No students found
        </div>
      );
    }

    return (
      <ul className="space-y-4">
        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            onRemove={onRemove}
            onUpdateGrade={onUpdateGrade}
          />
        ))}
      </ul>
    );
  }
}

export default StudentList;
