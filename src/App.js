import React, {useState} from "react"
import * as Y from "yup"

let statuses = ["DRAFT", "PUBLIC"]

export default function CreatePostForm() {
  let initialState = {
    title: "",
    body: "",
    status: "DRAFT"
  }

  let [inputs, setInputs] = useState(initialState)

  let [errors, setErrors] = useState({})
  let [busy, setBusy] = useState(false)

  async function onChange(event) {
    let {target: {type, name, value, checked}} = event
    value = type === "checkbox" ? checked : value

    let inputErrors =  await schema.validateAt(name, {[name]: value}, {abortEarly: false})
      .then(_ => ({[name]: ""}))
      .catch(convert)

    setInputs(inputs => ({...inputs, [name]: value}))
    setErrors({...errors, ...inputErrors})
  }

  function onSubmit(afterSubmit){
    return async function (event) {
      event.preventDefault()
      setBusy(true)

      let errors = await schema.validate(inputs, {abortEarly: false})
        .then(_ => ({}))
        .catch(convert)

      setErrors(errors)
      if (Object.keys(errors).length) {
        setBusy(false)
      } else {
        await afterSubmit(inputs)
        setInputs(initialState)
        setBusy(false)
      }
    }
  }
  
  async function handleSubmit(inputs) {
    await delay(1000)
    console.log(inputs)
  }


    return <div className="p-3">
      <h1 className="h3 mb-3">Create Post</h1>
      <form autoComplete="off"
            style={{maxWidth: "800px"}}
            onSubmit={onSubmit(handleSubmit)}
      >

        <div className="form-group">
          <label>Title</label> ({errors.title || "*"})<br/>
          <input name="title"
                 className="form-control"
                 type="text"
                 value={inputs.title}
                 onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Body</label> ({errors.body || "*"})<br/>
          <textarea name="body"
                    rows={5}
                    className="form-control"
                    value={inputs.body}
                    onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label>Status</label><br/>
          <select name="status" value={inputs.status} className="form-control" onChange={onChange}>
            {statuses.map(status => <option key={status}>{status}</option>)}
          </select>
        </div>
        <div>
          <button className="btn btn-primary"
                  disabled={busy}>
            Create { busy && <i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i>}
          </button>
        </div>
      </form>
    </div>
  }

  let schema = Y.object().shape({
    title: Y.string().required()
      .min(3).max(50),

    body: Y.string().required()
      .min(3).max(500),

    status: Y.string()
  })

  let convert = (errors) => {
    if(errors.inner) {
      return errors.inner.reduce((z, item) => {
        let name = (item.path || "").includes(".")
            ? item.path.split(".")[0]
            : item.path || ""
        return z[item.path || ""] ? z: {...z, [name]: item.message}
        }, {})
      } else {
        throw errors
    }
}

function delay(ms){
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}
