


export const FormComponent = ({
    onSubmitHandler,
    children,
    submitButtonText,
    classes,
    submitButtonClasses,
    secondaryButtonText,
    secondaryButtonClasses,
    onSecondaryBtnHandler
})=>{
    return (
        <form 
        onSubmit={onSubmitHandler}
        className={classes}
        >
            {children}
            <div>
        <input 
        type="submit"
        value={submitButtonText}
        onClick={onSubmitHandler}
        className={submitButtonClasses}
        />
        {onSecondaryBtnHandler&&
        <input 
        type="button"
        value={secondaryButtonText}
        onClick={onSecondaryBtnHandler}
        className={secondaryButtonClasses}
        />
        }
        </div>
        </form>
    )
}
