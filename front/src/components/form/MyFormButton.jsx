export default function MyFormButton({ disabled, titleButton }) {
    const getBg = () => {
        if (disabled) {
            return "bg-(--color-blue-light)";
        } else {
            return "bg-(--color-blue-claro)";
        }
    };
    return (
        <button
            className={`${getBg()} cursor-pointer text-white p-2 rounded-md flex justify-center items-center`}
            disabled={disabled}
        >
            {titleButton}
        </button>
    );
}
