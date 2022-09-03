import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as  courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import newCourse from "../../../tools/mockData";

function ManageCoursePage({ courses, authors, loadAuthors, loadCourses, saveCourse, ...props }) {
    const [course, setCourse] = useState({ ...props.course });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (courses.length === 0) {
            loadCourses()
                .catch(error => {
                    alert('load courses failed' + error);
                });
        }

        if (authors.length === 0) {
            loadAuthors()
                .catch(error => {
                    alert('load authors failed' + error);
                })
        }
    }, []);

    function handleSave(event) {
        event.preventDefault();
        saveCourse(course);
    }
    function handleChange(event) {
        const { name, value } = event.target;
        console.log('name:', name);
        console.log('value:', value);
        setCourse(prevCourse => ({
            ...prevCourse,
            [name]: name === "authorId" ? parseInt(value, 10) : value
        }))
    }
    return (
        <CourseForm
            course={course}
            errors={errors}
            authors={authors}
            onChange={handleChange}
            onSave={handleSave} />
    );

}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        course: newCourse,
        courses: state.courses,
        authors: state.authors
    };
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
    saveCourse: courseActions.saveCourse

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursePage);
