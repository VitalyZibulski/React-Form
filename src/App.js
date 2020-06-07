import React, {useState} from "react"

let statuses = ["DRAFT", "PUBLIC"]

export default function CreatePostForm() {

  return <div className="p-3">
    <h1 className="h3 mb-3">Create Post</h1>
    <form autoComplete="off"
          style={{maxWidth: "800px"}}>

      <div className="form-group">
        <label>Title</label> ({"*"})<br/>
        <input name="title"
               className="form-control"
               type="text"
               value={""} />
      </div>
      <div className="form-group">
        <label>Body</label> ({"*"})<br/>
        <textarea name="body"
                  rows={5}
                  className="form-control"
                  value={""}
                  />
      </div>
      <div className="form-group">
        <label>Status</label><br/>
        <select name="status" value={""} className="form-control">
          {statuses.map(status => <option key={status}>{status}</option>)}
        </select>
      </div>
      <div>
        <button className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  </div>
}

