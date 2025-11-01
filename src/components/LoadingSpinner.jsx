import "../styles/loading-spinner.css"

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading products...</p>
        </div>
    )
}

export default LoadingSpinner