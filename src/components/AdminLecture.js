import React, { useState } from 'react';
import '../Styles/LectureList.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLecture } from "../action/lectureAction";
import { Document, Page } from 'react-pdf';


const AdminLecture = (props) => {
    const [toggle, setToggle] = useState(true)
    const [link, setLink] = useState([])
    const { id } = props.match.params
    const dispatch = useDispatch()

    const details = useSelector((state) => {
        return state
    })

    const handelToggle = () => {
        setToggle(!toggle)
    }

    const handelLink = (data) => {
        setLink([{ url: data.assetURL, type: data.assetType, description: data.description }])
    }

    const handelEditCourse = (Id) => {
        props.history.push({ pathname: '/create_lecture', state: { lectureId: Id, courseId: id } })
    }

    const lecture = details.lecture.adminLecture

    const titleData = []
    lecture.map((e) => {
        if (!titleData.includes(e.title)) {
            titleData.push(e.title)
            return e
        }
    })
    const filtered = titleData.map((ele) => {
        const finalFilter = lecture.filter((r) => {
            return ele === r.title
        })
        return finalFilter
    })

    const handelDelete = (id, lectureId) => {
        dispatch(deleteLecture(id, lectureId))
    }

    return (
        <div className="wrapper">
            {toggle && (
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Content <i className="bi bi-plus-circle-fill" onClick={() => { props.history.push({ pathname: '/create_lecture', state: { lectureId: '', courseId: id } }) }}></i></h3>
                    </div>
                    <ul className="list-unstyled components">
                        {
                            filtered?.map((e, i) => {
                                return (
                                    <li key={i + 1}>
                                        <span data-bs-toggle="collapse" aria-expanded="false" className="sidenav-bs-toggle" data-bs-target={`#list${i + 1}`} aria-controls="homeSubmenu" role='button'>{e[0]?.title}</span>
                                        <ul className="collapse list-unstyled" id={`list${i + 1}`}>
                                            {e?.map((r) => {
                                                return (
                                                    <li key={r._id && r._id}>
                                                        <span onClick={() => { handelLink(r) }}>{r.description && r.description}  <i className="bi bi-pencil-square" onClick={() => { handelEditCourse(r._id) }}></i> <i class="bi bi-trash3-fill" onClick={() => { handelDelete(id, r._id) }}></i></span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            )}
            <div id="content">
                <i className="toggleIcon bi-list" onClick={handelToggle} ></i>
                {link.map((l) => {
                    if (l.type === 'video') {
                        return (
                            <div>
                                <iframe width="854" height="480" src={l.url} title={l.description}>
                                </iframe>
                                <h1>{l.description}</h1>
                            </div>
                        )
                    } else if (l.type === 'audio') {
                        return (
                            <div>
                                <audio controls src={l.url}> Your browser does not support the
                                    <code>audio</code> element.
                                </audio>
                                <h1>{l.description}</h1>
                            </div>
                        )
                    } else if (l.type === 'text') {
                        return (
                            <div>
                                <h5></h5>
                                <p></p>
                            </div>
                        )
                    } else if (l.type === 'pdf') {
                        return (
                            <div>
                            <h1>{l.description}</h1>
                                <iframe
                                    title={l.description}
                                    id="print-file"
                                    src={`https://docs.google.com/viewer?url=${l.url}&embedded=true`}
                                    width='100%'
                                    height='842'
                                />
                            </div>
                        )
                    } else if (l.type === 'img') {
                        return (
                            <div>
                                <img src={l.url} alt={l.description} />
                                <h1>{l.description}</h1>
                            </div>
                        )
                    }
                })
                }

            </div>
        </div>
    )
}
export default AdminLecture