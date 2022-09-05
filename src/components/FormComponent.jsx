


export const FormComponent = ({
    onSubmitHandler,
    children,
    submitButtonText,
    classes,
    submitButtonClasses
})=>{
    return (
        <form 
        onSubmit={onSubmitHandler}
        className={classes}
        >
            {children}
        <input 
        type="submit"
        value={submitButtonText}
        onClick={onSubmitHandler}
        className={submitButtonClasses}
        />
        </form>
    )
}
