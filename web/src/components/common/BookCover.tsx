
type BookSize = 'xs' | 'sm' | 'md' | 'lg'

type BookDimension = {
    [key in BookSize]: number
}


export default function BookCover({
    src,
    title,
    size,
    autoHeight = false
} : {
    src? : string | null,
    title? : string,
    size : BookSize,
    autoHeight? : boolean
}) {

    const ratio = 1.6

    const width: BookDimension = {
        'xs' : 40,
        'sm' : 60,
        'md' : 100,
        'lg' : 175,
    }

    const height: BookDimension = {
        'xs' : width.xs * ratio,
        'sm' : width.sm * ratio,
        'md' : width.md * ratio,
        'lg' : width.lg * ratio
    }

    return (
        <div 
            className={`
                relative h-full  overflow-hidden 
                ${size === 'xs' ? 'rounded' : 'rounded-md'} 
            `}
            style={{
                width    : width[size] + 'px',
                minWidth : width[size] + 'px',
                height   : autoHeight ? 'auto' : height[size] + 'px',
            }}
        >
            { src ? (
                <img 
                    src={src} 
                    loading="lazy"
                    width={ width[size] }
                    height={ height[size] }
                    className={` object-cover w-full h-full`}
                    style={{
                        width    : width[size] + 'px',
                        minWidth : width[size] + 'px',
                        height   : autoHeight ? 'auto' : height[size] + 'px',
                    }}
                />
            ) : (
                <span className="flex items-center h-full text-xl justify-center font-semibold bg-primary-light text-primary-dark/40 text-center leading-5">
                    { title || 'Cover not Available' }
                </span>
            )}
            <div className="absolute inset-0 -z-30 bg-primary-light/60 animate-pulse" />
        </div>
    )
}
