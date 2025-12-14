export default function MyCard({ children, sx }) {
    return (
        <div
            className={`rounded-lg p-5 pb-6 pt-6 bg-white ${sx}`}
            style={{
                boxShadow:
                    "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
            }}
        >
            {children}
        </div>
    );
}
