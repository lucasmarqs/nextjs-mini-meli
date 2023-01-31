export default function Breadcrumbs({ items }) {
  return (
    <div className="my-4 text-gray-900 text-sm last:content-none">
      {items.map((item, idx) => (
        <span key={idx} className="after:content-['__\203A__'] last:after:content-none">
          {item}
        </span>
      ))}
    </div>
  )
}
