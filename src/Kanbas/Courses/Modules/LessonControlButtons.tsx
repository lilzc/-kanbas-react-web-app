import { BsGripVertical } from "react-icons/bs";
import { useSelector } from "react-redux";

interface Lesson {
  _id: string;
  name: string;
  module: string;
}

interface LessonControlButtonsProps {
  lesson: Lesson;
  setLesson: (lesson: Lesson) => void;
  deleteLesson: (id: string) => void;
}

function LessonControlButtons({ 
  lesson, 
  setLesson, 
  deleteLesson 
}: LessonControlButtonsProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="float-end d-flex align-items-center">
      <BsGripVertical className="me-2" />
      {isFaculty && (
        <>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => setLesson(lesson)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteLesson(lesson._id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default LessonControlButtons;