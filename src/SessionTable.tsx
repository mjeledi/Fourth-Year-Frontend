import PropTypes from "prop-types";
import FormattedDate from "./helpers/FormattedDate";
import { AttendanceInterface } from "./models/attendance";

interface AttendanceProps {
    attendance : AttendanceInterface[]
}

const AttendanceTable = ({ attendance } : AttendanceProps ) => {

  return <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-black/10 text-left text-[12px] font-semibold text-black/80 uppercase">
            <th className="p-3">Student Name</th>
            <th className="p-3">Student Reg Number</th>
            {/* <th className="p-3">Course Code</th>
            <th className="p-3">Course Name</th>
            <th className="p-3">Venue</th> */}
            <th className="p-3">Joined Date</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((a, index) => (
            <tr key={index} className="border-b border-black/10 text-base">
              <td className="py-8 px-3 font-medium">{a.student_name}</td>
              <td className="py-8 px-3 font-medium">{a.student_regno}</td>
              {/* <td className="py-6 px-3 font-medium">{a.course_code}</td>
              <td className="py-6 px-3 font-medium">{a.course_name}</td>
              <td className="py-6 px-3 font-medium">{a.venue}</td> */}
              <td className="p-3"><FormattedDate dateString={a.created_at}/></td>
            </tr>
          ))}
        </tbody>
    </table>
};

export default AttendanceTable;

AttendanceTable.propTypes = {
  attendance: PropTypes.array,
};
