import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../redux/features/PostSlice";
import Spinner from "./Spinner";

const CreatePost = () => {
  const [values, setValues] = useState({ title: "", body: "" });

  const [showPost, setShowPost] = useState(false);

  const { loading, post } = useSelector((state) => ({ ...state.app }));

  const { title, body } = values;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ values }));
    setValues({ title: "", body: "" });
    setShowPost(true);
  };
  const showCreatedPost = () => {
    return (
      <>
        <div className="spinnermargine">{loading && <Spinner />}</div>

        {!loading && (
          <div className="card mt-4 ">
            <div className="card-body ">
              <h5 className="card-title">{post[0].title}</h5>
              <p className="card-text ">{post[0].body}</p>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div>
      <h1 className="text-center bg-dark text-white p-2 mt-4">Create Post</h1>
      <form action="">
        <div className="mb-3 mt-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            placeholder="Enter Post Title"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            value={body}
            onChange={(e) => setValues({ ...values, body: e.target.value })}
            id="floatingTextarea2"
            style={{ height: 100 }}
            defaultValue={""}
          />
          <label htmlFor="floatingTextarea2">Add Post Discription</label>
        </div>
        <div className="mt-4 d-flex justify-content-end">
          <button onClick={() => navigate("/")} className="btn btn-info ">
            Go Home
          </button>
          <button
            onClick={handelSubmit}
            className="btn btn-success  ms-3"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <div className="mt-4">{showPost && <div>{showCreatedPost()}</div>}</div>
    </div>
  );
};

export default CreatePost;
