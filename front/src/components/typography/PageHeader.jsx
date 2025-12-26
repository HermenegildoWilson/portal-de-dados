export default function PageHeader({ children, sx }) {
    return (
        <div className={`sticky top-0 bg-(--color-branco-suave) z-50 -mr-5 -ml-5 p-3 pt-3 pb-3 ${sx}`}>
            {children}
        </div>
    );
}
