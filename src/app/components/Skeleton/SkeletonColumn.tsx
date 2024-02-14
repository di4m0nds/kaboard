import ContentLoader from 'react-content-loader'

interface SkeletonColumnProps {
  className: string
}

const SkeletonColumn = ({ className }: SkeletonColumnProps) => {
  return (
    <ContentLoader viewBox="0 0 500 280" height={280} width={500} className={`${className}`}>
      <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
      <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
      <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
      <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
    </ContentLoader>
  )
}

SkeletonColumn.metadata = {
  name: 'RJavlonbek',
  github: 'RJavlonbek',
  description: 'Blog item',
  filename: 'BlogItem',
}

export default SkeletonColumn
