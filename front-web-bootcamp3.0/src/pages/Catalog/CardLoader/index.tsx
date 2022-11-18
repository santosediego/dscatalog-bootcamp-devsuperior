import React from "react"
import ContentLoader from "react-content-loader"

const CardLoader = () => (
    <div className="card-loader-container">
        <ContentLoader
            speed={2}
            width={300}
            height={340}
            viewBox="0 0 300 340"
            backgroundColor="#ecebeb"
            foregroundColor="#d6d2d2"
        >
            <rect x="0" y="0" rx="10" ry="10" width="295" height="300" />
        </ContentLoader>
    </div>
)

export default CardLoader
