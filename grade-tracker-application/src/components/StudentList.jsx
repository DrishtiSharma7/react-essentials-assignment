import { Component } from "react";
import StudentItem from "./StudentItem";

class StudentList extends Component {
  componentWillUnmount() {
    console.log("StudentList Unmounted");
  }

  render() {
    const { students, onRemove, onUpdateMarks } = this.props;

    if (students.length === 0) {
      return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-700">
            No Students Found
          </h2>

          <p className="mt-2 text-slate-500">
            Add a student or change the current filter.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-5">
        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            onRemove={onRemove}
            onUpdateMarks={onUpdateMarks}
          />
        ))}
      </div>
    );
  }
}

export default StudentList;
