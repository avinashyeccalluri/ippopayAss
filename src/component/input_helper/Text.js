export default function Text({ data }) {
  let {
    classForInput = "",
    labelClass = "",
    placeHolder = "",
    labelName = "",
    inputName = "",
    onChangeHandler = () => {},
    type = "text",
    classForError = ""
  } = data || {};

  classForError = `error ${classForError}`;
  classForInput = `form-control ${classForInput}`;
  return (
    <div className="form-group">
      <label htmlFor="exampleInputEmail1" className={labelClass}>
        {labelName}
      </label>
      <input
        type={type}
        className={classForInput}
        id="exampleInputEmail1"
        aria-describedby=""
        placeholder={placeHolder}
        name={inputName}
        onChange={onChangeHandler}
      />
      <span className={classForError} style={{ display: "none" }}></span>
    </div>
  );
}
