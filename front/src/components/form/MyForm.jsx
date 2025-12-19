export default function MyForm({ children, sx, handleSubmit }) {
    return (
        <form
            className={`grid gap-2 m-auto w-70 md:w-85 ${sx}`}
            onSubmit={handleSubmit}
        >
            {children}
        </form>
    );
}
